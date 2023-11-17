import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { Fractionize, Retire } from "../generated/CarbonMarket/CarbonMarket"

export function createFractionizeEvent(
  fractionizer: Address,
  nftId: BigInt
): Fractionize {
  let fractionizeEvent = changetype<Fractionize>(newMockEvent())

  fractionizeEvent.parameters = new Array()

  fractionizeEvent.parameters.push(
    new ethereum.EventParam(
      "fractionizer",
      ethereum.Value.fromAddress(fractionizer)
    )
  )
  fractionizeEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  )

  return fractionizeEvent
}

export function createRetireEvent(retirer: Address, nftId: BigInt): Retire {
  let retireEvent = changetype<Retire>(newMockEvent())

  retireEvent.parameters = new Array()

  retireEvent.parameters.push(
    new ethereum.EventParam("retirer", ethereum.Value.fromAddress(retirer))
  )
  retireEvent.parameters.push(
    new ethereum.EventParam("nftId", ethereum.Value.fromUnsignedBigInt(nftId))
  )

  return retireEvent
}
