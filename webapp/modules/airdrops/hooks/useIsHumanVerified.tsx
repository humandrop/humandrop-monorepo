import { useContractRead } from "wagmi";
import abi from "../abis/verifier.abi.json";
import { CONTRACTS } from "../aidrops.constants";

type HookResponse = {
  error: Error | null;
  isLoading: boolean;
  mutate: () => void;
  data: boolean | undefined;
};

export function useIsHumanVerified({
  address,
  chainId,
}: {
  address: `0x${string}`;
  chainId: number;
}): HookResponse {
  const { data, isLoading, error, refetch } = useContractRead({
    chainId: chainId as any,
    address: CONTRACTS.verifier[chainId as 80001] as `0x${string}`,
    abi: abi, // we should be able to use any staking rewards contract abi here
    functionName: "isVerified",
    args: [address],
    enabled: !!address,
    scopeKey: `verified-${address}`,
  });

  return {
    data: data as any,
    isLoading: isLoading,
    error,
    mutate: refetch
  };
}
