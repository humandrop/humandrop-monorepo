import { AirdropCreated as AirdropCreatedEvent } from "../generated/AirdropFactory/AirdropFactory"
import { Airdrop } from "../generated/schema"

export function handleAirdropCreated(event: AirdropCreatedEvent): void {
  let entity = new Airdrop(
    event.params.airdropAddress
  )
  entity.AirdropFactory_id = event.params.id
  entity.owner = event.params.owner
  entity.tokenAddress = event.params.tokenAddress
  entity.amountPerUser = event.params.amountPerUser
  entity.startDate = event.params.startDate
  entity.endDate = event.params.endDate
  entity.maxUsers = event.params.maxUsers

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
