import { polygon, polygonMumbai } from "viem/chains";

export const CONTRACTS = {
    airdropFactory: {
        [polygonMumbai.id]: '0x7e8A8ca46082e74c73428125Fe23885d670E94fb',
        [polygon.id]: '',
    },
    worldId: {
        [polygonMumbai.id]: '0x719683f13eeea7d84fcba5d7d17bf82e03e3d260',
        [polygon.id]: '0x515f06b36e6d3b707eaecbded18d8b384944c87f',
    },
    verifier: {
        [polygonMumbai.id]: '0xFf35245e620d63d8C364f253d8D85eF1E74F6f73',
        [polygon.id]: ''
    }
}