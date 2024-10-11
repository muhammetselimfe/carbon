import { ethers } from "ethers";
import abi from "./abis/UniswapV2Router02.json";
// const { routerAbi } = require('./abis/UniswapV2Router02.json');
const routerAbi = abi.abi;

// Replace with the UniswapV2Router02 contract address
const routerAddress = "0x0a4507e9c2D3760CdF89e923940DdA6F00C4D54A";


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
    amountOutMin = ethers.utils.parseEther(amountOutMin.toString());

    const signer_address = await signer.getAddress();
    
    console.log("Increasing allowance for", tokenIn);
    await increaseAllowance(tokenIn, amountIn);

    console.log("Swapping tokens", {
      amountIn: amountIn.toString(),
      amountOutMin: amountOutMin.toString(),
      path,
      to: signer_address,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10
    });

    const tx = await routerContract.swapExactTokensForTokens(
      amountIn,
      amountOutMin,
      path,
      signer_address,
      Math.floor(Date.now() / 1000) + 60 * 10,
      { gasLimit: 300000 }
    );

    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block", receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error("Error swapping tokens:", error);
    if (error.data) {
      console.error("Error data:", error.data);
    }
    throw error;
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

    const tokenA = "0xe23407C178FeF19839B8ab4b8a8FCf86e106147F";
    const tokenB = "0xfCaBDeDbaC55da2321bEf9878110f6d74AF8A483";

    // Increase allowance for both tokens
    await increaseAllowance(tokenA, amountADesired);
    await increaseAllowance(tokenB, amountBDesired);

    const amountAMin = ethers.utils.parseEther((parseFloat(amountADesired) * 0.95).toString());
    const amountBMin = ethers.utils.parseEther((parseFloat(amountBDesired) * 0.95).toString());
    amountADesired = ethers.utils.parseEther(amountADesired);
    amountBDesired = ethers.utils.parseEther(amountBDesired);

    const signer_address = await signer.getAddress();
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now

    const tx = await routerContract.addLiquidity(
      tokenA,
      tokenB,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      signer_address,
      deadline,
      { gasLimit: 300000 }
    );

    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block", receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error("Error adding liquidity:", error);
    throw error;
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

const dexaddress = "0x0a4507e9c2D3760CdF89e923940DdA6F00C4D54A";

const tokenAddress = "0xe23407C178FeF19839B8ab4b8a8FCf86e106147F";
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

export const increaseAllowance = async (tokenAddress, amount) => {
  const contract = new ethers.Contract(
    tokenAddress,
    increaseAllowanceabi,
    signer
  );
  const amountInWei = ethers.utils.parseEther(amount.toString());
  const tx = await contract.increaseAllowance(routerAddress, amountInWei);
  const receipt = await tx.wait();
  console.log("Allowance increased:", receipt);
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

export const getTokenBalance = async (tokenAddress) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const ERC20_ABI = [
      "function balanceOf(address account) view returns (uint256)",
      "function decimals() view returns (uint8)",
    ];

    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    const balance = await tokenContract.balanceOf(address);
    const decimals = await tokenContract.decimals();
    return ethers.utils.formatUnits(balance, decimals);
  } catch (error) {
    console.error("Error in getTokenBalance:", error);
    throw error;
  }
};
