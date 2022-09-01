const hre = require("hardhat");

async function main() {
  const [owner, randomAddress] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("PolygonENS")
  const domainContract = await contractFactory.deploy("abx")
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by: ", owner);

  let txn = await domainContract.register("mortal", {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();

  const address = await domainContract.getAddress("mortal");
  console.log("test domain is owned by: ", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance))


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
