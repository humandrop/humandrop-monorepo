import { polygon } from "viem/chains";
import { Airdrop } from "../types/airdrop";
import { TOKENS } from "@/modules/tokens/tokens.constants";
import { ClaimCard } from "./ClaimCard";
import { ChainDisconnectedError } from "viem";
import { useNetwork } from "wagmi";
import { useAirdropList } from "../hooks/history/useAirdropsList";

export function AirdropList() {
  const { chain } = useNetwork();
  const { data, isLoading } = useAirdropList(chain ? chain.id : polygon.id);
  return (
    <div className="wrapper">
      <h2>Airdrops</h2>
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
                <ClaimCard airdrop={airdrop} />
              </div>
            );
          })}
      </div>

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
