import { useNavigate, Link } from "react-router-dom";

const ContactCustomer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen font-sans"> {/* Menggunakan bg-gray-50 untuk latar belakang keseluruhan */}
      {/* Header - Konsisten dengan DashboardCustomer dan ProfileCustomer */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
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

          <Link to="/kontak" className="text-purple-600 font-bold transition">Hubungi Kami</Link> {/* Highlight 'Hubungi Kami' */}

          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200"
          >
            Login Admin
          </button>
        </nav>
      </header>

      {/* Jarak untuk fixed header */}
      <div className="pt-[72px]"></div> {/* Sesuaikan dengan tinggi header Anda */}

      {/* Konten Halaman Hubungi Kami */}
      <main className="container mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Hubungi Kami</h1>
        <p className="text-gray-600 mb-10 text-center max-w-xl mx-auto">
          Ada pertanyaan, saran, atau butuh bantuan? Jangan ragu untuk menghubungi kami melalui saluran di bawah ini.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Kiri */}
          <div className="space-y-8">
            {/* Informasi Kontak Kami */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Informasi Kontak Kami</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Telepon</p>
                    <p className="text-gray-800 font-medium">+6282114452448</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-gray-800 font-medium">support@apotekasean.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Alamat Kami</p>
                    <p className="text-gray-800 font-medium">Jl. Jend. Ahmad Yani No.123, Kota Baru, Kec. Pekanbaru Kota, Kota Pekanbaru, Riau 28156</p>
                    <a href="https://www.google.com/maps/dir//Jl.+Jend.+Ahmad+Yani+No.123,+Kota+Baru,+Kec.+Pekanbaru+Kota,+Kota+Pekanbaru,+Riau+28156/@0.5240175,101.3598982,27867m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x31d5ac0e62176ea3:0x4512d3a85d93be2!2m2!1d101.4423002!2d0.524018?entry=ttu&g_ep=EgoyMDI1MDYxNi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">Lihat di Google Maps</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Jam Operasional Layanan Pelanggan */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Jam Operasional Layanan Pelanggan</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-gray-800">
                  <span>Senin</span>
                  <span className="font-medium">08:00 - 22:00 WIB</span>
                </div>
                <div className="flex justify-between items-center text-gray-800">
                  <span>Selasa</span>
                  <span className="font-medium">08:00 - 22:00 WIB</span>
                </div>
                <div className="flex justify-between items-center text-gray-800">
                  <span>Rabu</span>
                  <span className="font-medium">08:00 - 22:00 WIB</span>
                </div>
                  <div className="flex justify-between items-center text-gray-800">
                  <span>Kamis</span>
                  <span className="font-medium">08:00 - 22:00 WIB</span>
                </div>
                <div className="flex justify-between items-center text-gray-800">
                  <span>Jumat</span>
                  <span className="font-medium">08:00 - 22:00 WIB</span>
                </div>
                <div className="flex justify-between items-center text-gray-800">
                  <span>Sabtu</span>
                  <span className="font-medium">08:00 - 22:00 WIB</span>
                </div>
                <div className="flex justify-between items-center text-gray-800">
                  <span>Minggu</span>
                  <span className="font-medium">12:00 - 17:00 WIB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-8">
            {/* Saluran Bantuan Lainnya */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Saluran Bantuan Lainnya</h2>
              <div className="space-y-4">
                {/* WhatsApp */}
                <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-800">WhatsApp</p>
                    <p className="text-green-600 text-sm">Chat langsung dengan tim kami</p>
                  </div>
                  <a href="https://wa.me/6282114452448" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.244-1.106l-.424.035a2 2 0 01-1.048 2.502L3 21l1.39-4.24a2 2 0 011.048-2.502l.424-.035A8.964 8.964 0 0012 4c4.97 0 9 3.582 9 8z"></path></svg>
                    <span>Chat Via WhatsApp</span>
                  </a>
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-800 mt-6 mb-4">Ikuti Kami di Media Sosial</h3>
              <div className="flex space-x-3">
                {/* Facebook */}
                <a href="#" className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full">
                  <i className="fab fa-facebook-f text-lg"></i> {/* Anda mungkin perlu Font Awesome */}
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.873V14.89H8.05V12.01h2.388V9.61c0-2.365 1.443-3.666 3.566-3.666 1.057 0 1.955.078 2.228.113v2.43h-1.42c-1.173 0-1.4.56-1.4 1.373v1.855h2.891l-.475 2.915h-2.416v7.183C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"></path></svg>
                </a>
                {/* Instagram */}
                <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full">
                  <i className="fab fa-instagram text-lg"></i>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zm3.809 3.809a.75.75 0 011.06 1.06L15.353 12l3.516 3.516a.75.75 0 01-1.06 1.06L14.293 12l-3.516 3.516a.75.75 0 01-1.06-1.06L13.207 12l-3.516-3.516a.75.75 0 011.06-1.06L12 10.793l3.516-3.516z"></path></svg>
                </a>
                {/* Twitter */}
                <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full">
                  <i className="fab fa-twitter text-lg"></i>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zm4.707 7.707a.75.75 0 011.06 1.06L13.414 12l4.353 4.353a.75.75 0 01-1.06 1.06L12 13.414l-4.353 4.353a.75.75 0 01-1.06-1.06L10.586 12l-4.353-4.353a.75.75 0 011.06-1.06L12 10.586l4.353-4.353z"></path></svg>
                </a>
              </div>
            </div>

            {/* Kirim Pesan Kepada Kami */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Kirim Pesan Kepada Kami</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="sr-only">Nama Lengkap</label>
                  <input type="text" id="fullName" placeholder="Masukkan nama lengkap" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Alamat Email</label>
                  <input type="email" id="email" placeholder="contoh@email.com" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="sr-only">Nomor Telepon (Opsional)</label>
                  <input type="tel" id="phoneNumber" placeholder="+62 812-3456-7890" className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label htmlFor="subject" className="sr-only">Subjek</label>
                  <select id="subject" className="w-full px-4 py-3 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white pr-8">
                    <option value="">Pilih subjek</option>
                    <option value="pertanyaan_umum">Pertanyaan Umum</option>
                    <option value="keluhan_produk">Keluhan Produk</option>
                    <option value="saran_masukan">Saran & Masukan</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                  {/* Custom arrow for select */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15 8.293V11a.75.75 0 001.5 0V7.25a.75.75 0 00-.75-.75h-3.75a.75.75 0 000 1.5h2.06L9.293 12.95z"/></svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Pesan Anda</label>
                  <textarea id="message" rows="5" placeholder="Tulis pesan Anda di sini..." className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"></textarea>
                </div>
                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-5 13.5V18.75m-5.833 0H6.25c-1.037 0-1.921-.773-2.03-1.802L2.2 6.75A2.25 2.25 0 014.43 4.5h15.14c1.24 0 2.25 1.01 2.25 2.25v7.5c0 1.24-1.01 2.25-2.25 2.25H12"></path></svg>
                  <span>Kirim Pesan</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

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

export default ContactCustomer;