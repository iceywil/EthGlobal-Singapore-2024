// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IYieldManager} from "./IYieldManager.sol";

contract Lottery is Ownable {
    IYieldManager public yieldManager;
    string public name;
    uint256 public duration;
    uint256 public startAt;
    uint256 public totalAmount;
    uint256 public totalPlayers;
    uint256 public totalWinners;

    mapping(address => uint256) public players;
    mapping(address => uint256) public winners;

    event LotteryEntered(address indexed player, uint256 amount);
    event LotteryEnded(address indexed winner, uint256 prize);
    event RewardClaimed(address indexed player, uint256 amount);

    constructor(string _name, uint256 _duration, uint256 _startAt, uint256 _totalWinners, IYieldManager _yieldManager)
        Ownable()
    {
        name = _name;
        duration = _duration;
        startAt = _startAt;
        totalWinners = _totalWinners;
        yieldManager = _yieldManager;
    }

    function enterLottery(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than 0");
        require(block.timestamp < startAt + duration, "Lottery is closed");

        yieldManager.deposit(amount);
        totalAmount += amount;
        totalPlayers += 1;
        players[msg.sender] += amount;

        emit LotteryEntered(msg.sender, amount);
    }

    function endLottery() public onlyOwner {
        require(block.timestamp >= startAt + duration, "Lottery is still open");

        uint256 prize = yieldManager.estimateYield();
        yieldManager.withdraw(prize);
        totalWinners += 1;

        emit LotteryEnded(winner, prize);
    }

    function claimReward() external {}

    function getPlayers() public view returns (address[] memory) {
        address[] memory _players = new address[](totalPlayers);
        uint256 index = 0;
        for (uint256 i = 0; i < totalPlayers; i++) {
            if (players[i] > 0) {
                _players[index] = i;
                index += 1;
            }
        }
        return _players;
    }

    function getWinners() public view returns (address) {
        address[] memory _winners = new address[](totalWinners);
        uint256 index = 0;
        for (uint256 i = 0; i < totalWinners; i++) {
            if (winners[i] > 0) {
                _winners[index] = i;
                index += 1;
            }
        }
        return _winners;
    }

    function selectWeightedWinner(uint256 randomNumber) internal view returns (address) {}
}
