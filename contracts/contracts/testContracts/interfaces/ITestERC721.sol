// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

interface ITestERC721 is IERC721Enumerable {
    function mint(address receiver) external;
}
