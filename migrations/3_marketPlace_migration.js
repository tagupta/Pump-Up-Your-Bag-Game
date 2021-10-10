const Token = artifacts.require("Token");
const MarketPlace = artifacts.require("MarketPlace");

module.exports = function (deployer) {
  deployer.deploy(MarketPlace,Token.address);
};
