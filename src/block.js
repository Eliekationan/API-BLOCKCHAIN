const { cryptoHash } = require('../crypto_hash');
class Block {
    constructor({ timestamp, data, lastHash }) {
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
        this.data = data;
        this.lastHash = lastHash;
        this.nonce = 0;

    }
    calculateHash() {
        return cryptoHash(this.lastHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    static genesisBlock() {
        let hash = this.calculateHash();
        return new Block({timestamp:"06/01/2022", hash,data, lastHash, nonce });
    }
}
module.exports = Block;