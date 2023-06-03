import { useContractRead } from "wagmi";
import abi from "../abis/airdrop.abi.json";
import { Airdrop } from "../types/airdrop";

type HookResponse = {
  error: Error | null;
  isLoading: boolean;
  mutate: () => void;
  data: boolean | undefined;
};

export function useHasClaimed({
  address,
  chainId,
  airdrop
}: {
  address: `0x${string}`;
  chainId: number;
  airdrop: Airdrop
}): HookResponse {
  const { data, isLoading, error, refetch } = useContractRead({
    chainId: chainId as any,
    address: airdrop.contract as `0x${string}`,
    abi: abi, // we should be able to use any staking rewards contract abi here
    functionName: "hasClaimed",
    args: [address],
    enabled: !!address,
    scopeKey: `claimed-${address}`,
  });

  return {
    data: data as any,
    isLoading: isLoading,
    error,
    mutate: refetch
  };
}
