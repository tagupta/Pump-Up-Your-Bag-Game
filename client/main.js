var web3 = new Web3(Web3.givenProvider);
var instance;
var user;
var tokenAddress = '0xc353885324260537FAbCdeD0d7A992C10AE0aEd1';
var marketPlaceAddress = '0x883B4f44a6D394eaD429A0fAfaa281e806e068d6';

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

async function getUserItems(){
      var tokenPromise1 =  tokenInstance.methods.balanceOf(user,1).call();
      var tokenPromise2 =  tokenInstance.methods.balanceOf(user,2).call();
      var tokenPromise3 =  tokenInstance.methods.balanceOf(user,3).call();

      Promise.all([tokenPromise1,tokenPromise2,tokenPromise3]).then(response =>{
         response.map((value,item) => {
             if(value > 0){
                console.log(`User has ${value} item number ${item+1}`);
             }
         })
      })

}
