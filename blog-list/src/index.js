import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MessageContextProvider } from "./contexts/MessageContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <MessageContextProvider>
            <App />
        </MessageContextProvider>
    </QueryClientProvider>
);
