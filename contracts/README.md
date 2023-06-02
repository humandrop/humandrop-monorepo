# HumanDrop Contracts

This is a hardhat project that holds the Solidity contracts for HumanDrop.

Currently HumanDrop consists of:
- Verifier: Stores all the addresses that are human.
- AidropFactory: Allows to create new Airdrops that track the amount of claims and holds the tokens being airdroped. 

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
npx hardhat run scripts/airdrops/deploy-airdrop-factory.ts --network polygon
npx hardhat run scripts/deploy-verifier.ts --network polygon
```
