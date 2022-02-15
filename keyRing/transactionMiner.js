class TransactionMiner{
    constructor({ blockchain, transactionPool, keyRing}) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.keyRing = keyRing;
      }
    
      mineTransactions() {
        const validTransactions = this.transactionPool.validTransactions();
        this.blockchain.generateBlock(validTransactions );
        
        this.transactionPool.clear();
      }
}
module.exports = TransactionMiner;