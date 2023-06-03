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
import { Airdrop } from "../types/airdrop";
import { onSettledWrapper } from "./onSettledWrapper";

// Returns the tx hash
type HookParams = {
  airdrop: Airdrop;
  onError: (error: Error) => void;
  onSuccess: (hash: string) => void;
  chainId: number;
};

export function useCreateAirdrop({
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

  // Create airdrop params
  const tokenAddress = airdrop.token.address[chainId];
  const amountPerUser = airdrop.amountPerUser;
    const contractArgs = [tokenAddress, amountPerUser, airdrop.maxUsers, Math.floor(airdrop.startDate / 1000), Math.floor(airdrop.endDate / 1000)];

    console.log(contractArgs);
  

  const { config: approveConfig, refetch } = usePrepareContractWrite({
    address: CONTRACTS.airdropFactory[chainId] as `0x${string}`,
    abi,
    chainId,
    functionName: "createAirdrop",
    args: contractArgs,
  
    cacheTime: 2_000,
    scopeKey: `${airdrop.token}-create`,
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
