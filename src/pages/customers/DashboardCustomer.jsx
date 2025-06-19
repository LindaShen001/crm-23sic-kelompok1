// src/pages/customers/DashboardCustomer.jsx
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Import ikon jika diperlukan (contoh: dari react-icons)
// import { FaShieldAlt, FaLightbulb, FaTruck } from 'react-icons/fa'; // Contoh ikon untuk "Mengapa Memilih"
// import { GiMedicines, GiVitamins, GiBabyBottle, GiHerbalLeaf } from 'react-icons/gi'; // Contoh ikon untuk "Kategori"

const DashboardCustomer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans"> {/* Menambahkan font-sans agar lebih konsisten */}
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50"> {/* Fixed header */}
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center"> {/* Meningkatkan spacing dan center alignment */}
          <Link to="/" className="text-purple-600 font-bold transition">Home</Link> {/* Sesuaikan warna hover ke ungu */}
          <Link to="/profile" className="hover:text-purple-600 transition">Profil</Link>
          <Link to="/shop" className="hover:text-purple-600 transition">Produk</Link>
          <Link to="/customer/faq" className="hover:text-purple-600 transition">FAQ</Link>

          {/* Dropdown: Layanan */}
          <div className="relative group">
            <button className="hover:text-purple-600 transition focus:outline-none">
              Layanan
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link
                to="/layanan/keamanan"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition duration-200"
              >
                Keamanan & Privasi
              </Link>
              <Link
                to="/layanan/konsultasi"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition duration-200"
              >
                Cek Kesehatan
              </Link>
            </div>
          </div>

          <Link to="/kontak" className="hover:text-purple-600 transition">Hubungi Kami</Link>

          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200" // Menyesuaikan padding, font, dan shadow
          >
            Login Admin
          </button>
        </nav>
      </header>

      {/* Jarak untuk fixed header */}
      <div className="pt-[72px]"></div> {/* Sesuaikan dengan tinggi header Anda (misal: py-4 = 64px + padding) */}

      {/* Gambar Hero dan Teks Overlay */}
      <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="https://i0.wp.com/blog.apotekdigital.com/wp-content/uploads/2023/02/Untitled-design-6-jpg.webp?fit=1920%2C1080&ssl=1" // Pastikan path ini benar
          alt="Apotek Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent z-10"></div> {/* Efek gradien overlay */}
        <div className="relative z-20 text-left pl-16 pr-8 max-w-2xl"> {/* Sesuaikan posisi teks */}
          <h1 className="text-5xl font-extrabold text-purple-800 mb-4 leading-tight"> {/* Font yang lebih besar dan bold */}
            Selamat Datang di Apotek ASEAN
          </h1>
          <p className="text-gray-700 text-lg mb-8 leading-relaxed"> {/* Font dan spasi yang lebih besar */}
            Temukan kebutuhan kesehatan Anda dengan mudah, nyaman, dan terpercaya bersama kami.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl transition-all duration-300 transform hover:scale-105" // Ukuran tombol lebih besar dan efek hover
          >
            Belanja Sekarang
          </button>
        </div>
      </section>

      {/* Section: Mengapa Memilih Apotek ASEAN? */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Mengapa Memilih Apotek ASEAN?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami berkomitmen memberikan pelayanan kesehatan terbaik dengan produk berkualitas dan layanan profesional
        </p>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Produk Terpercaya */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            {/* <FaShieldAlt className="text-purple-600 text-5xl mb-4" /> */} {/* Placeholder ikon */}
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#8BC34A" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Produk Terpercaya</h3>
            <p className="text-gray-600">Semua produk kami teruji kualitasnya dan dari distributor resmi</p>
          </div>
          {/* Card 2: Konsultasi Ahli */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            {/* <FaLightbulb className="text-purple-600 text-5xl mb-4" /> */} {/* Placeholder ikon */}
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="#9C27B0" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Konsultasi Ahli</h3>
            <p className="text-gray-600">Tim apoteker berpengalaman siap memberikan konsultasi dan saran kesehatan terbaik</p>
          </div>
          {/* Card 3: Pengiriman Cepat */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            {/* <FaTruck className="text-purple-600 text-5xl mb-4" /> */} {/* Placeholder ikon */}
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 8H17V5C17 4.45 16.55 4 16 4H8C7.45 4 7 4.45 7 5V8H4C3.45 8 3 8.45 3 9V14C3 14.55 3.45 15 4 15H5V18C5 18.55 5.45 19 6 19H7V20C7 20.55 7.45 21 8 21H16C16.55 21 17 20.55 17 20V19H18C18.55 19 19 18.55 19 18V9C19 8.45 18.55 8 18 8ZM9 6H15V8H9V6ZM15 17H9V15H15V17ZM17 17V15H18V17H17Z" fill="#2196F3" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pengiriman Cepat</h3>
            <p className="text-gray-600">Layanan pengiriman cepat dan aman dengan pilihan layanan pengiriman dengan packaging khusus</p>
          </div>
        </div>
      </section>

      {/* Section: Kategori Produk Populer */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Kategori Produk Populer</h2>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">
          Temukan berbagai kebutuhan kesehatan Anda
        </p>
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Kategori 1: Obat-obatan */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition">
            <div className="bg-green-50 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 11H16V13H13V16H11V13H8V11H11V8H13V11Z" fill="#4CAF50" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Obat-obatan</h3>
            <p className="text-gray-500 text-sm">Resep dan non-resep</p>
          </div>
          {/* Kategori 2: Vitamin & Suplemen */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition">
            <div className="bg-purple-50 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 17H13V11H11V17ZM11 7H13V9H11V7Z" fill="#9C27B0" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Vitamin & Suplemen</h3>
            <p className="text-gray-500 text-sm">Daya tahan tubuh optimal</p>
          </div>
          {/* Kategori 3: Ibu & Anak */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition">
            <div className="bg-pink-50 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5ZM12 13C13.8 13 17 13.9 17 15V16H7V15C7 13.9 10.2 13 12 13Z" fill="#E91E63" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ibu & Anak</h3>
            <p className="text-gray-500 text-sm">Produk kesehatan keluarga</p>
          </div>
          {/* Kategori 4: Herbal */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition">
            <div className="bg-teal-50 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.24 6 7 8.24 7 11C7 13.38 9.17 16.14 12 19C14.83 16.14 17 13.38 17 11C17 8.24 14.76 6 12 6Z" fill="#009688" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Herbal</h3>
            <p className="text-gray-500 text-sm">Produk alami dan sehat</p>
          </div>
        </div>
      </section>

      {/* Section: Siap Memulai Hidup Sehat Bersama Kami? */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Siap Memulai Hidup Sehat Bersama Kami?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Dapatkan konsultasi gratis dan belanja kebutuhan kesehatan dengan mudah
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-gray-100 transition-colors duration-200">
            Konsultasi Gratis
          </button>
          <button className="border border-white text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-white hover:text-purple-600 transition-colors duration-200">
            Lihat Katalog
          </button>
        </div>
      </section>

      {/* Footer */}
      {/* Footer - Konsisten dengan DashboardCustomer dan ProfileCustomer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom 1: Apotek ASEAN Info */}
          <div>
            <div className="text-2xl font-bold text-purple-400 mb-4">Apotek ASEAN</div>
            <p className="text-gray-400 text-sm">
              Mengedepankan pelayanan kesehatan terpercaya untuk memenuhi kebutuhan masyarakat.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Placeholder untuk ikon media sosial */}
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Kolom 2: Layanan */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/layanan/konsultasi-online" className="hover:text-white">Konsultasi Online</Link></li>
              <li><Link to="/layanan/kirim-resep" className="hover:text-white">Kirim Resep</Link></li>
              <li><Link to="/layanan/cek-kesehatan" className="hover:text-white">Cek Kesehatan</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Informasi */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link to="/karir" className="hover:text-white">Karir</Link></li>
              <li><Link to="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>+6282114452448</li>
              <li>info@apotekasean.com</li>
              <li>Jl. Jend. Ahmad Yani No.123, Kota Baru, Kec. Pekanbaru Kota, Kota Pekanbaru, Riau 28156</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2024 Apotek ASEAN. Semua hak dilindungi.
        </div>
      </footer>
    </div>
  );
};

export default DashboardCustomer;