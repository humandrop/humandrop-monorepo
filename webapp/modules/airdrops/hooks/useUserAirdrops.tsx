import { useContractRead } from "wagmi";
import abi from "../abis/airdropFactory.abi.json";
import { CONTRACTS } from "../aidrops.constants";

type HookResponse = {
  error: Error | null;
  isLoading: boolean;
  mutate: () => void;
  data: number[] | undefined;
};

export function useUserAirdrops({
  address,
  chainId,
}: {
  address?: `0x${string}`;
  chainId: number;
}): HookResponse {
  const { data, isLoading, error, refetch } = useContractRead({
    chainId: chainId as any,
    address: CONTRACTS.airdropFactory[chainId as 80001] as `0x${string}`,
    abi: abi, // we should be able to use any staking rewards contract abi here
    functionName: "getAirdropsByOwner",
    args: [address],
    enabled: !!address,
    scopeKey: `airdrops-by-${address}`,
  });
  

  return {
    data: data  ? (data as any).map(Number): undefined,
    isLoading: isLoading,
    error,
    mutate: refetch
  };
}
