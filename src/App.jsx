import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Pelanggan from "./pages/Pelanggan";
import HealthCampaign from "./pages/HealthCampaign";
import KeamananPrivasi from "./pages/KeamananPrivasi";
import PelaporanAnalisis from "./pages/PelaporanAnalisis";
import ProdukTable from "./pages/ProdukTable";
import TransaksiTable from "./pages/RiwayatTransaksi";
import PromoList from "./pages/PromoList";
import EditProduk from "./pages/EditProduk";
import EditPromo from "./pages/EditPromo";
import FormPromo from "./pages/FormPromo";
import FormProduk from "./pages/FormProduk";
import KatalogProduk from "./pages/KatalogProduk";
import FormTransaksi from "./pages/FormTransaksi";
import Keranjang from './pages/Keranjang';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import RiwayatTransaksi from './pages/RiwayatTransaksi';
import AlamatPengirimanTable from './pages/AlamatPengirimanTable';

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/kampanye" element={<HealthCampaign />} />
          <Route path="/keamanan" element={<KeamananPrivasi />} />
          <Route path="/laporan" element={<PelaporanAnalisis />} />
          <Route path="/shop" element={<KatalogProduk />} />
          <Route path="/obat" element={<ProdukTable />} />
          <Route path="/riwayat" element={<RiwayatTransaksi />} />
          <Route path="/promo-list" element={<PromoList />} />
          <Route path="/edit-produk/:id" element={<EditProduk />} />
          <Route path="/edit-promo/:id" element={<EditPromo />} />
          <Route path="/form-promo" element={<FormPromo />} />
          <Route path="/form-produk" element={<FormProduk />} />
          <Route path="/form-transaksi" element={<FormTransaksi />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/alamat" element={<AlamatPengirimanTable />} />

        </Route>
      </Routes>
      
      {/* Ini wajib untuk menampilkan toast */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
