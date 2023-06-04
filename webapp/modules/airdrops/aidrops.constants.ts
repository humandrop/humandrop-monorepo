import { polygon, polygonMumbai } from "viem/chains";

export const CONTRACTS = {
    airdropFactory: {
        [polygonMumbai.id]: '0x79C4cfeD4F8ce114E4f0cF8505a0393aC69006d9',
        [polygon.id]: '0x8b84f8169cb2429F538475404f758E33BC9EFDCF',
    },
    worldId: {
        [polygonMumbai.id]: '0x719683f13eeea7d84fcba5d7d17bf82e03e3d260',
        [polygon.id]: '0x515f06b36e6d3b707eaecbded18d8b384944c87f',
    },
    verifier: {
        [polygonMumbai.id]: '0xEa390058e26A66eFd22b6E6B6f7f97A559481FBe',
        [polygon.id]: '0xFf35245e620d63d8C364f253d8D85eF1E74F6f73'
    }
}
