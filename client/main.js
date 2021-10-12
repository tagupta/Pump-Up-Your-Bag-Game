var web3 = new Web3(Web3.givenProvider);
var marketInstance;
var tokenInstance;
var gameTokenInstance;
var user;
var gameTokenAddress = '0xaa26b6519A1ffd4A9FAF9737E07b27969c7D7d6a';
var tokenAddress = '0x3947F43308DA07Fd54737f4CAC5393d71128d093'; //ERC1155
var marketPlaceAddress = '0x28C5d88D3826099952a7977913D7FB3109c618B2';

$(document).ready(()=>{ 
    window.ethereum.enable().then(accounts => {
        tokenInstance = new web3.eth.Contract(abi.tokenABI,tokenAddress,{from: accounts[0]});
        marketInstance = new web3.eth.Contract(abi.marketPlace,marketPlaceAddress,{from: accounts[0]});
        gameTokenInstance = new web3.eth.Contract(abi.gameTokenABI,gameTokenAddress,{from: accounts[0]});
        user = accounts[0];
        console.log(tokenInstance);
        console.log(marketInstance);
        console.log(gameTokenInstance);

        marketInstance.events.TokenBought().on('data', function(event){
            var tokenID = event.returnValues.tokenId;
            if(tokenID == '1'){
                $('#toastMessage').html('Token Pump Talisman bought. Reload Game');
            }else if(tokenID == '2'){
                $('#toastMessage').html('Token Super Boots bought. Reload Game');
            }else if(tokenID == '3'){
                $('#toastMessage').html('Token Time Warp Cape bought. Reload Game');
            }
            $('.toast').toast('show'); 
        })
        .on('error', function(error,receipt){
            console.log(error);
        });
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
           console.log('Successfull buying');
       }
    });
} 

async function getUserItems(callback){
    web3.eth.getAccounts().then((accounts) =>{
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

async function mintAfterGame(noOfTokens){
 console.log(noOfTokens);
 var weiAmount = web3.utils.toWei(noOfTokens.toString(),'ether');
 await gameTokenInstance.methods.mint(user,weiAmount).send({},function(error,txHash){
     if(error){
         console.log(error);
     }
     else{
         console.log('Minting Done');
     }
 })
}

