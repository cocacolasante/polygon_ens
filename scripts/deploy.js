const hre = require("hardhat");

async function main() {
    const contractFactory = await hre.ethers.getContractFactory("PolygonENS")
    const domainContract = await contractFactory.deploy("abx")
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("mumbaitest", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain name mumbaitest " )

    txn = await domainContract.setRecord("mumbaitest", "this is a test on the mumbai testnet")
    await txn.wait()
    console.log("Record information was set for mumbaitest.abx")

    const address = await domainContract.getAddress("mumbaitest");
    console.log("mumbaitest.abx domain is owned by: ", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(balance))


}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
