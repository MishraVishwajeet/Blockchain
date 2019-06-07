const SHA256=require('crypto-js/sha256');
class Block{
	constructor(index,timestamp,data,previousHash=''){
		this.index=index;
		this.timestamp=timestamp;
		this.previousHash=previousHash;
		this.hash=this.calculateHash();
		this.nonce=0;
	}
	calculateHash(){
		return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
	}
	mineBlock(difficulty){
		while(this.hash.substring(0,difficulty)!=Array(difficulty+1).join("0")){
			this.nonce++;
			this.hash=this.calculateHash();
		}
		console.log("Block mined: "+this.hash);
	}
}
class Blockchain{
	constructor(){
		this.chain=[this.createGenesisBlock()];
		this.difficulty=4;
	}
	createGenesisBlock(){
		return new Block(0,"07/06/2019","Genesis Block","0");
	}
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	} 
	addBlock(newBlock){
		newBlock.previousHash=this.getLatestBlock().hash;
		//newBlock.hash=newBlock.calculateHash();
		newBlock.mineBlock(this.difficulty);
		this.chain.push(newBlock);
	}
	isChainValid(){
		for(let i=1;i<this.chain.length;i++){
			const currentBlock=this.chain[i];
			const previousHash=this.chain[i-1];
			if(currentBlock.hash!=currentBlock.calculateHash()) return false;
			if(currentBlock.previousHash!=previousHash.hash) return false;
		}
		return true;
	}
}
let ourCrypto=new Blockchain();
// ourCrypto.addBlock(new Block(1,"10/07/2019",{amount:4}));
// ourCrypto.addBlock(new Block(2,"01/12/2019",{amount:10}));
// console.log(JSON.stringify(ourCrypto,null,4));
// console.log('Is our Blockchain valid?'+ourCrypto.isChainValid());
// ourCrypto.chain[1].data={amount:100};
// ourCrypto.chain[1].hash=ourCrypto.chain[1].calculateHash();
// console.log('Is Blockchain valid '+ourCrypto.isChainValid());
console.log("Mining Block 1...");
ourCrypto.addBlock(new Block(1,"10/01/2019",{amount:5}));
console.log("Mining Block 2...");
ourCrypto.addBlock(new Block(2,"01/10/2019",{amount:10}));