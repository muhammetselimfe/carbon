import { ethers } from "ethers";

let provider;

if (typeof window.ethereum !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  console.log('MetaMask is not installed. Please install it to use this feature.');
}

const address = "0x04D2021F4052C22A47338F33a917F4Bc712d593a"; //carbonmarket
const fracAbi = ["function fractionizeNft(uint256 nftId, uint256 amount)"];

export const fractionizeNft = async (_id) => {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, fracAbi, signer);
    const tx = await contract.fractionizeNft(_id, 1);
    const receipt = await tx.wait();
    console.log("receipt", receipt);
    return receipt;
  } catch (error) {
    console.error("Error in fractionizeNft:", error);
    throw error;
  }
};

export const getNftList = async () => {
  const query = `
          query MyQuery {
              mints(first: 100) {
                  carbon
                  cerfId
                  id
                  owner
              }
          }
      `;

  const url = "https://subgraph.decarbon.network/subgraphs/name/avatar";

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.mints;
  } catch (error) {
    console.error("Error fetching NFT data:", error);
    return null;
  }
};

const retireNftabi = ["function retireNft(uint256 nftId) payable"];

export const retireNft = async (nftId) => {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    console.log("Retiring NFT with ID:", nftId);
    const signer = provider.getSigner();
    const options = { value: ethers.utils.parseEther("0") };
    const contract = new ethers.Contract(address, retireNftabi, signer);
    const tx = await contract.functions.retireNft(nftId, options);
    const receipt = await tx.wait();
    console.log("receipt", receipt);
    return receipt;
  } catch (error) {
    console.error("Error in retireNft:", error);
    throw error;
  }
};
