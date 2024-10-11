import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SvgIcon from "../components/SvgIcon";
import { retireNft } from "../utils/web3/carbonMarket";

const getMintById = async (id) => {
  const query = `
    query MyQuery {
      mint(id: "${id}") {
        carbon
        cerfId
        id
        owner
      }
    }
  `;

  const url = "http://localhost:8000/subgraphs/name/market/";
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
    id: 1,
    cert_id: 12345,
    provider: "BikeRental",
    price: 1234,
  });

  useEffect(() => {
    const fetchNftData = async () => {
      const result = await getMintById(id);
      if (result && result.data && result.data.mint) {
        const mintData = result.data.mint;
        setNftData({
          id: mintData.id,
          cert_id: mintData.cerfId,
          provider: mintData.owner,
          price: mintData.carbon,
        });
      }
    };

    fetchNftData();
  }, [id]);

  const handleRetire = async () => {
    console.log("Retire called");
    let nftId = nftData.cert_id;
    await retireNft(nftId);
  };

  return (
    <section className="w-full pt-24 md:pt-0 md:h-screen relative flex flex-row justify-center items-center">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border border-teal-200">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-teal-800 mb-6">
              Certificate #{nftData.cert_id}
            </h1>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-6">
                <img
                  src="https://picsum.photos/500/500"
                  alt={`Certificate ${nftData.cert_id}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2">
                <ul className="mb-6">
                  <li className="flex justify-between py-3 border-b border-teal-200">
                    <span className="font-semibold text-teal-700">Certificate ID:</span>
                    <span className="text-teal-600">{nftData.cert_id}</span>
                  </li>
                  <li className="flex justify-between py-3 border-b border-teal-200">
                    <span className="font-semibold text-teal-700">Provider:</span>
                    <span className="text-teal-600">{nftData.provider}</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-teal-700 font-semibold">Price:</span>
                  <div className="flex items-center bg-teal-600 rounded-full px-3 py-1">
                    <span className="text-lg font-bold text-white mr-2">{nftData.price}</span>
                    <SvgIcon icon="CARBON" className="w-5 h-5 text-teal-200" />
                  </div>
                </div>
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
