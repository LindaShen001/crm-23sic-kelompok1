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
import TransaksiTable from "./pages/admin/TranksaksiTable";

function App() {
  return (
    <Routes>
      {/* Public & Customer Routes */}
      <Route path="/" element={<DashboardCustomer />} />
      <Route path="/layanan/keamanan" element={<KeamananPrivasi />} />
      <Route path="/customer/faq" element={<FAQCustomer />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={<ProductPage />} />


      {/* Protected Admin Routes with Layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/transaksi" element={<TransaksiTable />} />
        <Route path="//admin/kampanye" element={<Kampanye />} />
        <Route path="/laporan" element={<PelaporanAnalisis />} />
        <Route path="/obat" element={<ProdukTable />} />
        <Route path="/admin/FAQAdmin" element={<FAQAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
