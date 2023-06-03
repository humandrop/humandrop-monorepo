import { formatAddress } from "@/modules/app/helpers/formatAddress";
import { Claim } from "../types/claim";
import { formatUnits } from "viem";
import { getEtherScanLink } from "@/modules/app/helpers/getEtherscanLink";

export function ClaimHistoryItem({
  claim,
  chainId,
}: {
  claim: Claim;
  chainId: number;
}) {
  return (
    <div className="wrapper">
      <div className="address">{formatAddress(claim.address)}</div>
      <div className="amount">
        {formatUnits(claim.amount, claim.airdrop.token.decimals)}{" "}
        {claim.airdrop.token.symbol}
      </div>
      <div className="transaction">
        <a
          href={`${getEtherScanLink(chainId)}/tx/${claim.transactionHash}`}
          target="_blank"
          rel="noreferrer"
        >
          View on polygonscan
        </a>
      </div>

      <style jsx>{`
      .wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        color: white;
      }

        .address {
            font-size: 14px;
            font-weight: 500;
            margin-right: 20px;
        }

        .amount {
            font-size: 14px;
            font-weight: 500;
            margin-right: 20px;
        }
      
      `}</style>
    </div>
  );
}
