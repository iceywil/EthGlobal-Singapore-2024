// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IYieldStrategy} from "../IYieldStrategy.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

contract StargateUSDCArbitrum is Ownable, IYieldStrategy {
    IERC20 private _token;

    constructor() Ownable() {}

    function claim() external override returns (uint256) {
        // Claim yield from yield strategy
    }

    function estimate() external view override returns (uint256) {
        // Estimate yield from yield strategy
    }

    function withdraw(uint256 amount) external override {
        // Withdraw amount from yield strategy
    }

    function deposit(uint256 amount) external override {
        // Deposit amount to yield strategy
    }

    function token() external view override returns (address) {
        return address(_token);
    }
}
