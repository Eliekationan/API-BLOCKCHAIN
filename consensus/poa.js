const {cryptoHash} = require("../crypto_hash");


class ProofOfAuthority {
    constructor(block){
        this.block = block;
    }
    calculateHash(){
        return cryptoHash(this.block.lastHash + 
            this.block.timestamp +
            JSON.stringify(this.block.data ) +
            this.block.validator).toString();
    }
    generateBlock(){
        this.block.hash = this.calculateHash();
        return this.block
    }
    generateTransaction(){
        
    }
}
module.exports = ProofOfAuthority;