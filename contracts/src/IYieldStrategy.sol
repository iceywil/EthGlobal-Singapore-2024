// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

interface IYieldStrategy {
    function deposit(uint256 amount) external;
    function withdraw(uint256 amount) external;
    function claim() external returns (uint256);
    function estimate() external view returns (uint256);
    function token() external view returns (address);
}
