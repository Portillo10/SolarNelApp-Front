import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

navigator.serviceWorker.register("/sw.js").then((reg) => {
  // sometime later…
  reg.update();
});
