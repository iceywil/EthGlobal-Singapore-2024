// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/HandOut.sol";
import "../src/HandOutFactory.sol";
import "./MockYieldStrategy.sol";
import "./ERC20Mock.sol";

contract HandOutFactoryTest is Test {
    HandOutFactory public factory;
    MockYieldStrategy public mockYieldStrategy;
    ERC20Mock public mockToken;
    address public creator;
    address public beneficiary;

    function setUp() public {
        factory = new HandOutFactory();
        mockToken = new ERC20Mock();
        mockYieldStrategy = new MockYieldStrategy(mockToken);
        creator = address(this);
        beneficiary = address(0xBEEF);
    }

    function testCreateHandOutCampaign() public {
        uint256 goal = 1000 ether;
        uint256 duration = 30 days;

        // Create a new HandOut campaign via factory
        factory.createHandOutCampaign(beneficiary, goal, duration, address(mockYieldStrategy));

        // Check the deployed campaign
        HandOut[] memory deployedCampaigns = factory.getDeployedCampaings();
        assertEq(deployedCampaigns.length, 1, "Campaign should be deployed");

        HandOut newCampaign = deployedCampaigns[0];
        (, uint256 createdGoal,,,,) = newCampaign.getCampaignDetails();
        assertEq(createdGoal, goal, "Goal should match");
    }
}
