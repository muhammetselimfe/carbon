const { utils } = require("ethers");
const hre = require("hardhat");
const { keccak256 } = require("@ethersproject/keccak256");

async function main() {
  const bytecodeGenFactory = await hre.ethers.deployContract("bytecodeGen");
  bytecodeGenFactory.waitForDeployment();

  console.log("BytecodeGenFactory contract: " + bytecodeGenFactory.target);

  const bytecode = await bytecodeGenFactory.bytecode();

  const keccakver = keccak256(bytecode);

  console.log(keccakver);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
