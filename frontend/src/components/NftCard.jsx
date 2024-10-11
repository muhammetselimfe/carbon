import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SvgIcon from "../components/SvgIcon";

const NftCard = ({ cerfId, id, price }) => {
  const [nftData, setNftData] = useState({});

  const fetchNftData = async (id) => {
    setNftData({
      id: id,
      name: "Certificate #" + cerfId,
      cert_id: cerfId,
      image: "./nftimage.png",
    });
  };

  useEffect(() => {
    fetchNftData(id);
  }, [id]);

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl border border-teal-200">
      <div className="p-5">
        <h3 className="text-2xl font-bold text-teal-800 mb-3">
          {nftData.name}
        </h3>
        <Link to={`/detail/${id}`} className="block">
          <img
            src={nftData.image}
            alt={nftData.name}
            className="w-full h-56 object-cover rounded-lg mb-4 shadow-md hover:opacity-90 transition-opacity duration-300"
          />
        </Link>
        <div className="flex justify-between items-center mb-4">
          <span className="text-teal-700 font-semibold">Price:</span>
          <div className="flex items-center bg-teal-600 rounded-full px-3 py-1">
            <span className="text-lg font-bold text-white mr-2">{price}</span>
            <SvgIcon icon="CARBON" className="w-5 h-5 text-teal-200" />
          </div>
        </div>
        <Link
          to={`/detail/${id}`}
          className="block w-full text-center py-3 px-4 bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold rounded-lg hover:from-teal-500 hover:to-cyan-600 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Retire Certificate
        </Link>
      </div>
    </div>
  );
};

export default NftCard;
