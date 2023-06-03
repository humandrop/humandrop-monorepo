import { Airdrop } from "./airdrop";

export type Claim = {
    address: string;
    amount:  bigint,
    transactionHash: string;
    airdrop: Airdrop
}