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

  try{
    txn = await domainContract.connect(randomAddress).connect(balance)
    await txn.wait()
    

  }catch(error){
    console.log("could not rob contract", error)
  }

  let ownerBalance = await hre.ethers.provider.getBalance(owner.address)
  console.log("Balance of owners wallet: ", hre.ethers.utils.formatEther(ownerBalance))

  txn = await domainContract.connect(owner).withdraw()
  await txn.wait();

  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address)

  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));



}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
