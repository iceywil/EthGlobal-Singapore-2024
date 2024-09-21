// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import "../src/HandOut.sol";
import "./MockYieldStrategy.sol";
import "./ERC20Mock.sol";

contract HandOutTest is Test {
    HandOut public handOut;
    MockYieldStrategy public mockYieldStrategy;
    ERC20Mock public mockToken;
    address public creator;
    address public beneficiary;

    function setUp() public {
        mockToken = new ERC20Mock();
        mockYieldStrategy = new MockYieldStrategy(mockToken);
        beneficiary = address(0xBEEF);
        creator = address(this);

        // Use the constructor to deploy a HandOut campaign
        handOut = new HandOut(beneficiary, 1000 ether, 30 days, mockYieldStrategy);
    }

    function testContributeToCampaign() public {
        // Mint mock tokens and approve the HandOut contract
        mockToken.mint(address(this), 10000 ether);
        mockToken.approve(address(handOut), 1000 ether);

        // Contribute to the campaign
        handOut.contribute(500 ether);

        (,, uint256 totalDeposited,,,) = handOut.getCampaignDetails();
        assertEq(totalDeposited, 500 ether, "Total deposited should be updated");
    }

    function testClaimYield() public {
        // Claim the yield
        handOut.claim();

        (,,, uint256 totalYield,,) = handOut.getCampaignDetails();
        assertEq(totalYield, 100, "Yield should be claimed and recorded");
    }
}
