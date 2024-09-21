// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IYieldStrategy} from "./IYieldStrategy.sol";

contract Lottery is Ownable {
    IYieldStrategy public yieldStrategy;
    string public name;
    uint256 public duration;
    uint256 public startAt;
    uint256 public totalAmount;
    uint256 public totalPlayers;
    uint256 public totalWinners;

    mapping(address => uint256) public players;
    mapping(address => bool) public played;
    mapping(address => uint256) public winners;

    address[] public playersArray;
    address[] public winnersArray;

    event LotteryEntered(address indexed player, uint256 amount);
    event LotteryEnded(address indexed winner, uint256 prize);
    event RewardClaimed(address indexed player, uint256 amount);

    constructor(
        string memory _name,
        uint256 _duration,
        uint256 _startAt,
        uint256 _totalWinners,
        IYieldStrategy _yieldStrategy
    ) Ownable() {
        name = _name;
        duration = _duration;
        startAt = _startAt;
        totalWinners = _totalWinners;
        yieldStrategy = _yieldStrategy;
    }

    function enterLottery(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than 0");
        require(block.timestamp < startAt + duration, "Lottery is closed");
        require(!played[msg.sender], "You have already played");

        yieldStrategy.deposit(amount);
        totalAmount += amount;
        totalPlayers += 1;
        players[msg.sender] += amount;
        played[msg.sender] = true;

        emit LotteryEntered(msg.sender, amount);
    }

    function endLottery() public onlyOwner {
        require(block.timestamp >= startAt + duration, "Lottery is still open");
        require(played[msg.sender], "You have not played");

        uint256 prize = yieldStrategy.estimateYield();
        yieldStrategy.withdraw(prize);
        totalWinners += 1;

        emit LotteryEnded(msg.sender, prize);
    }

    function claimReward() external {}

    function getPlayers() public view returns (address[] memory) {
        address[] memory _players = new address[](totalPlayers);

        for (uint256 i = 0; i < totalPlayers; i++) {
            _players[i] = playersArray[i];
        }

        return _players;
    }

    function getWinners() public view returns (address[] memory) {
        address[] memory _winners = new address[](totalWinners);

        for (uint256 i = 0; i < totalWinners; i++) {
            _winners[i] = winnersArray[i];
        }

        return _winners;
    }

    function selectWeightedWinner(uint256 randomNumber) internal view returns (address) {}
}
