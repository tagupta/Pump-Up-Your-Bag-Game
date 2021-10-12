# Pump-Up-Your-Bag-Game
A game built on Ethereum Blockchain

This is a simple game where it allows its users to pump their wallets with ERC20 token just by running after the tokens. It also manifest a functionality that enables users to improve their game in multiple ways. Users can invigorate the game by using ERC1155 tokens. There are 3 types of ERC1155 tokens available in the game. 
1. Pump Talisman - This increases the coin generation rate by 75%.
2. Super Boots - This boosts the speed of the character by 30%
3. Time Warp Cape- This slows the time by 50%. 

To buy these tokens user needs to have a sufficient ETH (ether) in his/her account. 
The game will be rendered according to the ERC1155 tokens user hold in his/her wallet. The game runs in default mode without these tokens in the wallet.

This dApp is built using:
* HTML5
* Java script
* Bootstrap5
* Solidity0.8
* OpenZeppelin
* Truffle
* Ganache
* Web3.js
* MetaMask

## Access DApp on Testnet
1. Make sure you have [Metamask](https://metamask.io/) installed to interact with web 3.0 content in the browser.
2. In MetaMask, switch the blockchain network from ```Ethereum Mainnet``` to ```Ropsten Test Network```.
3. Get some testnet ETH from an Ethereum Ropsten faucet like [this one](https://faucet.dimensions.network/).
4. Access the dApp in the browser [here](https://tagupta.github.io/Pump-Up-Your-Bag-Game/client/). ***Also, Zoom In your window for better experience.***
5. Now you're ready to use the dApp running on the Ethereum **Ropsten testnet**!

## Usage
Preview

https://user-images.githubusercontent.com/45707143/133417143-19006a64-df47-4d4b-9e80-efbfe077ec5b.mp4

Please unmute the speaker to enjoy the sound effect.

## Set up Local Development Environment
**Install Project and [Truffle](https://www.trufflesuite.com/truffle)**

```
cd Ethereum Game
npm install
```
```
npm install truffle -g
```
**Set up Ganache**
1. Download [Ganache](https://www.trufflesuite.com/ganache) to set up a local Ethereum blockchain.
2. Start Ganache and create a new Ethereum workspace using the mnemonic phrase ```mnemonicDev``` found in truffle-config.js.
3. Deploy the smart contracts of the project on Ganache using Truffle. Do so by runnning:
``` 
truffle migrate --network ganache --reset

```
4. The console will output the address of newly deployed contracts. In ***main.js*** replace the values of **gameTokenAddress**,**tokenAddress** and **marketPlaceAddress** accordingly.

**Set up MetaMask**
1. Install [MetaMask](https://metamask.io/) to interact with the dApp in the browser.
2. Add your Ganache network as a custom RPC network to MetaMask and connect to it. The RPC URL is shown in Ganache. For the Chain ID use ```1337``` or what MetaMask suggests.
3. Import two Ethereum accounts from Ganache to MetaMask by their private keys. The balances of these accounts should now be visible in MetaMask.

**Set up FrontEnd**
1. Start a localhost server for the frontend of the dApp:
```
cd client
python3 -m http.server 8000
```
2. Access the dApp in the browser http://localhost:8000/

## Enjoy
Now you can use the dapp locally in your IDE.



