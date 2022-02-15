const {ec} = require('../utils'); 
const {default_ToH}  = require("../config");
const Transaction = require('../keyRing/transaction');
const {cryptoHash} = require('../crypto_hash');
class Admin {
    constructor(){
        this.keyPair = ec.genKeyPair();
        this.publicKey= this.keyPair.getPublic().encode('hex');
        this.text = {}
    }
    sign(data){
        return this.keyPair.sign(cryptoHash(data));
    }
    getData(){
        return this.text;
    }
    createTransaction({ recipient, data}){
     return new Transaction({senderKeyRing:this, recipient:recipient, value: data});
    }
    setData(text){
        this.text = text;
    }
    researchAdmin(){
        const chain = this.blockchain.chain;
        chain.splice(0,1)
        for(let block of chain){
            const email= block.data.text.email;
            const password= block.data.text.password;
            if(email === "monemail@gmail.com" && password === "monmotdepasse"){

                console.log("personneRetrouver")
            }
            //console.log("data of data", block.data.text.nom );
        }
        console.log( "Original Chain", chain)
    }   
}
module.exports = Admin