import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SvgIcon from "../components/SvgIcon";
import { retireNft } from "../utils/web3/carbonMarket";

const getMintById = async (id) => {
  const query = `
    query MyQuery {
      mints(where: {id: "${id}"}) {
        blockNumber
        blockTimestamp
        carbon
        cerfId
        id
        owner
        transactionHash
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
    return data;
  } catch (error) {
    console.error("Error fetching mint data:", error);
    return null;
  }
};

const Detail = () => {
  const { id } = useParams();
  const [nftData, setNftData] = useState({
    id: "",
    cerfId: "",
    owner: "",
    carbon: "",
    blockNumber: "",
    blockTimestamp: "",
    transactionHash: "",
  });

  useEffect(() => {
    const fetchNftData = async () => {
      const result = await getMintById(id);
      if (result && result.data && result.data.mints && result.data.mints.length > 0) {
        const mintData = result.data.mints[0];
        setNftData({
          id: mintData.id,
          cerfId: mintData.cerfId,
          owner: mintData.owner,
          carbon: mintData.carbon,
          blockNumber: mintData.blockNumber,
          blockTimestamp: mintData.blockTimestamp,
          transactionHash: mintData.transactionHash,
        });
      }
    };
    fetchNftData();
  }, [id]);

  const handleRetire = async () => {
    try {
      await retireNft(nftData.id);
      alert("NFT retired successfully!");
    } catch (error) {
      console.error("Error retiring NFT:", error);
      alert("Failed to retire NFT. Please try again.");
    }
  };

  return (
    <section className="w-full pt-24 md:pt-0 md:h-screen relative flex flex-row justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border border-teal-200">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-teal-800 mb-6">
              Certificate #{nftData.cerfId}
            </h1>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-6">
                <img
                  src="https://picsum.photos/500/500"
                  alt={`Certificate ${nftData.cerfId}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2">
                <ul className="mb-6">
                  <li className="flex justify-between py-3 border-b border-teal-200">
                    <span className="font-semibold text-teal-700">Certificate ID:</span>
                    <span className="text-teal-600">{nftData.cerfId}</span>
                  </li>
                  <li className="flex justify-between py-3 border-b border-teal-200">
                    <span className="font-semibold text-teal-700">Owner:</span>
                    <span className="text-teal-600">{nftData.owner}</span>
                  </li>
                  <li className="flex justify-between py-3 border-b border-teal-200">
                    <span className="font-semibold text-teal-700">Carbon Amount:</span>
                    <span className="text-teal-600">{nftData.carbon}</span>
                  </li>
                  <li className="flex justify-between py-3 border-b border-teal-200">
                    <span className="font-semibold text-teal-700">Block Number:</span>
                    <span className="text-teal-600">{nftData.blockNumber}</span>
                  </li>
                  <li className="flex justify-between py-3 border-b border-teal-200">
                    <span className="font-semibold text-teal-700">Timestamp:</span>
                    <span className="text-teal-600">
                      {new Date(parseInt(nftData.blockTimestamp) * 1000).toLocaleString()}
                    </span>
                  </li>
                  <li className="flex justify-between py-3 border-b border-teal-200">
                    <span className="font-semibold text-teal-700">Transaction Hash:</span>
                    <span className="text-teal-600 truncate">{nftData.transactionHash}</span>
                  </li>
                </ul>
                <button
                  onClick={handleRetire}
                  className="w-full text-center py-3 px-4 bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold rounded-lg hover:from-teal-500 hover:to-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Retire Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
