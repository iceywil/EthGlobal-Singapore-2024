import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
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
    let newCampaignDeployedEvent = createCampaignDeployedEvent(
      creator,
      campaignAddress
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

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
