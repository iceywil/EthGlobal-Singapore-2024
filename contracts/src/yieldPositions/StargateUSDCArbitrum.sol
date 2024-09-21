// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IYieldManager} from "./IYieldManager.sol";

contract StargateUSDCArbitrum is Ownable, IYieldManager {
    constructor() Ownable() {}
}
