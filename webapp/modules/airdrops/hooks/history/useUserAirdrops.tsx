import { request, gql } from "graphql-request";
import useSWR, { KeyedMutator } from "swr";
import { Airdrop } from "../../types/airdrop";
import { TOKENS } from "@/modules/tokens/tokens.constants";
import { getSubgraphUrl } from "../../helpers/getSubgraphUrl";

async function fetchAirdropList(
  chainId: number,
  owner: string,
  urlSubgraph: string
): Promise<Airdrop[]> {
  const query = gql`
    {
        airdrops(where: {owner: "${owner.toLowerCase()}"}) {
            id
            AirdropFactory_id
            owner
            tokenAddress
            totalClaimed
            amountPerUser 
            maxUsers
            startDate
            endDate
            transactionHash
            claims {
              id
              address
              amount
            }
          }
    }
  `;

  const response = (await request(urlSubgraph, query)) as any;

  return response.airdrops.map((airdrop: any) => {
    const tokenAddress = airdrop.tokenAddress;
    const token = Object.values(TOKENS).find(
      (t) => t.address[chainId].toLowerCase() === tokenAddress.toLowerCase()
    );

    const finalToken = token || {
      address: {
        [chainId]: tokenAddress,
      },
      decimals: 18,
      name: "Unknown",
      symbol: "Unknown",
      logoURI: "",
      colorEnd: "black",
      colorStart: "black",
    };

    const airdropObj: Airdrop = {
      active: true,
      startDate: parseInt(airdrop.startDate, 10) * 1000,
      endDate: parseInt(airdrop.endDate, 10) * 1000,
      maxUsers: parseInt(airdrop.maxUsers, 10),
      amountPerUser: BigInt(airdrop.amountPerUser),
      contract: airdrop.id,
      owner: airdrop.owner,
      token: finalToken,
    };

    return airdropObj;
  });
}

export function useUserAirdrops(chainId: number, owner?: string): {
  isLoading: boolean;
  error: Error | null;
  mutate: KeyedMutator<Airdrop[]>;
  data: Airdrop[] | undefined;
} {
  const urlSubgraph = getSubgraphUrl(chainId) || "";

  const { data, error, mutate, isValidating } = useSWR(
    urlSubgraph && owner ? [urlSubgraph, `airdrop-list-${chainId}-${owner}`] : null,
    () => fetchAirdropList(chainId, owner as string, urlSubgraph )
  );

  return {
    data,
    isLoading: !data && isValidating,
    error,
    mutate,
  };
}
