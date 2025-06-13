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
import LaporanAnalisis from "./pages/admin/LaporanAnalisis";
import ManajemenRestock from "./pages/admin/ManjemenRestock";

// Customer Pages
import DashboardCustomer from "./pages/customers/DashboardCustomer";
import KeamananPrivasi from "./pages/customers/KeamananPrivasi";
import FAQCustomer from "./pages/customers/FAQCustomer";

// Auth Page





function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/kampanye" element={<HealthCampaign />} />
             <Route path="/keamanan" element={<KeamananPrivasi />} />
        <Route path="/laporan" element={<LaporanAnalisis />} />
        <Route path="/restock" element={<ManajemenRestock />} />


        <Route path="/shop" element={<ProductPage />} />
        <Route path="/obat" element={<ProdukTable />} />
      </Route>
    </Routes>
  );
}

export default App;
