var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var tokenAddress = '0xC2cD509B96dF62d5117eFE5F965Ad9C6BA12E43c';
var marketPlaceAddress = '0x7Eca0e140D5f666D52daCE5A1dB2E5b5B43056c5';

$(document).ready(()=>{ 
    window.ethereum.enable().then(accounts => {
        tokenInstance = new web3.eth.Contract(abi.tokenABI,tokenAddress,{from: accounts[0]});
        marketInstance = new web3.eth.Contract(abi.marketPlace,marketPlaceAddress,{from: accounts[0]});
        user = accounts[0];
        console.log(tokenInstance);
        console.log(marketInstance);
    });
 
});

async function buy(id){
    var options = {
        from : user,
        value: 0
    }
    if(id == 1)
       options.value = web3.utils.toWei('0.0001','ether');                  
    else if(id == 2)
       options.value = web3.utils.toWei('0.0002','ether');
    else if(id == 3)
       options.value = web3.utils.toWei('0.0003','ether');

    await marketInstance.methods.buyToken(id).send(options,function(error,txHash){
       if(error){
           console.log(error);
       }
       else{
           console.log(txHash);
       }
    });
} 

async function getUserItems(callback){
    web3.eth.getAccounts().then((accounts) =>{
        console.log(accounts[0]);
        tokenInstance = new web3.eth.Contract(abi.tokenABI,tokenAddress,{from: accounts[0]});
        user = accounts[0];
        var tokenPromise1 =  tokenInstance.methods.balanceOf(user,1).call();
        var tokenPromise2 =  tokenInstance.methods.balanceOf(user,2).call();
        var tokenPromise3 =  tokenInstance.methods.balanceOf(user,3).call();

        Promise.all([tokenPromise1,tokenPromise2,tokenPromise3]).then(response =>{
            console.log('Fetching Items');
            console.log(response);
            var numberOfTalisman = response[0];
            var numberOfBoots = response[1];
            var numberOfCapes = response[2];

            if(numberOfTalisman > 0){
                COIN_GENERATION_INTERVAL *= Math.pow(0.75,numberOfTalisman);
            }
            if(numberOfBoots > 0){
                PLAYER_SPEED *= Math.pow(1.3,numberOfBoots);
            }
            if(numberOfCapes > 0){
                GAME_SECOND *= Math.pow(1.5,numberOfCapes);
            }

            callback();
        })
        });
        
  
}

