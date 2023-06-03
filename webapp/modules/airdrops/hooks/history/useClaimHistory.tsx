import { request, gql } from "graphql-request";
import useSWR, { KeyedMutator } from "swr";
import { Airdrop } from "../../types/airdrop";
import { TOKENS } from "@/modules/tokens/tokens.constants";
import { getSubgraphUrl } from "../../helpers/getSubgraphUrl";
import { Claim } from "../../types/claim";

async function fetchClaimHistory(
  chainId: number,
  urlSubgraph: string
): Promise<Claim[]> {
  const query = gql`
    {
        claims {
            id
            amount
            address
            transactionHash
            airdrop {
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
            }
        }
        
    }
  `;

  const response = (await request(urlSubgraph, query)) as any;

  return response.claims.map((claim: any) => {

    const airdrop = claim.airdrop;
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

    return {
        ...claim,
        amount: BigInt(claim.amount),
        airdrop: airdropObj
    };
  });
}

export function useClaimHistory(chainId: number): {
  isLoading: boolean;
  error: Error | null;
  mutate: KeyedMutator<Claim[]>;
  data: Claim[] | undefined;
} {
  const urlSubgraph = getSubgraphUrl(chainId) || "";

  const { data, error, mutate, isValidating } = useSWR(
    urlSubgraph ? [urlSubgraph, `claim-list-${chainId}`] : null,
    () => fetchClaimHistory(chainId, urlSubgraph)
  );

  return {
    data,
    isLoading: !data && isValidating,
    error,
    mutate,
  };
}
