import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import HealthCampaign from "./pages/HealthCampaign";
import KeamananPrivasi from "./pages/KeamananPrivasi";
import PelaporanAnalisis from "./pages/PelaporanAnalisis";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/kampanye" element={<HealthCampaign />} />
             <Route path="/keamanan" element={<KeamananPrivasi />} />
        <Route path="/laporan" element={<PelaporanAnalisis />} />

      </Route>
    </Routes>
  );
}

export default App;
