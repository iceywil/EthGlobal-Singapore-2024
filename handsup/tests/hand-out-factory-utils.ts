import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CampaignDeployed,
  OwnershipTransferred,
  Paused,
  Unpaused
} from "../generated/HandOutFactory/HandOutFactory"

export function createCampaignDeployedEvent(
  creator: Address,
  campaignAddress: Address,
  name: string,
  description: string,
  imageURL: string,
  tags: Array<string>,
  raisingFor: string,
  need: string,
  beneficiary: Address,
  goal: BigInt,
  duration: BigInt,
  yieldStrategy: Address
): CampaignDeployed {
  let campaignDeployedEvent = changetype<CampaignDeployed>(newMockEvent())

  campaignDeployedEvent.parameters = new Array()

  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignAddress",
      ethereum.Value.fromAddress(campaignAddress)
    )
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam("imageURL", ethereum.Value.fromString(imageURL))
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam("tags", ethereum.Value.fromStringArray(tags))
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam("raisingFor", ethereum.Value.fromString(raisingFor))
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam("need", ethereum.Value.fromString(need))
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam("goal", ethereum.Value.fromUnsignedBigInt(goal))
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  campaignDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "yieldStrategy",
      ethereum.Value.fromAddress(yieldStrategy)
    )
  )

  return campaignDeployedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
