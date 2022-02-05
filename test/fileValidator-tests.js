const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {

  beforeEach(async () => {
    const FileOriginVerifier = await ethers.getContractFactory("FileOriginVerifier");
    fileOriginVerifier = await FileOriginVerifier.deploy();
    [addr0, addr1, addr2, addr3] = await ethers.getSigners();
  });

  it("Should Add file correct", async () => {
    fileOriginVerifier.connect(addr0).addFile(
      ethers.utils.formatBytes32String('file_hash_1')
    );
  });

  it("Should failed on duplicity file", async () => {
    let fileHash = ethers.utils.formatBytes32String('file_hash_1');
    fileOriginVerifier.connect(addr0).addFile(fileHash);
    await expect(
      fileOriginVerifier.connect(addr1).addFile(fileHash)
    ).to.be.revertedWith(
      'File already exists'
    );
  });

  it("Should return correct owner of file", async () => {
    let fileHash = ethers.utils.formatBytes32String('file_hash_1');
    fileOriginVerifier.connect(addr0).addFile(fileHash);
    expect(
      await fileOriginVerifier.getFileOrigin(fileHash)
    ).to.be.equal(addr0.address);
  });

  it("Should validate owner correctly", async () => {
    let fileHash = ethers.utils.formatBytes32String('file_hash_1');
    fileOriginVerifier.connect(addr0).addFile(fileHash);
    expect(
      await fileOriginVerifier.verifyFileOrigin(addr0.address, fileHash)
    ).to.be.equal(true);
  });

  it("Should validate owner failed", async () => {
    let fileHash = ethers.utils.formatBytes32String('file_hash_1');
    fileOriginVerifier.connect(addr0).addFile(fileHash);
    expect(
      await fileOriginVerifier.verifyFileOrigin(addr1.address, fileHash)
    ).to.be.equal(false);
  });

});
