import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/tech-ride-eCommerce-site">
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>
);
