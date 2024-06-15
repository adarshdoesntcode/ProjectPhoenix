import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <App />
      <Toaster />
    </div>
  </React.StrictMode>
);
