import { useState } from 'react';
import Swap from '../components/Swap';
import Liquidity from '../components/Liquidity';

const Exchange = () => {
  const [activeTab, setActiveTab] = useState('swap');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 sm:text-5xl md:text-6xl">
            Exchange
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Swap tokens and manage liquidity in our decentralized exchange.
          </p>
        </div>
        <div className="w-full max-w-lg mx-auto shadow-2xl border-2 border-gray-100 rounded-lg">
          <nav className="block w-full border-b-2 border-gray-100">
            <ul className="flex">
              <li
                className={
                  'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ' +
                  (activeTab === 'swap'
                    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                    : '')
                }
              >
                <button
                  className="cursor-pointer flex items-center"
                  onClick={() => setActiveTab('swap')}
                >
                  Swap
                </button>
              </li>
              <li
                className={
                  'text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ' +
                  (activeTab === 'liquidity'
                    ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                    : '')
                }
              >
                <button
                  className="cursor-pointer flex items-center"
                  onClick={() => setActiveTab('liquidity')}
                >
                  Liquidity
                </button>
              </li>
            </ul>
          </nav>
          <div className="p-5">
            {activeTab === 'swap' && <Swap />}
            {activeTab === 'liquidity' && <Liquidity />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
