import { useContractRead, useContractReads } from "wagmi";
import abi from "../abis/airdrop.abi.json";
import { useMemo } from "react";
import { TOKENS } from "@/modules/tokens/tokens.constants";
import { Airdrop } from "../types/airdrop";
export function useAirdrop({
  address,
  chainId,
}: {
  address: string;
  chainId: number;
}) {
  const airdropContract = {
    address: address as `0x${string}`,
    abi: abi as any,
  };

  const { data, refetch, isLoading, error } = useContractReads({
    contracts: [
      {
        ...airdropContract,
        functionName: "owner",
        args: [],
      },
      {
        ...airdropContract,
        functionName: "amountPerUser",
      },
      {
        ...airdropContract,
        functionName: "token",
      },
      {
        ...airdropContract,
        functionName: "maxUsers",
      },
      {
        ...airdropContract,
        functionName: "startDate",
      },
      {
        ...airdropContract,
        functionName: "endDate",
      },
    ],
  });
  console.log(data)

  const airdrop = useMemo(() => {
    if (!data) {
        return null;
    }

    if(data.some((d) => d.status !== "success")) {
        return null;
    }
    // Each data is an array of results from the contract read
    // each result has a status that if "success" the "result" key indicates the value
    const owner = data[0].result as unknown as string;
    const amountPerUser = data[1].result as unknown as bigint;
    const tokenAddress = data[2].result as unknown as string;
    const maxUsers = data[3].result as unknown as bigint;
    const startDate = data[4].result as unknown as bigint;
    const endDate = data[5].result as unknown as bigint;

    // Find the original token
    const token = Object.values(TOKENS).find((t) => t.address[chainId].toLowerCase() === tokenAddress.toLowerCase());

    const finalToken = token || {
        address: {
            [chainId]: tokenAddress
        },
        decimals: 18,
        name: "Unknown",
        symbol: "Unknown",
        logoURI: '',
        colorEnd: 'black',
        colorStart: 'black',
    }

    const drop: Airdrop = {
        active: true,
        amountPerUser,
        endDate: Number(endDate) * 1000,
        startDate: Number(startDate) * 1000,
        token: finalToken,
        owner,
        maxUsers: Number(maxUsers),
        contract: address,
    }

    return drop;
  }, [data, address, chainId])


  return {
    data: airdrop,
    mutate: refetch,
    isLoading,
    error,
  };
}
