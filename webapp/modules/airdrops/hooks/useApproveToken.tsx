// Hook to approve token spend by the contract factory
import { toast } from "react-toastify";
import {
  erc20ABI,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { onSettledWrapper } from "./onSettledWrapper";
import { CONTRACTS } from "../aidrops.constants";
import { polygon } from "viem/chains";

// Returns the tx hash
type ApproveHookParams = {
  amount: bigint;
  token: `0x${string}`;
  onError: (error: Error) => void;
  onSuccess: (hash: string) => void;
};

export function useApproveToken({
  token,
  onError,
  onSuccess,
  amount
}: ApproveHookParams): {
  isLoading: boolean;
  error: Error | null;
  execute: () => Promise<`0x${string}` | undefined>;
  retryPrepare: () => void;
} {
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 80001 | 137;

  const { config: approveConfig, refetch } = usePrepareContractWrite({
    address: token,
    abi: erc20ABI,
    chainId,
    functionName: "approve",
    args: [CONTRACTS.airdropFactory[chainId] as `0x${string}`, amount],
    enabled: amount > 0n,
    cacheTime: 2_000,
    scopeKey: `${token}-approve-${amount.toString()}`,
  });

  const { writeAsync, error, isLoading, data } = useContractWrite({
    ...approveConfig,
    onError,
  });


  const { isLoading: isApproveProcessing } = useWaitForTransaction({
    hash: data?.hash,
    onSettled: onSettledWrapper(onSuccess, onError),
  });

  const execute = async () => {
    if (writeAsync) {
      try {
        const result = await writeAsync();
        return result.hash;
      } catch (e) {
        console.log(e);
      }
    }
  };

  return {
    isLoading: isLoading || isApproveProcessing,
    error,
    execute,
    retryPrepare: refetch,
  };
}
