# HumanDrop Contracts

This is a hardhat project that holds the Solidity contracts for HumanDrop.

Currently HumanDrop consists of:
- Verifier: Stores all the addresses that are human.
- AidropFactory: Allows to create new Airdrops that track the amount of claims and holds the tokens being airdroped. 

## Deployed contracts:

- Verifier
  - Testnet: https://mumbai.polygonscan.com/address/0xFf35245e620d63d8C364f253d8D85eF1E74F6f73#code
  - Mainnet:
- AirdropFactory
    - Testnet: https://mumbai.polygonscan.com/address/0x8b84f8169cb2429F538475404f758E33BC9EFDCF#code
    - Mainnet

## Installation

```
yarn
```

## Testing

```
yarn test
```

## Deploy on testnet:

Optional: Deploy mock token contracts
```shell
npx hardhat run scripts/airdrops/00-deploy-verifier.ts --network polygonMumbai
npx hardhat run scripts/airdrops/01-deploy-airdrop-factory.ts --network polygonMumbai
```

## Deploy on mainnet

```shell
npx hardhat run scripts/airdrops/00-deploy-verifier.ts --network polygon
npx hardhat run scripts/airdrops/01-deploy-airdrop-factory.ts --network polygon
```