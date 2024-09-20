// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Router is Ownable {
    constructor() Ownable() {}

    function newLottery() public onlyOwner {}
}
