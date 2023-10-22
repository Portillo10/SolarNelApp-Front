import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MenuProvider } from "./Contexts/MenuContext";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

navigator.serviceWorker.register("/sw.js").then((reg) => {
  reg.update();
});
