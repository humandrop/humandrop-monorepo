import { polygon, polygonMumbai } from "viem/chains";
import { Token } from "./types/token";

export const TOKENS: { [key: string]: Token } = {
  matic: {
    address: {
      [polygon.id]: "0x0000000000000000000000000000000000001010",
      [polygonMumbai.id]: "0x82D3853a59602a44435166a6eeA50a230EeA4b51",
    },

    decimals: 18,
    logoURI: "/tokens/matic-logo.webp",
    name: "Matic",
    symbol: "MATIC",
    colorStart: "#7c3fe3",
    colorEnd: "#9232d2",
  },
  dai: {
    address: {
      [polygon.id]: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
      [polygonMumbai.id]: "0x2394FC1280A28c4fdc46e70dfddCb20CA2671b3C",
    },

    decimals: 18,
    logoURI: "/tokens/dai.png",
    name: "Dai",
    symbol: "DAI",
    colorStart: "#e0b557",
    colorEnd: "#ad7500",
  },
  eth: {
    address: {
      [polygon.id]: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      [polygonMumbai.id]: "0x327Cc18B467D09738D03c10676FC9b3f4Be51673",
    },

    decimals: 18,
    logoURI: "/tokens/eth.png",
    name: "Ether",
    symbol: "ETH",
    colorStart: "#537fef",
    colorEnd: "#537fef",
  },
  humandrop: {
    address: {
      [polygon.id]: "0x7245BFBAc32be8C8b214a63909F94Cc8889f9Ee7",
      [polygonMumbai.id]: "0x7245bfbac32be8c8b214a63909f94cc8889f9ee7",
    },

    decimals: 18,
    logoURI: "/logo.png",
    name: "HumanDrop",
    symbol: "HUM",
    colorStart: "black",
    colorEnd: "grey",
  },
};
