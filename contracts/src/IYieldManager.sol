// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IYieldStrategy {
    function deposit(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function claimYield() external returns (uint256);
    function estimateYield() external view returns (uint256);
}
