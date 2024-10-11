import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const address = "0x04D2021F4052C22A47338F33a917F4Bc712d593a"; //carbonmarket
const fracAbi = ["function fractionizeNft(uint256 nftId, uint256 amount)"];

export const fractionizeNft = async (_id) => {
  //await approval(address);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, fracAbi, signer);
  const tx = await contract.fractionizeNft(_id, 1);

  const receipt = await tx.wait();
  console.log("receipt", receipt);
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
  try {
    console.log("Retiring NFT with ID:", nftId);
    // retireNft işleminin detayları
    const signer = provider.getSigner();
    const options = { value: ethers.utils.parseEther("0") };
    const contract = new ethers.Contract(address, retireNftabi, signer);
    console.log(nftId);
    const tx = await contract.functions.retireNft(nftId, options);

    const receipt = await tx.wait();
    console.log("receipt", receipt);
    return receipt;
  } catch (error) {
    console.error("Error in retireNft:", error);
    throw error; // Hatayı yukarı fırlat
  }
};
