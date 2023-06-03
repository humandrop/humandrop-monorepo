import { Claimed } from "../generated/templates/Airdrop/Airdrop"
import { Claim, Airdrop } from "../generated/schema"

export function handleClaimed(event: Claimed): void {
  let entity = new Claim(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.airdrop = event.address.toHexString();
  entity.address = event.params.account
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  // Load the airdrop and add the claim to it
  let airdrop = Airdrop.load(event.address.toHexString())
}
