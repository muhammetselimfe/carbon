import { useState, useEffect } from 'react';
import SvgIcon from '../components/SvgIcon';
import {
  getAmountOfTokens,
  balanceOf,
  swapTokens,
  getTokenBalance
} from '../utils/web3/swap';

const tokens = {
  CARBON: {
    symbol: 'CO2',
    name: 'Carbon Credit Token',
  },
  WETH: {
    symbol: 'WCRBN',
    name: 'WCARBON',
  },
};

const Swap = () => {
  const fromToken = tokens.CARBON;
  const toToken = tokens.WETH;
  const [direction, setDirection] = useState(0);
  const [swap, setSwap] = useState([fromToken, toToken]);
  const [amount, setAmount] = useState('');
  const [amountOfTokens, setmountOfTokens] = useState(0);
  const [balanceFrom, setBalanceFrom] = useState('');
  const [balanceTo, setBalanceTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balanceText, setBalanceText] = useState('');
  const [swapResult, setSwapResult] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const balFrom = await getTokenBalance("0xfCaBDeDbaC55da2321bEf9878110f6d74AF8A483");
        const balTo = await getTokenBalance("0xe23407C178FeF19839B8ab4b8a8FCf86e106147F");
        setBalanceFrom(balFrom);
        setBalanceTo(balTo);
        setBalanceText(`${fromToken.symbol} Balance: ${balFrom}, ${toToken.symbol} Balance: ${balTo}`);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchBalances();

    if (direction === 1) {
      setSwap([toToken, fromToken]);
    } else {
      setSwap([fromToken, toToken]);
    }

    getAmountOfToken(amount);
  }, [direction, toToken, fromToken, amount]);

  async function getbalanceOf() {
    let tempBalance = await balanceOf();
    setBalanceText("Your Carbon Credit Balance is: " + tempBalance);
  }

  async function getAmountOfToken() {
    if (amount !== 0) {
      let temptoken = await getAmountOfTokens(amount);
      setmountOfTokens(temptoken);
    }
  }

  async function swapCall() {
    try {
      setIsLoading(true);
      setSwapResult(null); // Yeni swap işlemi başladığında önceki sonucu temizle
      const tokenIn = swap[0].symbol === 'CO2' ? "0xfCaBDeDbaC55da2321bEf9878110f6d74AF8A483" : "0xe23407C178FeF19839B8ab4b8a8FCf86e106147F";
      const tokenOut = swap[0].symbol === 'CO2' ? "0xe23407C178FeF19839B8ab4b8a8FCf86e106147F" : "0xfCaBDeDbaC55da2321bEf9878110f6d74AF8A483";
      
      console.log("Swapping", amount, "of", swap[0].symbol, "for", swap[1].symbol);
      
      const result = await swapTokens(
        tokenIn,
        tokenOut,
        amount,
        amountOfTokens
      );
      
      console.log("Swap result:", result);
      setSwapResult(result); // Swap sonucunu state'e kaydet

      // Bakiyeleri güncelle
      const balFrom = await getTokenBalance("0xfCaBDeDbaC55da2321bEf9878110f6d74AF8A483");
      const balTo = await getTokenBalance("0xe23407C178FeF19839B8ab4b8a8FCf86e106147F");
      setBalanceFrom(balFrom);
      setBalanceTo(balTo);
      setBalanceText(`${fromToken.symbol} Balance: ${balFrom}, ${toToken.symbol} Balance: ${balTo}`);
    } catch (error) {
      console.error("Error during swap:", error);
      if (error.data) {
        console.error("Error data:", error.data);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleMaxClick = () => {
    setAmount(direction === 0 ? balanceFrom : balanceTo);
  };

  const truncateHash = (hash, length = 10) => {
    return `${hash.substring(0, length)}...${hash.substring(hash.length - length)}`;
  };

  return (
    <div className="p-5">
      <form className="mb-6">
        <div className="relative mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">{swap[0].symbol}</label>
            <span className="text-sm text-gray-500">Balance: {direction === 0 ? balanceFrom : balanceTo}</span>
          </div>
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SvgIcon icon={swap[0].symbol} className="w-5 h-5 text-green-400" />
          </div>
          <input
            type="text"
            onChange={(event) => {
              setAmount(event.target.value);
            }}
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Enter ${swap[0].symbol} amount`}
            required
          />
          <button
            type="button"
            className="text-white absolute right-2.5 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
            onClick={handleMaxClick}
          >
            max
          </button>
        </div>
        <div className="flex justify-center mb-5">
          <button
            type="button"
            className="bg-white p-3 rounded-full text-gray-500 text-sm font-medium hover:bg-gray-50"
            onClick={async () => {
              setDirection((direction + 1) % 2);
            }}
          >
            <SvgIcon icon="swap" className="w-8 h-8 text-blue-500" />
          </button>
        </div>
        <div className="relative mb-5">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">{swap[1].symbol}</label>
            <span className="text-sm text-gray-500">Balance: {direction === 0 ? balanceTo : balanceFrom}</span>
          </div>
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SvgIcon icon={swap[1].symbol} className="w-5 h-5 text-blue-500" />
          </div>
          <input
            type="text"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`You will receive ${amountOfTokens} ${swap[1].symbol}`}
            readOnly
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="px-8 py-3 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg font-medium text-sm transition-all duration-300 ease-in-out"
            onClick={swapCall}
          >
            Swap
          </button>
        </div>
      </form>
      {swapResult && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Swap Successful!</h3>
          <div className="text-sm text-green-700">
            <p>
              <strong>Transaction Hash:</strong>{' '}
              <span className="relative group">
                {truncateHash(swapResult.transactionHash)}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {swapResult.transactionHash}
                </span>
              </span>
            </p>
            <p><strong>Block Number:</strong> {swapResult.blockNumber}</p>
            <p><strong>Gas Used:</strong> {swapResult.gasUsed.toString()}</p>
            <p><strong>From:</strong> {truncateHash(swapResult.from)}</p>
            <p><strong>To:</strong> {truncateHash(swapResult.to)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Swap;
