import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import HealthCampaign from "./pages/HealthCampaign";
import ProductPage from "./pages/ProductPage";
import ProdukTable from "./pages/ProdukTable";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pelanggan" element={<Pelanggan />} />
        <Route path="/kampanye" element={<HealthCampaign />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route path="/obat" element={<ProdukTable />} />
      </Route>
    </Routes>
  );
}

export default App;
