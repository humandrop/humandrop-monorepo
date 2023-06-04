import { polygon, polygonMumbai } from "viem/chains";

export function getSubgraphUrl(chainId: number): string {
  switch (chainId) {
    case polygon.id:
      return "https://api.thegraph.com/subgraphs/name/rafinskipg/humandrop-polygon";
    case polygonMumbai.id:
      return "https://api.thegraph.com/subgraphs/name/rafinskipg/humandrop-mumbai";
    default:
      return "";
  }
}
