import { Bytes, BigInt } from "@graphprotocol/graph-ts";
import { Depositor } from "../../generated/schema";

export function getDepositor(farmId: Bytes, userId: Bytes): Depositor {
    const depositorId = farmId.toHexString().concat("-").concat(userId.toHexString());
    let depositor = Depositor.load(depositorId);

    if (depositor === null) {
        depositor = new Depositor(depositorId);
        depositor.farm = farmId;
        depositor.user = userId;
        depositor.amount = BigInt.fromI32(0);
        depositor.save();
    }

    return depositor;
}