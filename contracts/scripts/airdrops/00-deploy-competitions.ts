import { ethers } from "hardhat";

async function main() {

  // Deploy the Manager contract
  const AirdropFactory = await ethers.getContractFactory("AirdropFactory");
  const restrictedUser = '';
  const treasury = '';
  const airdropFactory = await AirdropFactory.deploy(restrictedUser, treasury);

  await airdropFactory.deployed();

  const network = await ethers.provider.getNetwork();
  const networkName = (network.name == 'unknown' ? 'localhost' : network.name);

  console.log(`Network: ${networkName} (chainId=${network.chainId})`);
  console.log("Contract deployed to:", airdropFactory.address);

  if (networkName != "localhost") {
    console.log("");
    console.log("To verify this contract on Etherscan, try:");
    console.log(`npx hardhat verify --network ${networkName} ${airdropFactory.address} ${restrictedUser} ${treasury}`);
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