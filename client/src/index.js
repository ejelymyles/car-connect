import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
// import { Router } from "react-router-dom/cjs/react-router-dom.min";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);
