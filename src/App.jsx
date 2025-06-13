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
      {/* Customer Routes */}
      <Route path="/" element={<DashboardCustomer />} />
      <Route path="/layanan/keamanan" element={<KeamananPrivasi />} />
      <Route path="/faq" element={<FAQCustomer />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="pelanggan" element={<Pelanggan />} />
        <Route path="kampanye" element={<Kampanye />} />
        <Route path="laporan" element={<PelaporanAnalisis />} />
        <Route path="shop" element={<ProductPage />} />
        <Route path="obat" element={<ProdukTable />} />
        <Route path="faq" element={<FAQAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
