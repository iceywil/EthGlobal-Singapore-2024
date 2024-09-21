// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IYieldStrategy} from "./IYieldStrategy.sol";

contract StargateUSDCArbitrum is Ownable, IYieldStrategy {
    constructor() Ownable() {}
}
