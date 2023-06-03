import { ethers } from "hardhat";

async function main() {
  const POLYGON_MUMBAIN_CHAINID = 80001;
  const POLYGON_CHAINID = 137;

  // Deploy the Manager contract
  const AirdropFactory = await ethers.getContractFactory("AirdropFactory");

  const network = await ethers.provider.getNetwork();
  const networkName = network.name == "unknown" ? "localhost" : network.name;


  const verifierAddress =
    network.chainId === POLYGON_MUMBAIN_CHAINID
      ? "0xEa390058e26A66eFd22b6E6B6f7f97A559481FBe"
      : "0";

  const airdropFactory = await AirdropFactory.deploy(verifierAddress);

  await airdropFactory.deployed();

  console.log(`Network: ${networkName} (chainId=${network.chainId})`);
  console.log("Contract deployed to:", airdropFactory.address);

  if (networkName != "localhost") {
    console.log("");
    console.log("To verify this contract on Etherscan, try:");
    console.log(
      `npx hardhat verify --network ${networkName} ${airdropFactory.address} ${verifierAddress}`
    );
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
