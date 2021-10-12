// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';

contract MarketPlace{
    IERC1155 private _token;
    mapping (uint => uint) price; //token type => price

    constructor(IERC1155 token){
     require(address(token) != address(0),'MarketPlace: Token address can not zero');
     _token = token;

     price[1] = 100000000000000;
     price[2] = 200000000000000;
     price[3] = 300000000000000;

    }
    event TokenBought(uint tokenId);

    receive() payable external{}

    fallback() payable external{
      buyToken(1);
    }

    function buyToken(uint tokenID) public payable{
        require(price[tokenID] != 0,'MarketPlace: TokenID does not exist');
        uint weiAmount = msg.value;
        require(weiAmount >= price[tokenID],'MarketPlace: Insufficient funds');
        _token.safeTransferFrom(address(this), msg.sender, tokenID, 1, "");

        emit TokenBought(tokenID);
    }

    function onERC1155Received(address operator, address from, uint256 id, uint256 value, bytes calldata data) pure external returns (bytes4){
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }
}