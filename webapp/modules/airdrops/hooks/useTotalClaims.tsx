import { useContractRead } from "wagmi";
import abi from "../abis/airdrop.abi.json";
import { Airdrop } from "../types/airdrop";

type HookResponse = {
  error: Error | null;
  isLoading: boolean;
  mutate: () => void;
  data: number | undefined;
};

export function useTotalClaims({
  chainId,
  airdrop
}: {
  chainId: number;
  airdrop: Airdrop
}): HookResponse {
  const { data, isLoading, error, refetch } = useContractRead({
    chainId: chainId as any,
    address: airdrop.contract as `0x${string}`,
    abi: abi, // we should be able to use any staking rewards contract abi here
    functionName: "totalClaims",
    args: [],
    scopeKey: `total-claims-${airdrop.contract}`,
  });


  return {
    data: data ? Number(data) : undefined,
    isLoading: isLoading,
    error,
    mutate: refetch
  };
}
