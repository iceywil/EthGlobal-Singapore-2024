// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Lottery} from "./Lottery.sol";
import {IYieldManager} from "./IYieldManager.sol";

contract LotteryManager is Ownable {
    Lottery[] public lotteries;
    mapping(address => bool) public isLottery;

    event LotteryCreated(address lottery);
    event LotteryEntered(address player, uint256 amount);
    event LotteryEnded(address winner, uint256 prize);
    event RewardClaimed(address player, uint256 amount);

    constructor() Ownable() {}

    function createLottery(
        string _name,
        uint256 _duration,
        uint256 _startAt,
        uint256 _totalWinners,
        IYieldManager _yieldManager
    ) public onlyOwner returns (Lottery) {
        Lottery lottery = new Lottery(_name, _duration, _startAt, _totalWinners, _yieldManager);

        lotteries.push(lottery);
        isLottery[address(lottery)] = true;

        emit LotteryCreated(address(lottery));

        return lottery;
    }

    function enterLottery(Lottery lottery, uint256 amount) public payable {
        lottery.enterLottery(amount);
    }

    function endLottery(Lottery lottery) public onlyOwner {
        lottery.endLottery();
    }

    function getLottery(uint256 index) public view returns (Lottery memory) {
        return lotteries[index];
    }

    function getLotteriesCount() public view returns (uint256) {
        return lotteries.length;
    }

    function getAllLotteries() public view returns (Lottery[] memory) {
        return lotteries;
    }
}
