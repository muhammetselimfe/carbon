import { ethers } from 'ethers';
import { approval } from './certificate';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const address = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
const fracAbi = ['function fractionizeNft(uint256 nftId, uint256 amount)'];

export const fractionizeNft = async (_id) => {
  //await approval(address);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, fracAbi, signer);
  const tx = await contract.fractionizeNft(_id, 1);

  const receipt = await tx.wait();
  console.log('receipt', receipt);
};

const getNFTAbi = ['function getNftList() view returns (uint256[])'];

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

  const url = 'http://localhost:8000/subgraphs/name/market/';
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.data.mints;
  } catch (error) {
    console.error('Error fetching NFT data:', error);
    return null;
  }
};

const retireNftabi = ['function retireNft(uint256 nftId) payable'];

export const retireNft = async (nftId) => {
  const signer = provider.getSigner();
  const options = { value: ethers.utils.parseEther('0') };
  const contract = new ethers.Contract(address, retireNftabi, signer);
  console.log(nftId);
  const tx = await contract.functions.retireNft(nftId, options);

  const receipt = await tx.wait();
  console.log('receipt', receipt);
};
