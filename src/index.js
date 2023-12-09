import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {Provider} from "react-redux";
import App from "./App";
import {store} from "./data/store";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    //<React.StrictMode>

    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App className="flex flex-col min-h-screen"/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </Provider>

    //</React.StrictMode>
);
