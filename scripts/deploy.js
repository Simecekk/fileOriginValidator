const hre = require("hardhat");

async function main() {
  const FileOriginValidator = await hre.ethers.getContractFactory("FileOriginValidator");
  const fileValidator = await FileOriginValidator.deploy();
  await fileValidator.deployed();
  console.log("fileValidator deployed to:", fileValidator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
