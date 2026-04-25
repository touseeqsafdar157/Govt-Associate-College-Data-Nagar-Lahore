
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);


//  import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./app/App";
// import { HelmetProvider } from "react-helmet-async";

// const root = document.getElementById("root");

// if (!root) throw new Error("Root not found");

// ReactDOM.createRoot(root).render(
//   <React.StrictMode>
//     <HelmetProvider>
//       <App />
//     </HelmetProvider>
//   </React.StrictMode>
// );