import '@tabler/icons-webfont/dist/tabler-icons.min.css';
import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import { WalletContextProvider } from "./providers/WalletContextProvider.tsx";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <WalletContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </WalletContextProvider>
    </React.StrictMode>
);