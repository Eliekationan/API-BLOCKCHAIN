const redis = require('redis');
const CHANNELS = {
    BLOCKCHAIN: "BLOCKCHAIN",
    TRANSACTION: "TRANSACTION",
    TEST: "TEST"
}
class Pubsub {
    constructor({ blockchain, transactionPool, redisUrl }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.redisUrl = redisUrl;
        this.subscriber = redis.createClient(redisUrl);
        this.publisher = redis.createClient(redisUrl);
        this.subscribeToChannels();
        this.subscriber.on("message",
            (channel, message) => this.handleMessage(channel, message)
        );
    }
    handleMessage(channel, message) {
        console.log(`Message received. Channel: ${channel}. Message: ${message}.`);
        const parsedMessage = JSON.parse(message);

        switch (channel) {
            case CHANNELS.BLOCKCHAIN:
                this.blockchain.replaceChain(parsedMessage, true, () => {
                    this.transactionPool.clearBlockchainTransactions({
                        chain: parsedMessage
                    });
                });
                break;
            case CHANNELS.TRANSACTION:
                this.transactionPool.setTransaction(parsedMessage);
                break;
            default:
                return;
        }
    }
}
module.exports = Pubsub;
