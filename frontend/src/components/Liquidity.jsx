import { useState } from "react";
import { addLiquidity } from "../utils/web3/swap";

const Liquidity = () => {
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  
  const addLiq = async () => {
    console.log(amountA)
    await addLiquidity(amountA, amountB);
  }
  return (
    <>
      <div className="mb-5">
        <h2 className="block mb-3 font-semibold ">AANG</h2>

        <div className="relative inline-block w-7/12 sm:w-9/12">
          <input
            onChange={(event) => {
              setAmountA(event.target.value);
            }}
            type="text"
            className="block mr-4 p-4 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0.0"
            required
          />
          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2"
          >
            max
          </button>
        </div>
        <div className="inline-block w-5/12 sm:w-3/12 pl-5">
          <button
            onClick={() => addLiq()}

            type="submit"
            className="block w-full p-4 text-white bg-gray-700 rounded-lg border border-gray-600"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <h2 className="block mb-3 font-semibold ">wETH</h2>
        <div className="relative inline-block w-7/12 sm:w-9/12">
          <input
            onChange={(event) => {
              setAmountB(event.target.value);
            }}
            type="text"
            className="block mr-4 p-4 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="0.0"
            required
          />
          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2"
          >
            max
          </button>
        </div>

      </div>
    </>
  );
};

export default Liquidity;
