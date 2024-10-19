import { ethers, BigNumber } from "ethers";

let provider;

if (typeof window.ethereum !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  console.log('MetaMask is not installed. Please install it to use this feature.');
}

const address = "0x9c9CB78111e9eDD14c09d5497c3e7a41BeCF6fC5";
const mintAbi = ["function mintCertificate(uint256 carbon, uint256 _cerfId)"];

export const mintCertificate = async (amount, certificate) => {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, mintAbi, signer);
    const tx = await contract.functions.mintCertificate(
      BigNumber.from(amount),
      BigNumber.from(certificate)
    );

    const receipt = await tx.wait();
    console.log("receipt", receipt);
  } catch (error) {
    console.error("Error minting certificate:", error);
    throw error;
  }
};

const approveAbi = [
  "function setApprovalForAll(address operator, bool approved)",
];

export const approval = async (_address) => {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, approveAbi, signer);

    const tx = await contract.setApprovalForAll(_address, true);
    console.log(_address);
    console.log(tx);
    const receipt = await tx.wait();
    console.log("receipt", receipt);
  } catch (error) {
    console.error("Error setting approval:", error);
    throw error;
  }
};

const valueAbi = ["function tokenToValue(uint256) view returns (uint256)"];

export const tokenToValue = async (_id) => {
  if (!provider) {
    throw new Error('Provider is not available. MetaMask might not be installed.');
  }

  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(address, valueAbi, signer);
    const result = await contract.functions.tokenToValue(BigNumber.from(_id));

    console.log("result", result);
    return result;
  } catch (error) {
    console.error("Error getting token value:", error);
    throw error;
  }
};
