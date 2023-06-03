import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { polygon } from "viem/chains";
import abi from "../abis/airdrop.abi.json";
import { Airdrop } from "../types/airdrop";
import { onSettledWrapper } from "./onSettledWrapper";

// Returns the tx hash
type HookParams = {
  airdrop: Airdrop;
  onError: (error: Error) => void;
  onSuccess: (hash: string) => void;
  chainId: number;
};

export function useWithdrawTokens({
  onError,
  onSuccess,
  airdrop,
}: HookParams): {
  isLoading: boolean;
  error: Error | null;
  execute: () => Promise<`0x${string}` | undefined>;
  retryPrepare: () => void;
} {
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 80001 | 137;

  const { config: approveConfig, refetch } = usePrepareContractWrite({
    address: airdrop.contract as `0x${string}`,
    abi,
    chainId,
    functionName: "withdraw",
    args: [airdrop.token.address[chainId]],
    cacheTime: 2_000,
    scopeKey: `${airdrop.token.address[chainId]}-withdraw`,
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
