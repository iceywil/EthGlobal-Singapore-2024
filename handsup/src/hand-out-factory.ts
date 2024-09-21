import {
  CampaignDeployed as CampaignDeployedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Unpaused as UnpausedEvent
} from "../generated/HandOutFactory/HandOutFactory"
import {
  CampaignDeployed,
  OwnershipTransferred,
  Paused,
  Unpaused
} from "../generated/schema"

export function handleCampaignDeployed(event: CampaignDeployedEvent): void {
  let entity = new CampaignDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.campaignAddress = event.params.campaignAddress
  entity.name = event.params.name
  entity.description = event.params.description
  entity.imageURL = event.params.imageURL
  entity.tags = event.params.tags
  entity.raisingFor = event.params.raisingFor
  entity.need = event.params.need
  entity.beneficiary = event.params.beneficiary
  entity.goal = event.params.goal
  entity.duration = event.params.duration
  entity.yieldStrategy = event.params.yieldStrategy

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
