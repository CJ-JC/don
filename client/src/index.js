import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import auth from "./reducer/auth";

const store = configureStore({
    reducer: {
        auth,
    },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter basename="/">
        <ThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </BrowserRouter>
);

reportWebVitals();
