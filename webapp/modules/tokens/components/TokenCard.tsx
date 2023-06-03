import { Token } from "@/modules/tokens/types/token";
import Image from "next/image";
import { formatUnits } from "viem";
import { polygon } from "viem/chains";
import { useAccount, useBalance, useNetwork } from "wagmi";

export function TokenCard({ token }: { token: Token }) {
    const { address } = useAccount();
    const {chain} = useNetwork();
    const chainId = chain?.id || polygon.id;

    const {  data: balance } = useBalance({
        address, 
        token: token.address[chainId] as any
    })
  return (
    <div className="px-4 py-4 rounded card">
      <div className="flex items-center justify-between token-name">
        {token.name}
      </div>
      <div className="flex items-center justify-between">
        <img src={token.logoURI} width={50} height={50} alt="logo" />
      </div>

      <div className="balance">
        {balance ? balance.formatted: '-'} {token.symbol}
      </div>

      <style jsx>{`
        .card {
          background: linear-gradient(
            180deg,
            ${token.colorStart} 0%,
            ${token.colorEnd} 100%
          );
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 200px;
        }

        .token-name {
          font-size: 20px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
