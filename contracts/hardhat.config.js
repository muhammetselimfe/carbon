require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.5.16",
      },
      {
        version: "0.5.0",
      },
      {
        version: "0.6.6",
        settings: {
          // See the solidity docs for advice about optimization and evmVersion
          optimizer: {
            enabled: true,
            runs: 999999,
          },
          evmVersion: "istanbul",
          outputSelection: {
            "*": {
              "": ["ast"],
              "*": [
                "evm.bytecode.object",
                "evm.deployedBytecode.object",
                "abi",
                "evm.bytecode.sourceMap",
                "evm.deployedBytecode.sourceMap",
                "metadata",
              ],
            },
          },
        },
      },
    ],
    overrides: {
      "contracts/libraries/UniswapV2Library.sol": {
        version: "0.5.0",
      },
      "contracts/UniswapV2Factory.sol": {
        version: "0.5.16",
        settings: {},
      },
    },
  },
  networks: {
    scroll: {
      url: `https://scroll-sepolia-testnet.rpc.thirdweb.com`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      scroll: "abc",
    },
    customChains: [
      {
        network: "scroll",
        chainId: 534351,
        urls: {
          apiURL: "https://sepolia-blockscout.scroll.io/api",
          browserURL: "https://sepolia-blockscout.scroll.io/",
        },
      },
    ],
  },
};
