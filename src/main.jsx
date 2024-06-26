import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.jsx";
import { Helmet } from "react-helmet";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <Helmet>
        <title>Project Phoenix </title>
      </Helmet>
      <App />
      <Toaster />
    </div>
  </React.StrictMode>
);
