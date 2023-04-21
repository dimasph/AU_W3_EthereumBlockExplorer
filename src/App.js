import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import { Main } from "./components/Main";
import TransactionDetails from "./components/TransactionDetails";
import BlockInfo from "./components/BlockInfo";

import { alchemy } from "./components/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/block/number/:blockNumber" element={<BlockInfo />} />
        <Route path="/block/hash/:blockHash" element={<BlockInfo />} />
        <Route
          path="/transaction/:transactionHash"
          element={<TransactionDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
