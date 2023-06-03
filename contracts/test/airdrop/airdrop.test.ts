// Tests for the castledao staking contract
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber, Contract } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { expect } from "chai";
import { ethers } from "hardhat";
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { generateMerkle } from "./merkle";

// Contracts used in the tests
let airdropFactory: Contract;
let verifier: Contract;
let testERC20: Contract;

let owner: SignerWithAddress;
let otherUser: SignerWithAddress;
let airdropOwner: SignerWithAddress;

describe("Airdrop", function () {
  before(async () => {
    [owner, airdropOwner, otherUser] = await ethers.getSigners();

    // Deploy the verifier contract
    const Verifier = await ethers.getContractFactory("VerifierMock");
    verifier = await Verifier.deploy();

    // Verify the owner
    await verifier.verifyAddress(await owner.getAddress(), "2", "1111");
  });

  beforeEach(async () => {
    // Deploy the Airdrop Factory contract
    const AirdropFactory = await ethers.getContractFactory("AirdropFactory");
    airdropFactory = await AirdropFactory.deploy(verifier.address);
    await airdropFactory.deployed();

    // Deploy the TestERC20 contract
    const TestERC20 = await ethers.getContractFactory("TestERC20");
    testERC20 = await TestERC20.connect(owner).deploy();
    await testERC20.deployed();

    // Mint 10000 tokens for the airdrop owner
    await testERC20
      .connect(owner)
      .mint(parseEther("10000"), await airdropOwner.getAddress());
  });

  it("Should revert if the user did not give allowance to spend the erc20", async () => {
    const totalAirdropAmount = parseEther("10000");
    const tokenAddress = testERC20.address;
    const amountPerUser = parseEther("100");
    const maxUsers = 100;
    const endDate = Math.floor(Date.now() / 1000) + 3600 * 24; // One day from now
    const startDate = Date.now();

    // Approve the aidropFactory to spend the ERC20 tokens

    // Create a new competition
    const createAirdropTx = airdropFactory
      .connect(airdropOwner)
      .createAirdrop(tokenAddress, amountPerUser, maxUsers, startDate, endDate);

    expect(createAirdropTx).to.be.revertedWith("ERC20: insufficient allowance");
  });

  it("should allow to create a new airdrop", async () => {
    const totalAirdropAmount = parseEther("10000");
    const tokenAddress = testERC20.address;
    const amountPerUser = parseEther("100");
    const maxUsers = 100;
    const endDate = Math.floor(Date.now() / 1000) + 3600 * 24; // One day from now
    const startDate = Date.now();

    // Approve the aidropFactory to spend the ERC20 tokens
    testERC20
      .connect(airdropOwner)
      .approve(airdropFactory.address, totalAirdropAmount);

    // Create a new competition
    const createAirdropTx = await airdropFactory
      .connect(airdropOwner)
      .createAirdrop(tokenAddress, amountPerUser, maxUsers, startDate, endDate);

    const airdropResponse = await createAirdropTx.wait();
    const airdropId = airdropResponse.events?.[0].args?.[0];

    const airdropAddress = await airdropFactory.airdrops(airdropId);
    const AirdropItem = await ethers.getContractFactory("Airdrop");

    const airdrop = new ethers.Contract(
      airdropAddress,
      AirdropItem.interface,
      owner
    );

    // Check competition parameters
    expect(await airdrop.owner()).to.equal(await airdropOwner.getAddress());
    expect(await airdrop.token()).to.equal(testERC20.address);
    expect(await airdrop.endDate()).to.equal(endDate);
    expect(await airdrop.startDate()).to.equal(startDate);
    expect(await airdrop.maxUsers()).to.equal(maxUsers);
    expect(await airdrop.amountPerUser()).to.equal(amountPerUser);

    // The balance of the airdrop contract should be the one specified
    expect(await testERC20.balanceOf(airdropAddress)).to.equal(
      totalAirdropAmount
    );
  });

  it("should reject if the human is not verified", async () => {
    const totalAirdropAmount = parseEther("10000");
    const tokenAddress = testERC20.address;
    const amountPerUser = parseEther("100");
    const maxUsers = 100;
    const endDate = Math.floor(Date.now() / 1000) + 3600 * 24; // One day from now
    const startDate = Date.now();

    // Approve the aidropFactory to spend the ERC20 tokens
    testERC20
      .connect(airdropOwner)
      .approve(airdropFactory.address, totalAirdropAmount);

    // Create a new competition
    const createAirdropTx = await airdropFactory
      .connect(airdropOwner)
      .createAirdrop(tokenAddress, amountPerUser, maxUsers, startDate, endDate);

    const airdropResponse = await createAirdropTx.wait();
    const airdropId = airdropResponse.events?.[0].args?.[0];

    const airdropAddress = await airdropFactory.airdrops(airdropId);
    const AirdropItem = await ethers.getContractFactory("Airdrop");

    const airdrop = new ethers.Contract(
      airdropAddress,
      AirdropItem.interface,
      otherUser
    );

    // Log the balance of the airdrop contract
    console.log("Airdrop balance", await testERC20.balanceOf(airdropAddress));

    // Should be rejected
    await expect(airdrop.connect(otherUser).claim()).to.be.revertedWith(
      "Not verified"
    );
  });

  
  it('should allow to claim if verified', async () => {
    const totalAirdropAmount = parseEther("10000");
    const tokenAddress = testERC20.address;
    const amountPerUser = parseEther("100");
    const maxUsers = 100;
    const endDate = Math.floor(Date.now() / 1000) + 3600 * 24; // One day from now
    const startDate = Math.floor(Date.now() / 1000);
    // Approve the aidropFactory to spend the ERC20 tokens
    testERC20
      .connect(airdropOwner)
      .approve(airdropFactory.address, totalAirdropAmount);

    // Create a new competition
    const createAirdropTx = await airdropFactory
      .connect(airdropOwner)
      .createAirdrop(tokenAddress, amountPerUser, maxUsers, startDate, endDate);

    const airdropResponse = await createAirdropTx.wait();
    const airdropId = airdropResponse.events?.[0].args?.[0];

    const airdropAddress = await airdropFactory.airdrops(airdropId);
    const AirdropItem = await ethers.getContractFactory("Airdrop");

    const airdrop = new ethers.Contract(
      airdropAddress,
      AirdropItem.interface,
      otherUser
    );

    // Verify the user
    await verifier.connect(otherUser).verifyAddress(otherUser.address, '', '');

    // log the balance of the contract
    console.log('Airdrop balance', await testERC20.balanceOf(airdropAddress));

    // Claim the tokens
    await airdrop.connect(otherUser).claim();

    console.log('Claimed')

    // The user should have received the tokens
    expect(await testERC20.balanceOf(otherUser.address)).to.equal(amountPerUser);

    // The contract should display that the user claimed
    expect(await airdrop.hasClaimed(otherUser.address)).to.equal(true);

    // The total claims should have been incremented by one
    expect(await airdrop.totalClaims()).to.equal(1);
  })

});
