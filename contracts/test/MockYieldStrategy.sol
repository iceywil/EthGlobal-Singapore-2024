// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {IYieldStrategy} from "../src/IYieldStrategy.sol";
import {ERC20Mock} from "./ERC20Mock.sol";

contract MockYieldStrategy is IYieldStrategy {
    IERC20 public tokenAddress; // Renamed to avoid conflict with IYieldStrategy's `token()` function
    mapping(address => uint256) public balances;

    constructor(IERC20 _token) {
        tokenAddress = _token;
    }

    function claim() external override returns (uint256) {
        ERC20Mock(address(tokenAddress)).mint(address(this), 1000);
        tokenAddress.transfer(msg.sender, 1000);
        return 100;
    }

    function estimate() external view override returns (uint256) {
        return balances[msg.sender]; // Mock estimate
    }

    function token() external view override returns (address) {
        return address(tokenAddress);
    }

    function deposit(uint256 amount) external override {
        tokenAddress.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) external override {
        balances[msg.sender] -= amount;
        tokenAddress.transfer(msg.sender, amount);
    }
}
