// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {HandOut} from "./HandOut.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {IYieldStrategy} from "./IYieldStrategy.sol";

contract HandOutFactory is Ownable, Pausable {
    HandOut[] public deployedCampaigns;

    event CampaignDeployed(
        address indexed creator,
        address campaignAddress,
        string name,
        string description,
        string imageURL,
        string[] tags,
        string raisingFor,
        string need,
        address beneficiary,
        uint256 goal,
        uint256 duration,
        address yieldStrategy
    );

    function createHandOutCampaign(
        string memory _name,
        string memory _description,
        string memory _imageURL,
        string[] memory _tags,
        string memory _raisingFor,
        string memory _need,
        address _beneficiary,
        uint256 _goal,
        uint256 _duration,
        address _yieldStrategy
    ) external whenNotPaused {
        HandOut newCampaign = new HandOut(
            _name,
            _description,
            _imageURL,
            _tags,
            _raisingFor,
            _need,
            _beneficiary,
            _goal,
            _duration,
            IYieldStrategy(_yieldStrategy)
        );

        deployedCampaigns.push(newCampaign);

        emit CampaignDeployed(
            msg.sender,
            address(newCampaign),
            _name,
            _description,
            _imageURL,
            _tags,
            _raisingFor,
            _need,
            _beneficiary,
            _goal,
            _duration,
            _yieldStrategy
        );
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
