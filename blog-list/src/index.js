import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MessageContextProvider } from "./contexts/MessageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <MessageContextProvider>
        <App />
    </MessageContextProvider>
);
