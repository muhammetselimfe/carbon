import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

// import { WagmiConfig } from "wagmi";

import { scrollSepolia } from "viem/chains";

// pages
import Home from "./pages/home.js";
import Exchange from "./pages/exchange.js";
import Marketplace from "./pages/marketplace.js";
import Detail from "./pages/detail.js";
import Provider from "./pages/provider.js";
import Error from "./pages/error.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const projectId = "89fcea2ce9cba137d82fda344d68dc84";
// const mainnet = {
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com'
// }

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [scrollSepolia],
  projectId,
});

root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/exchange" element={<Exchange />}></Route>
          <Route path="/marketplace" element={<Marketplace />}></Route>
          <Route path="/provider" element={<Provider />}></Route>
          <Route path="/detail/:id" element={<Detail />}></Route>
          <Route path="*" element={<Error code="404" />}></Route>
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
