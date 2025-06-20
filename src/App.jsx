// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/MainLayout";

// Admin Pages
import Dashboard from "./pages/admin/DashboardAdmin";
import Pelanggan from "./pages/admin/Pelanggan";
import Kampanye from "./pages/admin/Kampanye";
import ProdukTable from "./pages/admin/ProdukTable";
import ProductPage from "./pages/admin/ProductPage";
import FAQAdmin from "./pages/admin/FAQAdmin";
import Restock from "./pages/admin/Restock";
import LaporanAnalisis from "./pages/admin/LaporanAnalisis";


// Customer Pages
import DashboardCustomer from "./pages/customers/DashboardCustomer";
import KeamananPrivasi from "./pages/customers/KeamananPrivasi";
import FAQCustomer from "./pages/customers/FAQCustomer";
import ProfileCustomer from "./pages/customers/ProfileCustomer";
import ContactCustomer from "./pages/customers/ContactCustomer";

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
      <Route path="/profile" element={<ProfileCustomer />} />
      <Route path="/kontak" element={<ContactCustomer />} />


      {/* Protected Admin Routes with Layout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/transaksi" element={<TransaksiTable />} />
        <Route path="//admin/kampanye" element={<Kampanye />} />
        <Route path="/obat" element={<ProdukTable />} />
        <Route path="/admin/FAQAdmin" element={<FAQAdmin />} />
        <Route path="/admin/Restock" element={<Restock />} />
        <Route path="/admin/Laporan" element={<LaporanAnalisis />} />
      </Route>
    </Routes>
  );
}

export default App;
