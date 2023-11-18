import {
  Fractionize as FractionizeEvent,
  Retire as RetireEvent
} from "../generated/CarbonMarket/CarbonMarket"
import { Fractionize, Retire } from "../generated/schema"

export function handleFractionize(event: FractionizeEvent): void {
  let entity = new Fractionize(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fractionizer = event.params.fractionizer
  entity.nftId = event.params.nftId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRetire(event: RetireEvent): void {
  let entity = new Retire(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.retirer = event.params.retirer
  entity.nftId = event.params.nftId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
