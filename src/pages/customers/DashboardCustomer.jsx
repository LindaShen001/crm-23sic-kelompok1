// src/pages/customers/DashboardCustomer.jsx
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const DashboardCustomer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-6 text-sm font-semibold text-gray-700 relative">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/profile" className="hover:text-blue-600 transition">Profil</Link>
          <Link to="/shop" className="hover:text-blue-600 transition">Produk</Link>
          <Link to="/promo" className="hover:text-blue-600 transition">Promo</Link>
          <Link to="/customer/faq" className="hover:text-blue-600 transition">FAQ</Link>

          {/* Dropdown: Layanan */}
          <div className="relative group">
            <button className="hover:text-blue-600 transition">Layanan</button>
            <div className="absolute hidden group-hover:flex flex-col bg-white shadow-lg mt-2 rounded-md z-10 min-w-[180px]">
              <Link
                to="/layanan/keamanan"
                className="px-4 py-3 text-sm text-gray-700 hover:bg-blue-600 hover:text-white transition duration-200"
              >
                Keamanan & Privasi
              </Link>
            </div>
          </div>

          <Link to="/kontak" className="hover:text-blue-600 transition">Hubungi Kami</Link>

          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/login-customer")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-full text-sm"
            >
              Login Customer
            </button>
            <button
              onClick={() => navigate("/register-customer")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1.5 rounded-full text-sm"
            >
              Daftar
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm"
            >
              Login Admin
            </button>
          </div>

        </nav>
      </header>

      {/* Gambar Hero */}
      <section className="w-full">
        <img
          src="/images/apotek.png"
          alt="Apotek Banner"
          className="w-full h-[400px] object-cover"
        />
      </section>

      {/* Konten di Bawah Gambar */}
      <section className="text-center py-10 px-4 bg-gray-50">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">
          Selamat Datang di Apotek ASEAN
        </h1>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Temukan kebutuhan kesehatan Anda dengan mudah, nyaman, dan terpercaya bersama kami.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-sm shadow-md"
        >
          Belanja Sekarang
        </button>
      </section>
    </div>
  );
};

export default DashboardCustomer;
