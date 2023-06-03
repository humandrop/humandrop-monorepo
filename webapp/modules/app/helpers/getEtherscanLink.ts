import { polygon, polygonMumbai } from "viem/chains";

export function getEtherScanLink(chainId: number): string {
  switch (chainId) {
    case polygon.id:
      return "https://polygonscan.com/";
    case polygonMumbai.id:
      return "https://mumbai.polygonscan.com/";
    default:
      return "";
  }
}
