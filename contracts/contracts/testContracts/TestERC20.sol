// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestERC20 is ERC20 {

    constructor() ERC20("HumanDrop", "HUM") {}

    function mint(uint256 amount, address receiver) public {
        _mint(receiver, amount);
    }
}
