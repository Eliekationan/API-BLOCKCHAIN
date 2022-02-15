const {v4: uuidv4} = require('uuid');
const { cryptoHash } = require('../crypto_hash');
const KeyRing = require('../keyRing');
let keyRing = new KeyRing();
class Token{
    constructor({name, text }){
        this.duration = 14;
        this.name = name;
        this.id = this.id();
        this.prod = Date.now();
        this.exp = this.prod + this.duration;
        this.text = text;
        this.signature = keyRing.sign(cryptoHash(
            this.duration + 
            this.name+
            this.id + 
            this.prod + 
            this.exp + 
            this.text));
    }
    id(){
        let id = uuidv4();
        return id;
    }
    isValid(){
        if(Date.now()===this.exp){
            let error = "This ToH is not valid";
            console.log(error);
            return false;
        }
    }

}
module.exports = Token