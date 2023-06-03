import { polygon, polygonMumbai } from "viem/chains";

export const CONTRACTS = {
    airdropFactory: {
        [polygonMumbai.id]: '0x79C4cfeD4F8ce114E4f0cF8505a0393aC69006d9',
        [polygon.id]: '',
    },
    worldId: {
        [polygonMumbai.id]: '0x719683f13eeea7d84fcba5d7d17bf82e03e3d260',
        [polygon.id]: '0x515f06b36e6d3b707eaecbded18d8b384944c87f',
    },
    verifier: {
        [polygonMumbai.id]: '0xEa390058e26A66eFd22b6E6B6f7f97A559481FBe',
        [polygon.id]: ''
    }
}
