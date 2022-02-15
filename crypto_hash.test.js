const {cryptoHash} = require("./crypto_hash");

let data = "bonjour tout le monde";
describe("cryptoHash", ()=>{
    it("data = bonjour tout le monde",()=>{
        expect(cryptoHash("foo")).toEqual("b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b");
    });
})