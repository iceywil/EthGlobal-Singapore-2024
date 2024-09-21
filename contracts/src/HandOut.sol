// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {IYieldStrategy} from "./IYieldStrategy.sol";

contract HandOut is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    address creator;
    address beneficiary;
    uint256 goal;
    uint256 totalDeposited;
    uint256 totalYield;
    uint256 startTime;
    uint256 endTime;
    IYieldStrategy yieldStrategy;
    bool isActive;

    mapping(address => uint256) deposits;

    event CampaignCreated(
        address indexed creator,
        address indexed beneficiary,
        uint256 goal,
        uint256 duration,
        IYieldStrategy yieldStrategy
    );
    event Contribution(address indexed contributor, uint256 amount);
    event Withdrawal(address indexed contributor, uint256 amount);
    event CampaignEnded(
        address indexed creator, address indexed beneficiary, uint256 goal, uint256 totalDeposited, uint256 totalYield
    );
    event CampaignRefunded(address indexed creator, uint256 totalDeposited);
    event CampaignClaimed(address indexed beneficiary, uint256 totalYield);

    constructor(address _beneficiary, uint256 _goal, uint256 _duration, IYieldStrategy _yieldStrategy) Ownable() {
        require(_goal > 0, "Goal must be greater than zero");
        require(_duration > 0, "Duration must be greater than zero");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(address(_yieldStrategy) != address(0), "Invalid yield strategy address");

        creator = msg.sender;
        beneficiary = _beneficiary;
        goal = _goal;
        totalDeposited = 0;
        totalYield = 0;
        startTime = block.timestamp;
        endTime = block.timestamp + _duration;
        yieldStrategy = _yieldStrategy;
        isActive = true;
    }

    function contribute(uint256 amount, bool donation) external payable whenNotPaused nonReentrant {
        require(isActive, "Campaign is not active");
        require(block.timestamp < endTime, "Campaign has ended");
        require(amount > 0, "Amount must be greater than zero");

        if (!donation) {
            IERC20(yieldStrategy.token()).transferFrom(msg.sender, address(this), amount);
            deposits[msg.sender] += amount;
        } else {
            IERC20(yieldStrategy.token()).transferFrom(msg.sender, address(this), amount);
        }

        totalDeposited += amount;

        emit Contribution(msg.sender, amount);
    }

    function withdraw() external whenNotPaused nonReentrant {
        require(!isActive, "Campaign is active");

        uint256 amount = deposits[msg.sender];
        require(amount > 0, "No deposits to withdraw");

        deposits[msg.sender] = 0;
        IERC20(yieldStrategy.token()).transfer(msg.sender, amount);

        emit Withdrawal(msg.sender, amount);
    }

    function claim() external whenNotPaused nonReentrant {
        require(isActive, "Campaign is not active");

        uint256 amount = IERC20(yieldStrategy.token()).balanceOf(address(this));
        if (amount > 0) {
            IERC20(yieldStrategy.token()).transfer(beneficiary, amount);
        }

        uint256 yield = yieldStrategy.claim();
        totalYield += yield;

        IERC20(yieldStrategy.token()).transfer(beneficiary, yield);

        emit CampaignClaimed(msg.sender, yield);
    }

    function refund() external whenNotPaused nonReentrant {
        require(isActive, "Campaign is not active");

        isActive = false;

        emit CampaignRefunded(creator, totalDeposited);
    }

    function estimate() external view returns (uint256) {
        return yieldStrategy.estimate();
    }

    function getCampaignDetails() external view returns (address, uint256, uint256, uint256, uint256, uint256) {
        return (beneficiary, goal, totalDeposited, totalYield, startTime, endTime);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
