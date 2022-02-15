const {v4: uuidv4} = require('uuid');
const { verifySignature } = require('../utils');
class Transaction{
    constructor({senderKeyRing, recipient, value, outputMap, input}){
        this.id = uuidv4();
        this.outputMap = outputMap||this.createOutputMap({senderKeyRing, recipient, value });
        this.input = input || this.createInput({senderKeyRing, recipient, value});

    }
    createOutputMap({senderKeyRing, recipient, value}){
        const outputMap = {};
        outputMap[recipient] = value;
        outputMap[senderKeyRing.publicKey] = value;
        return outputMap;

    }
    createInput({ senderKeyRing, outputMap }) {
        return {
          timestamp: Date.now(),
          token: senderKeyRing.myToH,
          address: senderKeyRing.publicKey,
          signature: senderKeyRing.sign(outputMap)
        };
    }

    static validTransaction(transaction) {
        const { input: { address, signature }, outputMap } = transaction;
    
        return true;
      }

}
module.exports = Transaction;