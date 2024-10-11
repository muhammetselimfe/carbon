import { useState } from 'react';
import { fractionizeNft } from '../utils/web3/carbonMarket';
import { mintCertificate } from '../utils/web3/certificate';
import SvgIcon from '../components/SvgIcon';

const Provider = () => {
  const [amount, setAmount] = useState('');
  const [certificate, setCertificate] = useState('');
  const [nftID, setNftID] = useState('');
  const [certificateProvider, setCertificateProvider] = useState('Verra'); // Yeni state

  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  const certificateChange = (e) => {
    setCertificate(e.target.value);
  };

  const nftIDChange = (e) => {
    setNftID(e.target.value);
  };

  const certificateProviderChange = (e) => {
    setCertificateProvider(e.target.value);
  };

  const mint = async () => {
    await mintCertificate(parseInt(amount), parseInt(certificate));
    setAmount('');
    setCertificate('');
  };

  const fracturize = async () => {
    await fractionizeNft(parseInt(nftID));
    setNftID('');
  };

  return (
    <section className="w-full pt-24 md:pt-32 md:min-h-screen relative flex flex-col">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Provider Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-6 flex items-center">
                <SvgIcon icon="CARBON" className="w-8 h-8 mr-3 text-green-500" />
                Mint Certificate
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Provider</label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={certificateProvider}
                    onChange={certificateProviderChange}
                  >
                    <option value="Verra">Verra</option>
                    <option value="Gold Standard">Gold Standard</option>
                    <option value="The Climate Registry">The Climate Registry</option>
                    <option value="Recycling Company">Recycling Company</option>
                    <option value="Bike Rental Company">Bike Rental Company</option>
                    <option value="Solar Energy Company">Solar Energy Company</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount of carbon (m³)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="1000000.0"
                    required
                    onChange={amountChange}
                    value={amount}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certificate ID</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="12345678"
                    required
                    onChange={certificateChange}
                    value={certificate}
                  />
                </div>
                <button
                  onClick={mint}
                  className="w-full py-3 px-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Mint NFT
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-6 flex items-center">
                <SvgIcon icon="swap" className="w-8 h-8 mr-3 text-blue-500" />
                Fractionalize NFT
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NFT ID to Fractionalize</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="1"
                    required
                    onChange={nftIDChange}
                    value={nftID}
                  />
                </div>
                <button
                  onClick={fracturize}
                  className="w-full py-3 px-6 text-white bg-gradient-to-r from-purple-400 to-indigo-500 hover:from-purple-500 hover:to-indigo-600 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Fractionalize NFT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Provider;
