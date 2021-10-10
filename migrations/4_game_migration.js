const Token = artifacts.require("Token");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = async (deployer,network,accounts) =>  {
  // deployer.deploy(MarketPlace,Token.address);
  
  let token = await Token.deployed();

  await token.mint(accounts[0],1,30);
  await token.mint(accounts[0],2,40);
  await token.mint(accounts[0],3,50);

  let bal_token1 = await token.totalSupply(1);
  let bal_token2 = await token.totalSupply(2);
  let bal_token3 = await token.totalSupply(3);


  await token.safeTransferFrom(accounts[0],MarketPlace.address,1,bal_token1.toNumber(),web3.utils.asciiToHex(""),{from:accounts[0]});
  await token.safeTransferFrom(accounts[0],MarketPlace.address,2,bal_token2.toNumber(),web3.utils.asciiToHex(""),{from:accounts[0]});
  await token.safeTransferFrom(accounts[0],MarketPlace.address,3,bal_token3.toNumber(),web3.utils.asciiToHex(""),{from:accounts[0]});
  
  let bal1 = await token.balanceOf(MarketPlace.address,1);
  let bal2 = await token.balanceOf(MarketPlace.address,2);
  let bal3 = await token.balanceOf(MarketPlace.address,3);
  
  console.log("Token Balance 1:" + bal1.toNumber());
  console.log("Token Balance 2:" + bal2.toNumber());
  console.log("Token Balance 3:" + bal3.toNumber());


};
