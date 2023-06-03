import { polygon } from "viem/chains";
import { useNetwork } from "wagmi";
import { useClaimHistory } from "../hooks/history/useClaimHistory";
import { ClaimHistoryItem } from "./ClaimHistoryItem";

export function ClaimList() {
  const { chain } = useNetwork();
  const chainId = chain ? chain.id : polygon.id;
  const { data, isLoading } = useClaimHistory(chainId);

  return (
    <div className="wrapper">
      <h2>Claims</h2>
      {!data && isLoading && <div className="empty">Loading...</div>}
      <div className="airdrop-list">
        {data && data.length === 0 && <div className="empty">No claims found</div>}

        {data &&
          data.length > 0 &&
          data.map((claim, index) => {
            return (
              <div
                key={`claim-${claim.address}-${index}`}
                className="airdrop"
              >
                <ClaimHistoryItem claim={claim} chainId={chainId} />
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
        .empty {
            color: white;
            font-weight: bold;
        }
        h2 {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 30px;
          color: white;
        }
        .airdrop {
          border-bottom: 1px solid white;
          flex: 1;
          width: 100%;
        }

        .airdrop-list {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          flex-direction: column;
          max-width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
