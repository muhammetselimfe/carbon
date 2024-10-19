import { ethers } from "ethers";
import abi from "./abis/UniswapV2Router02.json";
// const { routerAbi } = require('./abis/UniswapV2Router02.json');
const routerAbi = abi.abi;

// Replace with the UniswapV2Router02 contract address
const routerAddress = "0x0a4507e9c2D3760CdF89e923940DdA6F00C4D54A";

let provider;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  console.log('MetaMask is not installed. Please install it to use this feature.');
}

export async function swapTokens(tokenIn, tokenOut, amountIn, amountOutMin) {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

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

export async function balanceOf(tokenAddress, accountAddress) {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ['function balanceOf(address) view returns (uint256)'],
      provider
    );

    const balance = await tokenContract.balanceOf(accountAddress);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
}

export async function increaseAllowance(tokenAddress, amount) {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ['function approve(address spender, uint256 amount) returns (bool)'],
      signer
    );

    const tx = await tokenContract.approve(routerAddress, amount);
    await tx.wait();
    console.log("Allowance increased for", tokenAddress);
  } catch (error) {
    console.error("Error increasing allowance:", error);
    throw error;
  }
}

export async function getAmountOfTokens(amountIn, path) {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const routerContract = new ethers.Contract(
      routerAddress,
      routerAbi,
      provider
    );

    const amounts = await routerContract.getAmountsOut(amountIn, path);
    return amounts[amounts.length - 1];
  } catch (error) {
    console.error("Error getting amount of tokens:", error);
    throw error;
  }
}

export async function getTokenBalance(tokenAddress) {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    
    const tokenContract = new ethers.Contract(
      tokenAddress,
      ['function balanceOf(address) view returns (uint256)'],
      provider
    );

    const balance = await tokenContract.balanceOf(signerAddress);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error getting token balance:", error);
    throw error;
  }
}

export async function addLiquidity(tokenA, tokenB, amountA, amountB) {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const signer = provider.getSigner();
    const routerContract = new ethers.Contract(
      routerAddress,
      routerAbi,
      signer
    );

    const signerAddress = await signer.getAddress();

    // Convert amounts to wei
    const amountAWei = ethers.utils.parseEther(amountA.toString());
    const amountBWei = ethers.utils.parseEther(amountB.toString());

    // Calculate minimum amounts (you may want to adjust these values)
    const amountAMin = amountAWei.mul(95).div(100); // 95% of amountA
    const amountBMin = amountBWei.mul(95).div(100); // 95% of amountB

    console.log("Increasing allowance for tokenA and tokenB");
    await increaseAllowance(tokenA, amountAWei);
    await increaseAllowance(tokenB, amountBWei);

    console.log("Adding liquidity", {
      tokenA,
      tokenB,
      amountA: amountAWei.toString(),
      amountB: amountBWei.toString(),
      amountAMin: amountAMin.toString(),
      amountBMin: amountBMin.toString(),
      to: signerAddress,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10
    });

    const tx = await routerContract.addLiquidity(
      tokenA,
      tokenB,
      amountAWei,
      amountBWei,
      amountAMin,
      amountBMin,
      signerAddress,
      Math.floor(Date.now() / 1000) + 60 * 10,
      { gasLimit: 500000 }
    );

    console.log("Transaction hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block", receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error("Error adding liquidity:", error);
    if (error.data) {
      console.error("Error data:", error.data);
    }
    throw error;
  }
}
