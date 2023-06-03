import {
    AddressRevoked as AddressRevokedEvent,
    AddressVerified as AddressVerifiedEvent
  } from "../generated/Verifier/Verifier"
  import { AddressRevoked, AddressVerified } from "../generated/schema"
  
  export function handleAddressRevoked(event: AddressRevokedEvent): void {
    let entity = new AddressRevoked(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity._address = event.params._address
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
  
    entity.save()
  }
  
  export function handleAddressVerified(event: AddressVerifiedEvent): void {
    let entity = new AddressVerified(
      event.transaction.hash.concatI32(event.logIndex.toI32())
    )
    entity._address = event.params._address
  
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
  
    entity.save()
  }
  