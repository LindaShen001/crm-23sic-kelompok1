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


import KeluhanDashboard from "./pages/admin/KeluhanDashboard";
import PromoList from "./pages/admin/PromoList";
import AlamatPengirimanTable from "./pages/admin/AlamatPengirimanTable";
import RiwayatTransaksi from "./pages/admin/RiwayatTransaksi";


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
import KatalogProduk from "./pages/customers/KatalogProduk";


// Auth
import Login from "./pages/Login";
import RegisterCustomer from "./pages/RegisterCustomer";





function App() {
  return (
    <>
      <Routes>
        {/* Public & Customer Routes */}
        <Route path="/" element={<DashboardCustomer />} />
        <Route path="/layanan/keamanan" element={<KeamananPrivasi />} />
        <Route path="/customer/faq" element={<FAQCustomer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterCustomer />} />
        <Route path="/shop" element={<KatalogProduk />} />
        <Route path="/profile" element={<ProfileCustomer />} />
        <Route path="/kontak" element={<ContactCustomer />} />
        <Route path="/checkvit" element={<VitaminForm />} />
        <Route path="/keranjang" element={<Keranjang />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />
        
        

        {/* Protected Admin Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pelanggan" element={<Pelanggan />} />
          <Route path="/admin/kampanye" element={<Kampanye />} />
          <Route path="/obat" element={<ProdukTable />} />
          <Route path="/admin/FAQAdmin" element={<FAQAdmin />} />
          <Route path="/admin/Restock" element={<Restock />} />
          <Route path="/admin/keluhan" element={<KeluhanDashboard />} />
          <Route path="/admin/Laporan" element={<LaporanAnalisis />} />
          <Route path="/promo-list" element={<PromoList />} />
          <Route path="/riwayat" element={<RiwayatTransaksi />} />
          <Route path="/alamat" element={<AlamatPengirimanTable />} />
        </Route>
      </Routes>




      {/* Notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>

  );
}

export default App;
