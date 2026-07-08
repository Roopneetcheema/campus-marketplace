import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>
      <App />

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,

          style: {
            background: "#111827",
            color: "#ffffff",
            borderRadius: "12px",
            padding: "12px 16px",
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);