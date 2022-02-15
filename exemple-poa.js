const Blockchain = require('./src/blockchain');
const Transaction = require('./keyRing/transaction');
const Participants = require('./src/participants');
const Token = require('./src/Tokens');
const KeyRing = require('./keyRing');
const SuperAdmin =require('./admin/superAdmin');
const Admin =require('./admin')
repeat_lines = 50;
const text = {
    nom: "coulibaly",
    prenom:"kationan elie",
    date_naiss :"29/04/1999",
    etat_de_sante: "negatif"
}
const text1 = {
    nom: "Kone",
    prenom:"fankalaban",
    date_naiss :"29/04/1999",
    etat_de_sante: "positif"
}

console.log("-".repeat(repeat_lines));
console.log("Nouveau Block debuté avec Proof Of Authority");
console.log("-".repeat(repeat_lines));
console.log('\nAuthority selected');
let token = new Token({name:'ToH',text});
let authorities = Participants.nodes();
let blockchain = new Blockchain('poa');
let keyRing = new KeyRing();
let authority = authorities[Math.floor(Math.random() * Participants.nodes().length )][0];
//console.log( keyRing);
let transaction = keyRing.createTransaction({recipient:"foo", data: token});


//console.log(keyRing);

console.log("-".repeat(repeat_lines));
console.log("-".repeat(repeat_lines));
console.log(token);
console.log("-".repeat(repeat_lines));
console.log("-".repeat(repeat_lines));
console.log('keyRing ToH');
console.log(keyRing.myToH);
keyRing.setToH(token);
console.log(' new keyRing ToH');
console.log(keyRing.myToH);


let superAd = new SuperAdmin({blockchain});
let admin = new Admin();
let data = {
    nom: "mon nom",
    prenom:"mon prenom",
    email:"monemail@gmail.com",
    password:"monmotdepasse"
}
admin.setData({data});
superAd.createAdmin({admin: admin});

//console.log('super Admin', superAd);
//console.log('Admin', admin);

//console.log('blockchain', blockchain);
console.log("-".repeat(repeat_lines));
console.log("-".repeat(repeat_lines));

console.log("data before",admin.getData());
data = {
    nom: "nom",
    prenom:"prenom",
    email:"mon@gmail.com",
    password:"motdepasse"
}
admin = new Admin();
admin.setData({data});
superAd.createAdmin({admin: admin});

const user = superAd.researchAdmin();
console.log(admin.getData());



/*console.log("-".repeat(repeat_lines));
console.log('Genesis Block created');
console.log("-".repeat(repeat_lines));

console.log("-".repeat(repeat_lines));
console.log('\n First transaction created....');
console.log("-".repeat(repeat_lines));
console.log('creating block 2');
/*
console.log(authority);
blockchain.generateBlock(authority, text);

console.log("-".repeat(repeat_lines));
console.log('Validation check ....');
blockchain.validationCheck();
console.log(blockchain.chain[0]);
blockchain.generateBlock(authority, token);
authority = authorities[Math.floor(Math.random() * Participants.nodes().length )][0];
blockchain.generateBlock(authority, token);
authority = authorities[Math.floor(Math.random() * Participants.nodes().length )][0];
blockchain.generateBlock(authority, token);
authority = authorities[Math.floor(Math.random() * Participants.nodes().length )][0];
blockchain.generateBlock(authority, token);
console.log("new token created ... =>",token);
console.log("-".repeat(repeat_lines));
console.log(blockchain.chain)
console.log("-".repeat(repeat_lines));
*/
