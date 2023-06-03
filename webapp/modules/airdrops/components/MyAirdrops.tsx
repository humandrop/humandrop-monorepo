import { useAccount, useNetwork } from "wagmi";
import { useAirdrop } from "../hooks/useAirdrop";
import { polygon } from "viem/chains";
import { AirdropItem } from "./AirdropItem";
import { ClaimCard } from "./ClaimCard";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useUserAirdrops } from "../hooks/history/useUserAirdrops";

export function MyAirdrops() {
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 80001 | 137;
  const { address } = useAccount();

  const { data, isLoading } = useUserAirdrops(chainId, address);
  return (
    <div className="wrapper">
      <h2>My Airdrops</h2>

      {!address && <ConnectButton />}
      {address && (
        <div>
          {!data && isLoading && <div>Loading...</div>}
          <div className="airdrop-list">
            {data && data.length === 0 && <div>No airdrops found</div>}

            {data &&
              data.length > 0 &&
              data.map((airdrop, index) => {
                return (
                  <div
                    key={`airdrop-${airdrop.contract}-${index}`}
                    className="airdrop rounded"
                  >
                    <AirdropItem chainId={chainId} airdrop={airdrop} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <style jsx>{`
        .wrapper {
          padding-left: 30px;
          padding-right: 30px;
          padding-bottom: 30px;
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 30px;
          color: white;
        }
        .airdrop {
          padding: 15px;
        }

        .airdrop-list {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
