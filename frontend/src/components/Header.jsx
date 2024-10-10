import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const location = useLocation();

  const CORRECT_CHAIN_ID = 5353; 

  const checkAndSwitchNetwork = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (parseInt(chainId, 16) !== CORRECT_CHAIN_ID) {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${CORRECT_CHAIN_ID.toString(16)}` }],
          });
        }
      } catch (error) {
        console.error('Failed to switch network:', error);
      }
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        await checkAndSwitchNetwork();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setIsConnected(true);
          const signer = provider.getSigner();
          setSigner(signer);
          
          // Added these lines to update wallet address and balance after setting the signer
          const address = await signer.getAddress();
          const balance = await provider.getBalance(address);
          setWalletAddress(address);
          setEthBalance(ethers.utils.formatEther(balance));
        }
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await checkAndSwitchNetwork();
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        
        setSigner(signer);
        setIsConnected(true);
        setWalletAddress(address);
        setEthBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  return (
    <header className={isNavExpanded ? 'menu-open' : ''}>
      <nav className="border-gray-200 px-2 sm:px-4 py-2.5 primary-menu left-0 rigt-0 z-20 fixed w-full bg-white border-b">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link
            to="/"
            className="flex items-center"
            onClick={() => {
              setIsNavExpanded(false);
            }}
          >
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mr-4 hover:animate-pulse transition-all duration-300 ease-in-out">
              DeCarbon Market
            </span>

          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="svg-trigger" viewBox="0 0 100 100">
              <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
              <path d="m 30,50 h 40"></path>
              <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 items-center">
              <li>
                <Link
                  to="/"
                  className={
                    location.pathname === '/'
                      ? 'block py-2 pr-4 pl-3 md:p-0 text-blue-500'
                      : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
                  }
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/exchange"
                  className={
                    location.pathname === '/exchange'
                      ? 'block py-2 pr-4 pl-3 md:p-0 text-blue-500'
                      : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
                  }
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Exchange
                </Link>
              </li>
              <li>
                <Link
                  to="/marketplace"
                  className={
                    location.pathname === '/marketplace'
                      ? 'block py-2 pr-4 pl-3 md:p-0 text-blue-500'
                      : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
                  }
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/provider"
                  className={
                    location.pathname === '/provider'
                      ? 'block py-2 pr-4 pl-3 md:p-0 text-blue-500'
                      : 'block py-2 pr-4 pl-3 text-gray-400 md:border-0 md:p-0'
                  }
                  onClick={() => {
                    setIsNavExpanded(false);
                  }}
                >
                  Provider
                </Link>
              </li>
              <li>
                <w3m-button/>
              </li>
              <li>
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 transition-all duration-300 ease-in-out"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300 ease-in-out"
                    >
                      {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connected'}
                    </button>
                    <span className="text-sm font-medium text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                      {ethBalance ? `${parseFloat(ethBalance).toFixed(2)} CARB` : '0.00 CARB'}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;