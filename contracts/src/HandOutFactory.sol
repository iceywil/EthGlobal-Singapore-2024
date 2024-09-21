// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {HandOut} from "./HandOut.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {IYieldStrategy} from "./IYieldStrategy.sol";

contract HandOutFactory is Ownable, Pausable {
    HandOut[] public deployedCampaigns;

    event CampaignDeployed(address indexed creator, address campaignAddress);

    function createHandOutCampaign(address _beneficiary, uint256 _goal, uint256 _duration, address _yieldStrategy)
        external
        whenNotPaused
    {
        HandOut newCampaign = new HandOut(_beneficiary, _goal, _duration, IYieldStrategy(_yieldStrategy));

        deployedCampaigns.push(newCampaign);

        emit CampaignDeployed(msg.sender, address(newCampaign));
    }

    function getDeployedCampaings() external view returns (HandOut[] memory) {
        return deployedCampaigns;
    }

    function getDeployedCampaingsCount() external view returns (uint256) {
        return deployedCampaigns.length;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
