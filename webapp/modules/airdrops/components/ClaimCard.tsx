import { Airdrop } from "../types/airdrop";
import { formatUnits } from "viem";
import { formatAddress } from "@/modules/app/helpers/formatAddress";
import { useIsHumanVerified } from "../../verify/hooks/useIsHumanVerified";
import { useAccount,  useNetwork } from "wagmi";
import { polygon } from "viem/chains";
import { useHasClaimed } from "../hooks/useHasClaimed";
import { VerifyButton } from "@/modules/verify/components/VerifyButton";
import { useTotalClaims } from "../hooks/useTotalClaims";

export function ClaimCard({ airdrop }: { airdrop: Airdrop }) {

  const { address } = useAccount();
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 137 | 80001;

  const { data: verified, mutate: mutateVerified } = useIsHumanVerified({
    address: address as `0x${string}`,
    chainId
  });

  const { data: claimed, isLoading, mutate: mutateClaimed } = useHasClaimed({
    address: address as `0x${string}`,
    chainId,
    airdrop
  });

  const { data: totalClaims } = useTotalClaims({
    chainId,
    airdrop
  })

  return (
    <div className="px-4 py-4 rounded card">
       <div className="badge">
         {totalClaims || 0 } / {airdrop.maxUsers} claimed
       </div>
      <div className="flex items-center justify-between token-name">{airdrop.token.name}</div>
      <div className="flex items-center justify-between">
        <img src={airdrop.token.logoURI} width={50} height={50} alt="logo" />
        </div>
      <div className="claim-info" >
        Claim {formatUnits(airdrop.amountPerUser, airdrop.token.decimals)} {airdrop.token.symbol}
      </div>

      <div className="claim-area">
        {address && verified && !claimed && (
          <button>
            Claim
          </button>
        )}
         {address && verified && claimed && (
           <div className="claimed">
           Already Claimed 
           </div>
        )}
        {address && !verified && (
          <VerifyButton address={address} chainId={chainId} onVerify={mutateVerified} />
        )}
      </div>

      <div className="contract-info">
        <div className="deployer">
          Deployed by <a href={`https://mumbai.polygonscan.com/address/${airdrop.owner}`}>{formatAddress(airdrop.owner)}</a>
        </div>
        <div className="contract-address">
          Contract address: <a href={`https://mumbai.polygonscan.com/address/${airdrop.contract}`}>{formatAddress(airdrop.contract)}</a>
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
          position: relative;

          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }

        .badge {
          position: absolute;
          top: -5px;
          right: 0;
          background: #ff96d8;
          font-size: 9px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px;
          color: black;
          border-radius: 8px;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        }

        
        .claim-info {
          margin-top: 15px;
          font-weight: bold;
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
      
        .claim-area {
          margin-top: 30px;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
}
