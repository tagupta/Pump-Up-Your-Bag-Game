// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract GameToken is ERC20{
   constructor() ERC20('GameToken','GT'){
   }

   function mint(address _to, uint256 _value) public returns(bool){
       _mint(_to,_value);
       return true;
   }
}