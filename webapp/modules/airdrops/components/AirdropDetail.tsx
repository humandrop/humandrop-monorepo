import { useNetwork } from "wagmi";
import { useAirdrop } from "../hooks/useAirdrop";
import { polygon } from "viem/chains";
import { AirdropItem } from "./AirdropItem";
import { ClaimCard } from "./ClaimCard";

export function AirdropDetail({ address }: { address: string }) {
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 80001 | 137;

  const { data, isLoading } = useAirdrop({
    address,
    chainId,
  });

  return (
    <div className="wrapper">
      {isLoading && <div>Loading...</div>}
      {data && (
        <div>
          <AirdropItem airdrop={data} chainId={chainId} />
          <div className="claim-section">
            <ClaimCard airdrop={data} />
          </div>
        </div>
      )}
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
