import { Farm } from "../../generated/schema"
import { BigInt, Bytes } from "@graphprotocol/graph-ts";

export function getFarm(farmAddress: Bytes): Farm {
    let farm = Farm.load(farmAddress)
    if (farm === null) {
        farm = new Farm(farmAddress)
        farm.totalStaked = BigInt.fromI32(0);
        farm.totalRewardsPaid = BigInt.fromI32(0);
        farm.save();
    }
    return farm as Farm
}