const hre = require("hardhat");

async function main() {
  const FileOriginVerifier = await hre.ethers.getContractFactory("FileOriginVerifier");
  const fileValidator = await FileOriginVerifier.deploy();
  await fileValidator.deployed();
  console.log("fileValidator deployed to:", fileValidator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
