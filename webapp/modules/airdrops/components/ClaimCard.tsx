import { Token } from "@/modules/tokens/types/token";
import { Airdrop } from "../types/airdrop";
import Image from "next/image";
import { formatUnits } from "viem";
import { formatAddress } from "@/modules/app/helpers/formatAddress";

export function ClaimCard({ airdrop }: { airdrop: Airdrop }) {
  return (
    <div className="px-4 py-4 rounded card">
      <div className="flex items-center justify-between token-name">{airdrop.token.name}</div>
      <div className="flex items-center justify-between">
        <Image src={airdrop.token.logoURI} width={50} height={50} alt="logo" />
        </div>
      <div className="claim-info" >
        Claim {formatUnits(airdrop.amountPerUser, airdrop.token.decimals)} {airdrop.token.symbol}
      </div>

      <div className="contract-info">
        <div className="deployer">
          Deployed by <a href={`https://polygonscan.com/address/${airdrop.owner}`}>{formatAddress(airdrop.owner)}</a>
        </div>
        <div className="contract-address">
          Contract address: <a href={`https://polygonscan.com/address/${airdrop.contract}`}>{formatAddress(airdrop.contract)}</a>
        </div>

      </div>

      <style jsx>{`
        .card {
          background: linear-gradient(180deg, ${airdrop.token.colorStart} 0%, ${airdrop.token.colorEnd} 100%);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          width: 300px;
        }

        

        .token-name {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 15px;
        }

        .contract-info {
          font-size: 8px;
          margin-top: 15px;
          text-align: center;
        }
      
      `}</style>
    </div>
  );
}
