import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'; // <-- Aktifkan kembali baris ini
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
