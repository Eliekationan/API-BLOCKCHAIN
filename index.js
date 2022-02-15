const bodyParser = require('body-parser');
const express = require('express');
//const request = require('request');
const path = require('path');
const Blockchain = require('./src/blockchain');
//const Pubsub = require('./app/pubsub');
const TransactionPool = require('./keyRing/transaction-pool');
const KeyRing = require('./keyRing');
const TransactionMiner = require('./keyRing/transactionMiner');
const Token = require('./src/Tokens');
const SuperAdmin = require('./admin/superAdmin');
const Admin = require('./admin');
//const redirect  = require('express/lib/response');


const isDevelopment = process.env.ENV === "development";

const REDIS_URL = isDevelopment ?
    'redis://127.0.0.1:1234' : 'redis://h:p05f9a274bd0e2414e52cb9516f8cbcead154d7d61502d32d9750180836a7cc05@ec2-34-225-229-4.compute-1.amazonaws.com:19289';
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;


const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const keyRing = new KeyRing();
const transactionMiner = new TransactionMiner({ blockchain, transactionPool, keyRing });
const superAd = new SuperAdmin({ blockchain });
const admin = new Admin()

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain);
    //console.log(typeof(blockchain.chain))
});
// Obtenir la longueur de la chaine
//=====================================================================================

app.get('/api/blocks/length', (req, res) => {
    res.json(blockchain.chain.length);
});
//------------------------------------------------------------------------------------------

//Obtenir 
app.get('/api/blocks/?id', (req, res) => {
    const { id } = req.params;
    const { length } = blockchain.chain;
    //console.log(id-1);
    const blockReversed = blockchain.chain.slice().reverse();

    let startIndex = (id - 1) * 4;
    let endIndex = id * 4;

    //console.log({startIndex});
    startIndex = startIndex < length ? startIndex : length;
    endIndex = endIndex < length ? endIndex : length;
    //console.log({length:length, startIndex: startIndex, endIndex: endIndex});
    res.json(blockReversed.slice(startIndex, endIndex));
});

app.get('/api/lastBlock', (req, res) => {
    res.json(blockchain.chain[blockchain.chain.length - 1]);
})

app.post('/api/mineBlock', (req, res) => {
    const { data } = req.body;

    blockchain.generateBlock(null, data);

    res.redirect('/api/blocks');
});
app.post('/api/transact', (req, res) => {
    const { recipient, data } = req.body;

    const transaction = keyRing.createTransaction({ recipient: recipient, data: data });

    transactionPool.setTransaction(transaction);
    //console.log(transactionPool);
    res.json({ transaction });
});




app.get('/api/transaction-pool-map', (req, res) => {
    res.json(transactionPool.transactionMap);
});
app.get('/api/mine-transaction', (req, res) => {
    transactionMiner.mineTransactions();
    res.redirect('/api/blocks');
});
app.get('/api/keyRing-info', (req, res) => {
    const address = keyRing.publicKey;
    res.json({
        address,
        ToH: keyRing.myToH
    });
});
app.get('/api/know-addresses', (req, res) => {
    const addressMap = {};
    for (let block of blockchain.chain) {
        for (let transaction of block.data) {
            const recipient = Object.keys(transaction.outputMap);
            recipient.forEach(recipient => addressMap[recipient] = recipient);
        }
    }
    res.json(Object.keys(addressMap));
});
app.get('/api/admin/user', (req, res) => {
    const users = [];
    for (let block of blockchain.chain) {

        if (block.data.text === undefined) {
            //console.log("undefine",block.data)
            continue
        }
        else {
            const email = block.data.text.email;
            const password = block.data.text.password;
            if (email) {
                const user = Object.assign(block.data.text);
                users.push(user);
            }
        }

    }
    //console.log(users);
    res.json(users);

});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));

});
app.post('/api/admin/super', (req, res) => {
    let text = {};
    text = req.body;
    admin.setData(text);

    superAd.createAdmin({ admin: admin.getData() });
    res.redirect('/api/blocks');
});



if (isDevelopment) {
    const walletFoo = new KeyRing();
    const walletBar = new KeyRing();
    const walletBeer = new KeyRing();
    let text1 = {
        nom: "coulibaly",
        prenom: "kationan elie",
        date_naiss: "29/04/1999",
        etat_de_sante: "negatif"
    }
    let text = {
        nom: "coulibaly",
        prenom: "Bognan David",
        date_naiss: "01/01/1996",
        etat_de_sante: "negatif"
    }
    let text3 = {
        nom: "Admam",
        prenom: "kleton",
        date_naiss: "04/12/1999",
        etat_de_sante: "positif"
    }
    walletFoo.setToH(new Token({ name: 'ToH', text: text1 }));
    console.log(walletFoo.myToH);
    walletBar.setToH(new Token({ name: 'ToH', text: text3 }));
    walletBeer.setToH(new Token({ name: 'ToH', text: text3 }));


    const generateWalletTransaction = ({ recipient, data }) => {
        const transaction = walletBar.createTransaction({ recipient, data });

        transactionPool.setTransaction(transaction);
    };

    const walletAction = () => generateWalletTransaction({
        recipient: walletBar.publicKey,
        data: walletFoo.myToH.id
    });

    const walletFooAction = () => generateWalletTransaction({
        recipient: walletFoo.publicKey,
        data: walletBar.myToH.id
    });

    const walletBarAction = () => generateWalletTransaction({
        recipient: walletBeer.publicKey,
        data: walletBar.myToH.id
    });

    for (let i = 0; i < 20; i++) {
        if (i % 3 === 0) {
            walletAction();
            walletFooAction();
        } else if (i % 3 === 1) {
            walletAction();
            walletBarAction();
        } else {
            walletFooAction();
            walletBarAction();
        }
        //console.log(transactionMiner.transactionPool);
        transactionMiner.mineTransactions();
        //console.log(transactionPool);
    }
}

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`listening at localhost:${PORT}`);

    /*if (PORT !== DEFAULT_PORT) {
        syncWithRootState();
    }*/
});