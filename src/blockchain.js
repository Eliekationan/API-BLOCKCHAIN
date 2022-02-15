const Block = require('./block');
const Transaction = require('../keyRing/transaction');

const ProofOfAuthority = require('../consensus/poa');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        const timestamp = "01/01/2022";
        const data = [];
        const lastHash = "0"
        return new Block({ timestamp, data, lastHash });
    }
    getLastestBlock() {
        return this.chain[this.chain.length - 1];
    }
    generateBlock(value) {
        let block = new Block({
            timestamp: Date.now(),
            data: value,
            lastHash: this.chain[this.chain.length - 1].hash,
            nonce: 0
        });

        let algorithm = new ProofOfAuthority(block);
        //block.validator = minerAddress;
        block = algorithm.generateBlock();
        this.chain.push(block);

    }
    /*createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }*/
    registerParticipant(account) {
        this.participants.push(account);
    }
    getStatusOfAddress(address) {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }

        return balance;

    }
    validationCheck() {
        let consensusAlgorithm = null;
        let validChain = true;
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            const copiedBlock = Object.assign({}, currentBlock);

            switch (this.consensus) {
                default: case 'pow':
                    consensusAlgorithm = new ProofOfWork(copiedBlock);
                    break;
                case 'pos':
                    consensusAlgorithm = new ProofOfStake(copiedBlock);
                    break;
                case 'poa':
                    consensusAlgorithm = new ProofOfAuthority(copiedBlock);
                    break;
            }

            if (currentBlock.hash !== consensusAlgorithm.calculateHash()) {
                console.log("Block " + currentBlock.block + " is invalid!");
                validChain = false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                console.log("Block " + currentBlock.block + " is invalid!");
                validChain = false;
            }
        }
        if (validChain) {
            console.log("Blockchain is valid.");
        }
    }


    validTransactionData({ chain }) {


    }
    replaceChain(chain, onSuccess) {
        if (chain.length <= this.chain.length) {
            console.error('The incoming chain must be longer');
            return;
        }

        if (!Blockchain.validationCheck()) {
            console.error('The incoming chain must be valid');
            return;
        }

        if (onSuccess) onSuccess();
        console.log('replacing chain with', chain);
        this.chain = chain;
    }

}
module.exports = Blockchain;