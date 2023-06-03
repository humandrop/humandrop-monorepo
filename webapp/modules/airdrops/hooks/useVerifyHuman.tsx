import { toast } from "react-toastify";
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CONTRACTS } from "../aidrops.constants";
import { polygon } from "viem/chains";
import abi from '../abis/airdropFactory.abi.json';
import { onSettledWrapper } from "./onSettledWrapper";

// Returns the tx hash
type HookParams = {
  address: `0x${string}`;
  onError: (error: Error) => void;
  onSuccess: (hash: string) => void;
};

export function useVerifyHuman({
  onError,
  onSuccess,
  address,
}: HookParams): {
  isLoading: boolean;
  error: Error | null;
  execute: () => Promise<`0x${string}` | undefined>;
  retryPrepare: () => void;
} {
  const { chain } = useNetwork();
  const chainId = (chain?.id || polygon.id) as 80001 | 137;


  const { config: approveConfig, refetch } = usePrepareContractWrite({
    address: CONTRACTS.verifier[chainId] as `0x${string}`,
    abi,
    chainId,
    functionName: "verifyHuman",
    args: [address],
    cacheTime: 2_000,
    scopeKey: `${address}-verify`,
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
