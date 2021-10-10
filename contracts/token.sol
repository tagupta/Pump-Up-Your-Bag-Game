// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
//import '@openzeppelin/contracts/utils/Counters.sol';


contract Token is ERC1155Supply{

    // using Counters for Counters.Counter; 

    constructor() ERC1155(""){}

    // mapping (uint256 => address) public creators;  id => creatorAddress
    // Counters.Counter private _counterIds;

    
    // function create(uint256 _initialSupply) external returns(uint256 _id) {
    //         _id = _counterIds.current() + 1;
    //         creators[_id] = msg.sender;

    //         _mint(msg.sender, _id, _initialSupply,"");

    //         _counterIds.increment();
    //     }

    function mint(address to,uint id,uint amount) public {
      _mint(to,id,amount,"");
    }
}
