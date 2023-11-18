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
const testnet = {
  chainId: 534351,
  name: 'Scroll Sepolia',
  currency: 'ETH',
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
  chains: [testnet],
  projectId,
  // chainImages:{
  //   534351: "https://mirror-media.imgix.net/publication-images/LQWiwwMGKVXxM_8aQao2S.png"
  // },
  tokens: {
    534351: {
      address: "0xbCb425998f87AE6836Da6Ed38fcD06b66889B702",
      // image: 'token_image_url' //optional
    },
  }
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
