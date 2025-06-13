import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
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
        <Route path="/riwayat" element={<TransaksiTable />} />
      </Route>
    </Routes>
  );
}

export default App;
