import { useState, useEffect } from "react";
import { addLiquidity, getTokenBalance } from "../utils/web3/swap";
import SvgIcon from "./SvgIcon";

const Liquidity = () => {
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [balanceA, setBalanceA] = useState('');
  const [balanceB, setBalanceB] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const balA = await getTokenBalance("0xfCaBDeDbaC55da2321bEf9878110f6d74AF8A483");
        const balB = await getTokenBalance("0xe23407C178FeF19839B8ab4b8a8FCf86e106147F");
        setBalanceA(balA);
        setBalanceB(balB);
      } catch (err) {
        console.error("Error fetching balances:", err);
      }
    };

    fetchBalances();
  }, []);

  const handleAddLiquidity = async () => {
    if (!amountA || !amountB) {
      setError('Please enter both token amounts');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await addLiquidity(amountA, amountB);
      setSuccess('Liquidity added successfully!');
      setAmountA('');
      setAmountB('');
    } catch (err) {
      setError('Failed to add liquidity. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-semibold mb-6 flex items-center">
          <SvgIcon icon="swap" className="w-8 h-8 mr-3 text-blue-500" />
          Add Liquidity
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Carbon Credit Token Amount
              <span className="float-right text-gray-500">Balance: {balanceA}</span>
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="0.0"
                value={amountA}
                onChange={(e) => setAmountA(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              wCARBON Amount
              <span className="float-right text-gray-500">Balance: {balanceB}</span>
            </label>
            <div className="relative">
              <input
                type="number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="0.0"
                value={amountB}
                onChange={(e) => setAmountB(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <button
            onClick={handleAddLiquidity}
            disabled={isLoading}
            className="w-full py-3 px-6 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Adding Liquidity...' : 'Add Liquidity'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Liquidity;
