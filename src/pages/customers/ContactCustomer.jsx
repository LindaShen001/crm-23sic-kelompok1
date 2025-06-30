import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import { supabase } from "../../supabase";

const ContactCustomer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    subjek: '',
    pesan: ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('keluhan')
      .insert([{ ...formData }]);

    if (error) {
      setStatus('Gagal mengirim. Coba lagi.');
      console.error(error);
    } else {
      setStatus('Berhasil dikirim. Terima kasih!');
      setFormData({ nama: '', email: '', telepon: '', subjek: '', pesan: '' });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50"> {/* Fixed header */}
        <div className="text-2xl font-bold text-blue-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center"> {/* Meningkatkan spacing dan center alignment */}
          <Link to="/" className="text-blue-600 font-bold transition">Home</Link> {/* Sesuaikan warna hover ke ungu */}
          <Link to="/profile" className="hover:text-blue-600 transition">Profil</Link>
          <Link to="/shop" className="hover:text-blue-600 transition">Produk</Link>
          <Link to="/customer/faq" className="hover:text-blue-600 transition">FAQ</Link>

          {/* Dropdown: Layanan */}
          <div className="relative group">
            <button className="hover:text-blue-600 transition focus:outline-none">
              Layanan
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link
                to="/layanan/keamanan"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
              >
                Keamanan & Privasi
              </Link>
              <Link
                to="/checkvit"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
              >
                Cek Kebutuhan Vitamin Anda
              </Link>
            </div>
          </div>

          <Link to="/kontak" className="hover:text-blue-600 transition">Hubungi Kami</Link>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200" // Menyesuaikan padding, font, dan shadow
          >
            Login Admin
          </button>
        </nav>
      </header>

      {/* Jarak untuk fixed header */}
      <div className="pt-[72px]"></div> {/* Sesuaikan dengan tinggi header Anda (misal: py-4 = 64px + padding) */}

      {/* Main content */}
      <main className="container mx-auto px-6 py-12 md:py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Hubungi Kami</h1>
        <p className="text-gray-600 mb-10 text-center max-w-xl mx-auto">
          Ada pertanyaan, saran, atau butuh bantuan? Jangan ragu untuk menghubungi kami melalui saluran di bawah ini.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Kolom Kiri - Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="nama" placeholder="Nama" value={formData.nama} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="tel" name="telepon" placeholder="Telepon" value={formData.telepon} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <select
                name="subjek"
                value={formData.subjek}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Pilih Subjek</option>
                <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                <option value="Keluhan Layanan">Keluhan Layanan</option>
                <option value="Permintaan Produk">Permintaan Produk</option>
                <option value="Konsultasi Kesehatan">Konsultasi Kesehatan</option>
                <option value="Lainnya">Lainnya</option>
              </select>

              <textarea name="pesan" rows="4" placeholder="Pesan Anda" value={formData.pesan} onChange={handleChange} required className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"></textarea>
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold">Kirim</button>
              {status && (
                <p className={`text-sm text-center mt-2 ${status.includes('Berhasil') ? 'text-green-600' : 'text-red-600'}`}>
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Kolom Kanan - Info Kontak */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Informasi Kontak Kami</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Telepon</p>
                    <p className="text-gray-800 font-medium">+6282114452448</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <p className="text-gray-800 font-medium">support@apotekasean.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Alamat Kami</p>
                    <p className="text-gray-800 font-medium">
                      Jl. Jend. Ahmad Yani No.123, Kota Baru, Kec. Pekanbaru Kota, Kota Pekanbaru, Riau 28156
                    </p>
                    <a href="https://www.google.com/maps/dir//Jl.+Jend.+Ahmad+Yani+No.123,+Kota+Baru,+Kec.+Pekanbaru+Kota,+Kota+Pekanbaru,+Riau+28156" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                      Lihat di Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bantuan Lain & Jam Operasional */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Bantuan & Jam Operasional</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-800">WhatsApp</p>
                    <p className="text-green-600 text-sm">Chat langsung dengan tim kami</p>
                  </div>
                  <a href="https://wa.me/6282114452448" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm">Chat Via WhatsApp</a>
                </div>
                <div className="text-sm space-y-1 text-gray-700 mt-6">
                  <p><strong>Senin–Sabtu:</strong> 08:00 - 22:00 WIB</p>
                  <p><strong>Minggu:</strong> 12:00 - 17:00 WIB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8 mt-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">Apotek ASEAN</div>
            <p className="text-gray-400 text-sm">Mengedepankan pelayanan kesehatan terpercaya untuk memenuhi kebutuhan masyarakat.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/layanan/konsultasi-online" className="hover:text-white">Konsultasi Online</Link></li>
              <li><Link to="/layanan/kirim-resep" className="hover:text-white">Kirim Resep</Link></li>
              <li><Link to="/layanan/cek-kesehatan" className="hover:text-white">Cek Kesehatan</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link to="/karir" className="hover:text-white">Karir</Link></li>
              <li><Link to="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>+6282114452448</li>
              <li>info@apotekasean.com</li>
              <li>Jl. Jend. Ahmad Yani No.123, Pekanbaru</li>
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
