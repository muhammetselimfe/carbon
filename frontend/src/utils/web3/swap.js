import { ethers } from "ethers";
import abi from "./abis/UniswapV2Router02.json";
// const { routerAbi } = require('./abis/UniswapV2Router02.json');
const routerAbi = abi.abi;

// Replace with the UniswapV2Router02 contract address
const routerAddress = "0x061Eeefc20fcbA6b1694Ab6b0711f94bb88FA542";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function swapTokens(tokenIn, tokenOut, amountIn, amountOutMin) {
  try {
    const signer = provider.getSigner();
    const routerContract = new ethers.Contract(
      routerAddress,
      routerAbi,
      signer
    );

    const path = [tokenIn, tokenOut];
    amountIn = ethers.utils.parseEther(amountIn);

    const signer_address = await signer.getAddress();
    const tx = await routerContract.connect(signer).swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      path,
      signer_address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      { gasPrice: ethers.utils.parseUnits("30", "gwei") } // Set your preferred gas price
    );

    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block", receipt.blockNumber);
  } catch (error) {
    console.error("Error swapping tokens:", error);
  }
}

export async function addLiquidity(amountADesired, amountBDesired) {
  try {
    const signer = provider.getSigner();
    const routerContract = new ethers.Contract(
      routerAddress,
      routerAbi,
      signer
    );

    const amountAMin = 10;
    const amountBMin = 10;
    amountADesired = parseInt(amountADesired);
    amountBDesired = parseInt(amountBDesired);
    const tokenB = "0xb6E6620792c475662A762d0684e00a997E3203bF"; // Replace with the actual address of token A
    const tokenA = "0x05044Cd5D9D8fa101055de80427dF4969375Ac54"; // Replace with the actual address of token B

    const signer_address = await signer.getAddress();
    const tx = await routerContract.connect(signer).addLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      signer_address,
      Math.floor(Date.now() / 100) + 60 * 10
      // { gasPrice: ethers.utils.parseUnits("3000000000000", "gwei") }
    );

    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block", receipt.blockNumber);
  } catch (error) {
    console.error("Error adding liquidity:", error);
  }
}

export async function addLiquidityETH(amountTokenDesired, amountETH) {
  try {
    const signer = provider.getSigner();
    const routerContract = new ethers.Contract(
      routerAddress,
      routerAbi,
      signer
    );

    amountTokenDesired = ethers.utils.parseEther(amountTokenDesired);
    const amountTokenMin = ethers.utils.parseEther("0");
    const amountETHMin = ethers.utils.parseEther("0");
    amountETH = ethers.utils.parseEther(amountETH);
    const to = await signer.getAddress();
    const token = "0xbCb425998f87AE6836Da6Ed38fcD06b66889B702"; // Replace with the actual address of the token
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

    const tx = await routerContract
      .connect(signer)
      .addLiquidityETH(
        token,
        amountTokenDesired,
        amountTokenMin,
        amountETHMin,
        to,
        deadline,
        {
          value: ethers.utils.parseEther("0.1"),
          gasPrice: ethers.utils.parseUnits("300", "gwei"),
        }
      );

    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block", receipt.blockNumber);
  } catch (error) {
    console.error("Error adding ETH liquidity:", error);
  }
}

const dexaddress = "0x0355eE85Be5eD60331a36Ee096e829f500FC57c9";

const tokenAddress = "0xa4e0C6859C9Fe01B097f6AE17e9AD51656e23f68";
const cryptoDevTokenToEthabi = [
  "function cryptoDevTokenToEth(uint256 _tokensSold, uint256 _minEth)",
];

const signer = provider.getSigner();

export const cryptoDevTokenToEth = async (_tokensSold) => {
  const contract = new ethers.Contract(
    dexaddress,
    cryptoDevTokenToEthabi,
    signer
  );

  let num = ethers.utils.parseEther(_tokensSold.toString());

  const tx = await contract.functions.cryptoDevTokenToEth(num, 1);
  const receipt = await tx.wait();
  console.log("receipt", receipt);
};

const increaseAllowanceabi = [
  "function increaseAllowance(address spender, uint256 addedValue) returns (bool)",
];

export const increaseAllowance = async (_tokensSold) => {
  const contract = new ethers.Contract(
    tokenAddress,
    increaseAllowanceabi,
    signer
  );
  const tx = await contract.functions.increaseAllowance(
    dexaddress,
    _tokensSold
  );
  const receipt = await tx.wait();
  console.log("receipt", receipt);
};

const getAmountOfTokensabi = [
  "function getAmountOfTokens(uint256 inputAmount, uint256 inputReserve, uint256 outputReserve) pure returns (uint256)",
];

export const getAmountOfTokens = async (inputAmount) => {
  if (inputAmount === 0) {
    return 0;
  }
  inputAmount = inputAmount * 100;
  if (inputAmount >= 52) {
    return 0;
  }
  let inputReserve = 52;
  let outputReserve = inputReserve - inputAmount;
  const contract = new ethers.Contract(
    dexaddress,
    getAmountOfTokensabi,
    provider
  );
  let result = await contract.functions.getAmountOfTokens(
    inputAmount,
    inputReserve,
    outputReserve
  );
  result = Number(result);

  console.log("result", result / 100);

  return result / 100;
};

const ethToCryptoDevTokenabi = [
  "function ethToCryptoDevToken(uint256 _minTokens) payable",
];

export const ethToCryptoDevToken = async (_ethAmount) => {
  const options = { value: ethers.utils.parseEther(_ethAmount.toString()) };
  const contract = new ethers.Contract(
    dexaddress,
    ethToCryptoDevTokenabi,
    signer
  );
  const tx = await contract.functions.ethToCryptoDevToken(1, options);
  const receipt = await tx.wait();
  console.log("receipt", receipt);
};

const balanceOfabi = [
  "function balanceOf(address account) view returns (uint256)",
];

export const balanceOf = async () => {
  const contract = new ethers.Contract(tokenAddress, balanceOfabi, signer);
  let tempAdress = await signer.getAddress();
  let result = await contract.functions.balanceOf(tempAdress);
  result = ethers.utils.formatEther(result.toString());

  console.log("result", result);
  return result;
};
