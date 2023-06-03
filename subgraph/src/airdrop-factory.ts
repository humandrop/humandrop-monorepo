import { BigInt } from "@graphprotocol/graph-ts";
import { AirdropCreated as AirdropCreatedEvent } from "../generated/AirdropFactory/AirdropFactory";
import { Airdrop } from "../generated/schema";
import { Airdrop as AirdropTemplate } from "../generated/templates";
export function handleAirdropCreated(event: AirdropCreatedEvent): void {
  // Track the new entity
  AirdropTemplate.create(event.params.airdropAddress);

  let entity = new Airdrop(event.params.airdropAddress.toHexString());
  entity.AirdropFactory_id = event.params.id;
  entity.owner = event.params.owner;
  entity.tokenAddress = event.params.tokenAddress;
  entity.amountPerUser = event.params.amountPerUser;
  entity.startDate = event.params.startDate;
  entity.endDate = event.params.endDate;
  entity.maxUsers = event.params.maxUsers;
  entity.totalClaimed = BigInt.fromI32(0);

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
