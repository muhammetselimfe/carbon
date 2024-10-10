import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout";



// pages
import Home from "./pages/home.jsx";
import Exchange from "./pages/exchange.jsx";
import Marketplace from "./pages/marketplace.jsx";
import Detail from "./pages/detail.jsx";
import Provider from "./pages/provider.jsx";
import Error from "./pages/error.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

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
