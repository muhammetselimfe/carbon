import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SvgIcon from "../components/SvgIcon";
import { retireNft } from "../utils/web3/carbonMarket";

export const getMintById = async (id) => {
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

  const url = "https://api.studio.thegraph.com/query/57070/avatar/v3/";
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
  const [data, setData] = useState({
    id: 1,
    cert_id: 12345,
    provider: "BikeRental",
    price: 1234,
  });

  useEffect(() => {
    async function fetchData() {
      const result = await getMintById(id);
      if (result && result.data && result.data.mint) {
        // Assuming the API returns data in the format { data: { mint: { ... } } }
        const mintData = result.data.mint;
        setData({
          id: mintData.id,
          cert_id: mintData.cerfId,
          provider: mintData.owner, // or any other field you'd like to display
          price: mintData.carbon, // or any other field representing the price
        });
      }
    }

    fetchData();
  }, [id]); // Effect runs on component mount and whenever 'id' changes

  async function retireCall() {
    console.log("retirecall called");
    let nftid = data.cert_id; // Use the fetched NFT id
    await retireNft(nftid);
  }

  return (
    <section className="w-full pt-24 md:pt-0 md:h-screen relative flex flex-row justify-center items-center">
      <div className="block  md:flex container w-fullitems-center justify-between">
        <div className="w-full md:w-5/12 overflow-hidden shadow-2xl border-2 border-gray-100 rounded-xl">
          <img
            src="https://picsum.photos/500/500"
            alt={data.cert_id}
            className="w-full h-auto mx-auto"
          />
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full max-w-lg shadow-2xl border-2 border-gray-100 rounded-lg">
            <div className="border-b w-full">
              <h1 className="text-xl font-bold text-center p-5">
                Certificate #{data.cert_id}
              </h1>
            </div>
            <div className="p-5 border-b border-gray-300">
              <ul className="p-5">
                <li className="flex justify-between py-3 mb-3 border-b border-gray-300">
                  <span className="font-bold">Certificate ID:</span>{" "}
                  <span>{data.cert_id}</span>
                </li>
                <li className="flex justify-between py-3 mb-3 border-b border-gray-300">
                  <span className="font-bold">Provider:</span>{" "}
                  <span>{data.provider}</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center mb-5">
              <button
                onClick={retireCall}
                className="flex items-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg align-center mt-5"
              >
                <span className="mr-5 font-semibold">Retire</span>
                <span className="bg-white flex items-center rounded-lg px-2 py-1">
                  {<SvgIcon icon="CARBON" className="w-8 h-8" />}
                  <span className="ml-2 text-black font-semibold">
                    {data.price}
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
