import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { MessageContextProvider } from "./contexts/MessageContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./contexts/UserContext";
import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <MessageContextProvider>
                    <App />
                </MessageContextProvider>
            </UserContextProvider>
        </QueryClientProvider>
    </Router>
);
