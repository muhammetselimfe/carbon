import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

// import { WagmiConfig } from "wagmi";

// import { scrollSepolia } from "viem/chains";

// pages
import Home from "./pages/home.jsx";
import Exchange from "./pages/exchange.jsx";
import Marketplace from "./pages/marketplace.jsx";
import Detail from "./pages/detail.jsx";
import Provider from "./pages/provider.jsx";
import Error from "./pages/error.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

const projectId = "89fcea2ce9cba137d82fda344d68dc84";
const mainnet = {
  chainId: 1,
  name: 'Scroll Sepolia',
  currency: 'SCROLL',
  explorerUrl: 'https://sepolia.scrollscan.dev',
  rpcUrl: 'https://scroll-sepolia-testnet.rpc.thirdweb.com'
}

// 3. Create modal
const metadata = {
  name: "Avatar",
  description: "Carbon Exchange",
  // url: "https://mywebsite.com",
  // icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
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
