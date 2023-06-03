export type Token = {
    name: string;
    symbol: string;
    decimals: number;
    address: {
        [chainId: number]: string;
    };
    logoURI: string;
    colorStart: string;
    colorEnd: string;
}