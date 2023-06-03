import { polygon } from "viem/chains";
import { Airdrop } from "../types/airdrop";
import { TOKENS } from "@/modules/tokens/tokens.constants";
import { ClaimCard } from "./ClaimCard";

export function AirdropList() {
  const airdrops: Airdrop[] = [
    {
      active: true,
      amountPerUser: 10000n,
      contract: "0x123",
      endDate: Date.now() + 1000000,
      startDate: Date.now(),
      maxUsers: 10000,
      owner: "0x12",
      token: TOKENS.matic,
    },
    {
      active: true,
      amountPerUser: 10000n,
      contract: "0x123",
      endDate: Date.now() + 1000000,
      startDate: Date.now(),
      maxUsers: 10000,
      owner: "0x12",
      token: TOKENS.eth,
    },
  ];
  return (
    <div className="flex justify-center">
      {airdrops.map((airdrop, index) => {
        return (
          <div
            key={`airdrop-${airdrop.contract}-${index}`}
            className="p-4 rounded"
          >
            <ClaimCard airdrop={airdrop} />
          </div>
        );
      })}
    </div>
  );
}
