import { Token } from "@/modules/tokens/types/token";
import { Airdrop } from "../types/airdrop";
import Image from "next/image";
import { formatUnits } from "viem";
import { formatAddress } from "@/modules/app/helpers/formatAddress";
import { useBalance } from "wagmi";
import { useWithdrawTokens } from "../hooks/useWithdrawTokens";
import { toast } from "react-toastify";

export function AirdropItem({
  airdrop,
  chainId,
}: {
  airdrop: Airdrop;
  chainId: number;
}) {
  const { data: balance, refetch } = useBalance({
    address: airdrop.contract as `0x${string}`,
    token: airdrop.token.address[chainId] as any,
  });

  const { execute: withdraw, isLoading: isLoadingApprove } = useWithdrawTokens({
    airdrop,
    chainId,

    onSuccess: () => {
      toast.success("Tokens withdrawn");
      refetch();
    },
    onError: () => {
      toast("Tokens withdrawn");
    },
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
        <div>
          <div className="remaining">
            Remaining for claim: {balance.formatted} {airdrop.token.symbol}
          </div>

          <div className="withdraw-wrapper">
          <button className="withdraw-button" onClick={withdraw}>
            Withdraw all tokens
          </button>
          </div>
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

        .withdraw-wrapper {
            margin-top: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .withdraw-button {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid white;
          border-radius: 8px;
          padding: 8px;
        }
      `}</style>
    </div>
  );
}
