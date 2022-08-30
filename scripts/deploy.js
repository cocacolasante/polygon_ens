const hre = require("hardhat");

async function main() {
  const [owner, randomAddress] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("PolygonENS")
  const domainContract = await contractFactory.deploy()
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by: ", owner);

  let txn = await domainContract.register("test");
  await txn.wait();

  const domainOwner = await domainContract.getAddress("test");
  console.log("test domain is owned by: ", domainOwner);


  let txn2 = await domainContract.connect(randomAddress).register("mastermind");
  await txn2.wait();

  txn2 = await domainContract.connect(randomAddress).setRecord("mastermind", "This test should work");
  await txn2.wait();
  


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
