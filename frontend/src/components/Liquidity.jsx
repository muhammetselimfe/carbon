import { useState } from "react";
import { addLiquidity } from "../utils/web3/swap";
import SvgIcon from "./SvgIcon";

const Liquidity = () => {
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  
  const handleAddLiquidity = async () => {
    await addLiquidity(amountA, amountB);
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-semibold mb-6 flex items-center">
          <SvgIcon icon="swap" className="w-8 h-8 mr-3 text-blue-500" />
          Add Liquidity
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">AANG Amount</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
                required
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
              >
                Max
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">wETH Amount</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="0.0"
                value={amountB}
                onChange={(e) => setAmountB(e.target.value)}
                required
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
              >
                Max
              </button>
            </div>
          </div>
          <button
            onClick={handleAddLiquidity}
            className="w-full py-3 px-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Liquidity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Liquidity;
