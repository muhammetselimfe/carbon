import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Fractionize } from "../generated/schema"
import { Fractionize as FractionizeEvent } from "../generated/CarbonMarket/CarbonMarket"
import { handleFractionize } from "../src/carbon-market"
import { createFractionizeEvent } from "./carbon-market-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let fractionizer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let nftId = BigInt.fromI32(234)
    let newFractionizeEvent = createFractionizeEvent(fractionizer, nftId)
    handleFractionize(newFractionizeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Fractionize created and stored", () => {
    assert.entityCount("Fractionize", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Fractionize",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fractionizer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Fractionize",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nftId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
