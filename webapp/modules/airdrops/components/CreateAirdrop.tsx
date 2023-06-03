import { useState } from "react";
import { Airdrop } from "../types/airdrop";
import { TOKENS } from "@/modules/tokens/tokens.constants";
import { Token } from "@/modules/tokens/types/token";
import { TokenSelector } from "@/modules/tokens/components/TokenSelector";
import { useAccount, useNetwork } from "wagmi";
import { polygon } from "viem/chains";
import { ClaimCard } from "./ClaimCard";
import { formatUnits, parseUnits } from "viem";
import { AirdropItem } from "./AirdropItem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTokenAllowance } from "../hooks/useTokenAllowance";
import { CONTRACTS } from "../aidrops.constants";
import { useApproveToken } from "../hooks/useApproveToken";
import { toast } from "react-toastify";
import { useCreateAirdrop } from "../hooks/useCreateAirdrop";
import { formatAddress } from "@/modules/app/helpers/formatAddress";

export function CreateAirdrop() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const chainId = chain?.id || polygon.id;

  const emptyAirdrop: Airdrop = {
    active: true,

    amountPerUser: parseUnits("10000", TOKENS.humandrop.decimals),
    contract: "0x123",
    endDate: Date.now() + 31 * 24 * 60 * 60 * 1000,
    startDate: Date.now(),
    maxUsers: 10000,
    owner: address || "0x00",
    token: TOKENS.humandrop,
  };
  const [airdrop, setAirdrop] = useState<Airdrop>(emptyAirdrop);

  const onSelectToken = (token: Token) => {
    setAirdrop({ ...airdrop, token });
  };

  const onAmountChange = (amount: string) => {
    setAirdrop({
      ...airdrop,
      amountPerUser: BigInt(parseUnits(amount as any, airdrop.token.decimals)),
    });
  };

  const onMaxUsersChange = (maxUsers: number) => {
    setAirdrop({ ...airdrop, maxUsers });
  };

  const totalAmount = airdrop.amountPerUser * BigInt(airdrop.maxUsers);

  // Allowanec
  const { data: allowance, mutate: mutateAllowance } = useTokenAllowance({
    chainId,
    owner: address as `0x${string}`,
    spender: CONTRACTS.airdropFactory[chainId as 137] as `0x${string}`,
    contractAddress: airdrop.token.address[chainId] as `0x${string}`,
  });

  // Create
  const { execute: create, isLoading: isLoadingCreate, retryPrepare } = useCreateAirdrop({
    airdrop,
    onSuccess: () => {
      toast.success("Airdrop created");
      mutateAllowance();
    },
    onError: () => {
      toast("Airdrop creation failed");
      mutateAllowance();
    },
    chainId,
  });

  // Approve spend token
  const { execute: approve, isLoading: isLoadingApprove } = useApproveToken({
    token: airdrop.token.address[chainId] as `0x${string}`,
    amount: totalAmount,

    onSuccess: () => {
      toast.success("Approve successful");
      mutateAllowance();
      retryPrepare();
    },
    onError: () => {
      toast("Approval failed");
      mutateAllowance();
    },
  });

  

  return (
    <div className="wrapper">
      <div className="form">
        <div className="form-row">
          <label>Token</label>
          <TokenSelector
            onChange={onSelectToken}
            selected={airdrop.token.address[chainId]}
            chainId={chainId}
          />
        </div>

        <div className="form-row">
          <label htmlFor="amount">Amount of tokens per user</label>
          <input
            type="number"
            id="amount"
            value={formatUnits(airdrop.amountPerUser, airdrop.token.decimals)}
            onChange={(e) => onAmountChange(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label htmlFor="max-users">Max users</label>
          <input
            type="number"
            id="max-users"
            value={airdrop.maxUsers}
            onChange={(e) => onMaxUsersChange(parseInt(e.target.value))}
          />
        </div>

        <div className="actions">
          {!address && <ConnectButton />}
          {address && (!allowance || allowance < totalAmount) && (
            <div>
                <button onClick={approve} className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
              Approve {formatUnits(totalAmount, airdrop.token.decimals)} {airdrop.token.symbol}
            </button>
            <div>
            <a href={`https://polygonscan.com/address/${CONTRACTS.airdropFactory[chainId as 137]}`}>Contract Address</a>
            </div>
            </div>
          )}
          {address && !!allowance && allowance >= totalAmount && (
            <button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded" onClick={create}>Create Airdrop!</button>
          )}
        </div>
      </div>
      <div className="preview">
        <div className="preview-content">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          Preview Claim
        </h2>
        <ClaimCard airdrop={airdrop} />

        <h2 className="text-4xl font-extrabold text-white mb-4">
          Preview Airdrop
        </h2>
        <AirdropItem airdrop={airdrop} />
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
        }

        .form,
        .preview {
          width: 50%;
          padding: 30px;
        }

        .preview-content {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding: 30px;
          padding-bottom: 60px;
        }

        .preview .preview-content {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
        }

        .form-row {
          padding: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        label {
          display: block;
          font-weight: bold;
          color: white;
          font-size: 20px;
          margin-bottom: 15px;
        }

        h2 {
          margin-top: 30px;
          margin-bottom: 30px;
        }

        input {
          border-radius: 4px;
          border: none;
          padding: 15px;
        }

        .actions {
            margin-top: 30px;
            margin-bottom: 30px;
        }

        button {
            padding: 8px;
            border-radius: 8px;
            border: 1px solid white;
            color: white;
            cursor: pointer;
            margin-bottom: 15px;
        }

        button:hover {
           
        }
      `}</style>
    </div>
  );
}
