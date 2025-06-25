import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/MainLayout";

// Admin Pages
import Dashboard from "./pages/admin/DashboardAdmin";
import Pelanggan from "./pages/admin/Pelanggan";
import Kampanye from "./pages/admin/Kampanye";
import ProdukTable from "./pages/admin/ProdukTable";
import FAQAdmin from "./pages/admin/FAQAdmin";
import Restock from "./pages/admin/Restock";
import LaporanAnalisis from "./pages/admin/LaporanAnalisis";
import TransaksiTable from "./pages/admin/TranksaksiTable";
import KeluhanDashboard from "./pages/admin/KeluhanDashboard";
import EditProduk from "./pages/admin/EditProduk";
import EditPromo from "./pages/admin/EditPromo";
import FormPromo from "./pages/admin/FormPromo";
import FormProduk from "./pages/admin/FormProduk";
import FormTransaksi from "./pages/admin/FormTransaksi";
import PromoList from "./pages/admin/PromoList";

// Customer Pages
import DashboardCustomer from "./pages/customers/DashboardCustomer";
import KeamananPrivasi from "./pages/customers/KeamananPrivasi";
import FAQCustomer from "./pages/customers/FAQCustomer";
import ProfileCustomer from "./pages/customers/ProfileCustomer";
import ContactCustomer from "./pages/customers/ContactCustomer";
import VitaminForm from "./pages/customers/VitaminForm";
import Keranjang from "./pages/customers/Keranjang";
import Checkout from "./pages/customers/Checkout";
import OrderSuccess from "./pages/customers/OrderSuccess";
import AlamatPengirimanTable from "./pages/customers/AlamatPengirimanTable";
import KatalogProduk from "./pages/customers/KatalogProduk";
import RiwayatTransaksi from "./pages/customers/RiwayatTransaksi";

// Auth
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        {/* Public & Customer Routes */}
        <Route path="/" element={<DashboardCustomer />} />
        <Route path="/layanan/keamanan" element={<KeamananPrivasi />} />
        <Route path="/customer/faq" element={<FAQCustomer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<KatalogProduk />} />
        <Route path="/profile" element={<ProfileCustomer />} />
        <Route path="/kontak" element={<ContactCustomer />} />
        <Route path="/checkvit" element={<VitaminForm />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/alamat" element={<AlamatPengirimanTable />} />
        <Route path="/riwayat" element={<RiwayatTransaksi />} />

        {/* Protected Admin Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/transaksi" element={<TransaksiTable />} />
          <Route path="/admin/kampanye" element={<Kampanye />} />
          <Route path="/obat" element={<ProdukTable />} />
          <Route path="/admin/FAQAdmin" element={<FAQAdmin />} />
          <Route path="/admin/Restock" element={<Restock />} />
          <Route path="/admin/keluhan" element={<KeluhanDashboard />} />
          <Route path="/admin/Laporan" element={<LaporanAnalisis />} />
          <Route path="/promo-list" element={<PromoList />} />
          <Route path="/edit-produk/:id" element={<EditProduk />} />
          <Route path="/edit-promo/:id" element={<EditPromo />} />
          <Route path="/form-promo" element={<FormPromo />} />
          <Route path="/form-produk" element={<FormProduk />} />
          <Route path="/form-transaksi" element={<FormTransaksi />} />
        </Route>
      </Routes>

      {/* Notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
