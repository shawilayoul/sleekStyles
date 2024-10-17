import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ProductContextProvider from "./context/ProductContext.jsx";
ProductContextProvider;
ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductContextProvider>
    <App />
  </ProductContextProvider>
);
