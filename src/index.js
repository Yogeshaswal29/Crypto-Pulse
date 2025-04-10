import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import CryptoContextProvider from "./context/CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HashRouter>
    <CryptoContextProvider>
      <App />
    </CryptoContextProvider>
  </HashRouter>
);
