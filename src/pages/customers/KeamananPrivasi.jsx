import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, DatabaseBackup, UserCheck, ServerCog } from "lucide-react";

export default function KeamananPrivasi() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <Link to="/profile" className="hover:text-purple-600 transition">Profil</Link>
          <Link to="/shop" className="hover:text-purple-600 transition">Produk</Link>
          <Link to="/customer/faq" className="hover:text-purple-600 transition">FAQ</Link>

          {/* Dropdown: Layanan */}
          <div className="relative group">
            <button className="text-purple-600 font-bold transition focus:outline-none">Layanan</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link to="/layanan/keamanan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition">Keamanan & Privasi</Link>
              <Link to="/checkvit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition">Cek Kebutuhan Vitamin Anda</Link>
            </div>
          </div>

          <Link to="/kontak" className="hover:text-purple-600 transition">Hubungi Kami</Link>

          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200"
          >
            Login Admin
          </button>
        </nav>
      </header>

      {/* Spacer */}
      <div className="pt-[80px] px-4 flex-grow">
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-green-700 mb-6 border-b pb-2 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7" />
            Keamanan & Privasi Data Pasien
          </h1>

          <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
            {/* Autentikasi */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                Autentikasi & Hak Akses
              </h2>
              <p className="text-gray-700">
                Setiap admin harus login menggunakan akun yang diverifikasi. Akses ke data sensitif dibatasi berdasarkan peran dan otorisasi.
              </p>
            </section>

            {/* Enkripsi */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-600" />
                Enkripsi & Perlindungan Data
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Seluruh data dienkripsi saat disimpan di database.</li>
                <li>Transmisi data menggunakan HTTPS dan protokol aman lainnya.</li>
                <li>Tidak ada pihak ketiga yang bisa mengakses tanpa persetujuan.</li>
              </ul>
            </section>

            {/* Backup */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <DatabaseBackup className="w-5 h-5 text-orange-500" />
                Backup & Audit Keamanan
              </h2>
              <p className="text-gray-700">
                Sistem melakukan backup otomatis setiap hari. Log aktivitas pengguna disimpan untuk audit dan pemantauan.
              </p>
            </section>

            {/* Hak Pasien */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <ServerCog className="w-5 h-5 text-gray-700" />
                Hak Pengelolaan Data oleh Pasien
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Pasien dapat meminta salinan, perubahan, atau penghapusan data mereka.</li>
                <li>Permintaan akan diproses oleh admin dalam waktu 1x24 jam.</li>
              </ul>
            </section>

            <div className="text-sm text-gray-500 border-t pt-4">
              Proses ini mengikuti standar BPMN keamanan data digital untuk sistem informasi apotek.
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8 mt-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Kolom 1 */}
          <div>
            <div className="text-2xl font-bold text-purple-400 mb-4">Apotek ASEAN</div>
            <p className="text-gray-400 text-sm">
              Mengedepankan pelayanan kesehatan terpercaya untuk memenuhi kebutuhan masyarakat.
            </p>
          </div>

          {/* Kolom 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/layanan/konsultasi-online" className="hover:text-white">Konsultasi Online</Link></li>
              <li><Link to="/layanan/kirim-resep" className="hover:text-white">Kirim Resep</Link></li>
              <li><Link to="/layanan/cek-kesehatan" className="hover:text-white">Cek Kesehatan</Link></li>
            </ul>
          </div>

          {/* Kolom 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link to="/karir" className="hover:text-white">Karir</Link></li>
              <li><Link to="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Kolom 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>+6282114452448</li>
              <li>info@apotekasean.com</li>
              <li>Jl. Jend. Ahmad Yani No.123, Pekanbaru, Riau</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2024 Apotek ASEAN. Semua hak dilindungi.
        </div>
      </footer>
    </div>
  );
}
