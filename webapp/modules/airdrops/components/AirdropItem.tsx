import { Token } from "@/modules/tokens/types/token";
import { Airdrop } from "../types/airdrop";
import Image from "next/image";
import { formatUnits } from "viem";
import { formatAddress } from "@/modules/app/helpers/formatAddress";
import { useBalance } from "wagmi";

export function AirdropItem({
  airdrop,
  chainId,
}: {
  airdrop: Airdrop;
  chainId: number;
}) {
  const { data: balance } = useBalance({
    address: airdrop.contract as `0x${string}`,
    token: airdrop.token.address[chainId] as any,
  });

  return (
    <div className="rounded card">
      <div className="flex items-center justify-between token-name">
        {airdrop.token.name}
      </div>
      <div className="flex items-center justify-between">
        <Image src={airdrop.token.logoURI} width={50} height={50} alt="logo" />
      </div>
      <div className="claim-info">
        {formatUnits(
          airdrop.amountPerUser * BigInt(airdrop.maxUsers || 0),
          airdrop.token.decimals
        )}{" "}
        {airdrop.token.symbol} Airdrop
      </div>

      <div className="amount-per-user">
        {formatUnits(airdrop.amountPerUser, airdrop.token.decimals)}{" "}
        {airdrop.token.symbol} per person
      </div>

      <div className="max-users">
        <b>{airdrop.maxUsers} humans</b> can claim this airdrop
      </div>

      {!!balance && (
        <div className="remaining">
          Remaining for claim: {balance.formatted} {airdrop.token.symbol}
        </div>
      )}

      <style jsx>{`
        .card {
          background: linear-gradient(
            180deg,
            ${airdrop.token.colorStart} 0%,
            ${airdrop.token.colorEnd} 100%
          );
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding-left: 60px;
          padding-right: 60px;
          padding-top: 30px;
          padding-bottom: 30px;
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

        .claim-info {
          margin-top: 15px;
          font-weight: bold;
          font-size: 17px;
        }
      `}</style>
    </div>
  );
}
