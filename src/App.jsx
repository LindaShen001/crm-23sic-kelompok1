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
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import HealthCampaign from "./pages/HealthCampaign";
import KeamananPrivasi from "./pages/KeamananPrivasi";
import PelaporanAnalisis from "./pages/PelaporanAnalisis";
import ProductPage from "./pages/ProductPage";
import ProdukTable from "./pages/ProdukTable";
import TransaksiTable from "./pages/TranksaksiTable";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/kampanye" element={<HealthCampaign />} />
             <Route path="/keamanan" element={<KeamananPrivasi />} />
        <Route path="/laporan" element={<PelaporanAnalisis />} />

        <Route path="/shop" element={<ProductPage />} />
        <Route path="/obat" element={<ProdukTable />} />
      </Route>
    </Routes>
  );
}

export default App;
