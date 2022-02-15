const {cryptoHash} = require("../crypto_hash");

class ProofOfStake{
    constructor(block){
        this;block = block;
        this.Validator = [];
    }
    static setBalanceForNodes(nodes){
        nodes.forEach(function(node){
            node[1] = 1000;            
        });
        return nodes;
    }
    /**
     * In PoS anybody can become a validator by paying  a fees
     * 
     * @returns {Array} node with reduce balance
     */

    createValidator(node, stake){
        this.validators.push([node[0], stake]);
        return [node[0], node[1]-stake];

    }
    calculateHash(){
        return cryptoHash(this.block.lastHash + 
            this.block.timestamp +
            JSON.stringify(this.block.data ) +
            this.block.validator).toString();
    }

    getValidatorWithMaxStake(){
        let maxStake = ["",0];
        this.validators.forEach(function(element){
            if(element[1] > maxStake[1]) {
                maxStake = element;
            }
        });
        return maxStake;
    }
    generateBlock(){
        this.block.hash = this.calculateHash();
        console.log("Block generate: ", this.block.hash);
        return this.block
    }
}
module.exports = ProofOfStake;