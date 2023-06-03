import { Token } from "@/modules/tokens/types/token"

export type Airdrop = {
    token: Token,
    amountPerUser: bigint,
    maxUsers: number,
    startDate: number,
    endDate: number,
    active: boolean,
    owner: string,
    contract: string
}