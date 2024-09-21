import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CampaignDeployed } from "../generated/schema"
import { CampaignDeployed as CampaignDeployedEvent } from "../generated/HandOutFactory/HandOutFactory"
import { handleCampaignDeployed } from "../src/hand-out-factory"
import { createCampaignDeployedEvent } from "./hand-out-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let campaignAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let name = "Example string value"
    let description = "Example string value"
    let imageURL = "Example string value"
    let tags = ["Example string value"]
    let raisingFor = "Example string value"
    let need = "Example string value"
    let beneficiary = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let goal = BigInt.fromI32(234)
    let duration = BigInt.fromI32(234)
    let yieldStrategy = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newCampaignDeployedEvent = createCampaignDeployedEvent(
      creator,
      campaignAddress,
      name,
      description,
      imageURL,
      tags,
      raisingFor,
      need,
      beneficiary,
      goal,
      duration,
      yieldStrategy
    )
    handleCampaignDeployed(newCampaignDeployedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CampaignDeployed created and stored", () => {
    assert.entityCount("CampaignDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "campaignAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "imageURL",
      "Example string value"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tags",
      "[Example string value]"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "raisingFor",
      "Example string value"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "need",
      "Example string value"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "beneficiary",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "goal",
      "234"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "duration",
      "234"
    )
    assert.fieldEquals(
      "CampaignDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "yieldStrategy",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
