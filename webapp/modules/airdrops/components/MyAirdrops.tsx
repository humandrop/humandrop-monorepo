import { useAccount, useNetwork } from "wagmi";
import { useAirdrop } from "../hooks/useAirdrop";
import { polygon } from "viem/chains";
import { AirdropItem } from "./AirdropItem";
import { ClaimCard } from "./ClaimCard";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useUserAirdrops } from "../hooks/useUserAirdrops";

export function MyAirdrops() {
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 80001 | 137;
  const { address } = useAccount();

  const { data, isLoading } = useUserAirdrops({
    address,
    chainId,
  });
console.log(data)
  return (
    <div className="wrapper">
        {!address && (<ConnectButton />)}
        {address && <div>
            
        {isLoading && <div>Loading...</div>}
        {data && (
            <div>
            {data}
            </div>
        )}
            </div>}
      <style jsx>{`
        .wrapper {
          padding: 60px;
        }

        .claim-section {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 60px;
        }
      `}</style>
    </div>
  );
}
