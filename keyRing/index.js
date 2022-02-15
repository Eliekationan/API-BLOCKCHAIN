const {ec} = require('../utils'); 
const {default_ToH}  = require("../config");
const Transaction = require('./transaction');
const {cryptoHash} = require('../crypto_hash');
class KeyRing {
    constructor(){
        this.myToH = {};
        this.keyPair = ec.genKeyPair();
        this.publicKey= this.keyPair.getPublic().encode('hex');
    }
    sign(data){
        return this.keyPair.sign(cryptoHash(data));
    }
    createTransaction({ recipient, data}){
     return new Transaction({senderKeyRing:this, recipient:recipient, value: data});
    }
    setToH(ToH){
        this.myToH = ToH;
    }
}
module.exports = KeyRing;