import { erc20ABI, useContractRead } from "wagmi";
type UseTokenAllowanceResponse = {
  error: Error | null;
  isLoading: boolean;
  mutate: () => void;
  data?: bigint;
};

export function useTokenAllowance({
  chainId,
  contractAddress,
  owner,
  spender,
}: {
  chainId: number;
  contractAddress?: `0x${string}`;
  owner: `0x${string}`;
  spender: `0x${string}`;
}): UseTokenAllowanceResponse {
  const {
    data: allowance,
    refetch,
    isLoading,
    error,
  } = useContractRead({
    address: contractAddress,
    abi: erc20ABI,
    chainId: chainId,
    functionName: "allowance",
    args: [owner, spender],
    enabled: !!contractAddress && !!owner && !!spender,
    staleTime: 10_000,
  });

  return {
    data: allowance,
    mutate: refetch,
    isLoading,
    error,
  };
}
