// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/MainLayout";

// Admin Pages
import Dashboard from "./pages/admin/DashboardAdmin";
import Pelanggan from "./pages/admin/Pelanggan";
import Kampanye from "./pages/admin/Kampanye";
import PelaporanAnalisis from "./pages/admin/PelaporanAnalisis";
import ProdukTable from "./pages/admin/ProdukTable";
import ProductPage from "./pages/admin/ProductPage";
import FAQAdmin from "./pages/admin/FAQAdmin";

// Customer Pages
import DashboardCustomer from "./pages/customers/DashboardCustomer";
import KeamananPrivasi from "./pages/customers/KeamananPrivasi";
import FAQCustomer from "./pages/customers/FAQCustomer";

// Auth Page
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Admin Pages */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/kampanye" element={<Kampanye />} />
        <Route path="/laporan" element={<PelaporanAnalisis />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/obat" element={<ProdukTable />} />
        <Route path="/faq-admin" element={<FAQAdmin />} />

        {/* Customer Pages */}
        <Route path="/customer/dashboard" element={<DashboardCustomer />} />
        <Route path="/customer/keamanan" element={<KeamananPrivasi />} />
        <Route path="/customer/faq" element={<FAQCustomer />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
