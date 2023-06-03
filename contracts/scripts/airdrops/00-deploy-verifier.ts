import { ethers } from "hardhat";

async function main() {
  const POLYGON_MUMBAIN_CHAINID = 80001;
  const POLYGON_CHAINID = 137;

  // Deploy the Manager contract
  const Verifier = await ethers.getContractFactory("Verifier");

  const network = await ethers.provider.getNetwork();
  const networkName = network.name == "unknown" ? "localhost" : network.name;

  const appId =
    network.chainId === POLYGON_MUMBAIN_CHAINID
      ? "app_staging_9bee79db0f712a19d4699cff6b8733f9"
      : "app_2f5a1758a2236a9264b6cb0cdbfb2a34";

  const worldIdContractAddress =
    network.chainId === POLYGON_MUMBAIN_CHAINID
      ? "0x719683f13eeea7d84fcba5d7d17bf82e03e3d260"
      : "0x515f06b36e6d3b707eaecbded18d8b384944c87f";

  const verifier = await Verifier.deploy(worldIdContractAddress, appId, "1");

  await verifier.deployed();

  console.log(`Network: ${networkName} (chainId=${network.chainId})`);
  console.log("Contract deployed to:", verifier.address);

  if (networkName != "localhost") {
    console.log("");
    console.log("To verify this contract on Etherscan, try:");
    console.log(
      `npx hardhat verify --network ${networkName} ${verifier.address} ${worldIdContractAddress} ${appId} "1"`
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
