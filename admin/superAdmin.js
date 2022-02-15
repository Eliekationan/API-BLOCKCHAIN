const Admin = require('./index');
const { ec } = require('../utils');
const { default_ToH } = require("../config");
const { cryptoHash } = require('../crypto_hash');
const { json } = require('body-parser');
class SuperAdmin {
    constructor({ blockchain }) {
        this.blockchain = blockchain;
    }
    sign(data) {
        return this.keyPair.sign(cryptoHash(data));
    }
    createAdmin({ admin }) {
        this.blockchain.generateBlock(admin)
    }
    researchAdmin() {
        const chain = this.blockchain.chain;
        //chain.splice(0,1)
        let user = []
        for (let block of chain) {
            
            //console.log("text of data", block.data.text );
            if (block.data.text === undefined) {
                //console.log("undefine text of data");
                continue
            }
            else {
                const email = block.data.text.email;
                const password = block.data.text.password;
                if (email) {
                    user.push(block.data.text);
                    user.push(block.data.publicKey);
                    console.log(user);
                    return { user };
                }
            }

            //console.log("data of data", block.data.text.nom );
        }
        
        //console.log("Original Chain", chain)
    }

}
module.exports = SuperAdmin;