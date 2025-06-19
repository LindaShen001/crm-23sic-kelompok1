import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileCustomer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header - Konsisten dengan DashboardCustomer */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <Link to="/profile" className="text-purple-600 font-bold transition">Profil</Link> {/* Highlight 'Profil' */}
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
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200"
          >
            Login Admin
          </button>
        </nav>
      </header>

      {/* Jarak untuk fixed header */}
      <div className="pt-[72px]"></div> {/* Sesuaikan dengan tinggi header Anda */}

      {/* Hero Section - Profil Kami */}
      <section className="container mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Teks Profil */}
          <div className="md:w-1/2 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
              Profil Kami
            </h1>
            <p className="text-gray-700 text-lg mb-4 leading-relaxed">
              Apotek Apotek terpercaya yang telah melayani masyarakat selama bertahun-tahun. Kami berkomitmen untuk memberikan pelayanan kesehatan terbaik, dengan produk berkualitas tinggi dan layanan profesional yang ramah.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Dengan tim apoteker berpengalaman dan fasilitas modern, kami hadir untuk memenuhi kebutuhan kesehatan Anda dan keluarga dengan standar pelayanan internasional.
            </p>
          </div>
          {/* Gambar Profil */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src="https://iik.ac.id/blog/wp-content/uploads/2023/09/photo_2023-09-26_14-43-35.jpg" // Ganti dengan path gambar tim apoteker Anda
              alt="Our Team"
              className="rounded-lg shadow-xl w-full max-w-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section: Visi, Misi, Nilai-Nilai */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Visi */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.24 6 7 8.24 7 11C7 13.38 9.17 16.14 12 19C14.83 16.14 17 13.38 17 11C17 8.24 14.76 6 12 6Z" fill="#8B5CF6"/> {/* Purple-600 */}
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Visi</h3>
            <p className="text-gray-600 text-sm">
              Menjadi apotek terdepan di kawasan ASEAN yang memberikan pelayanan kesehatan inovatif, terjangkau dan terpercaya untuk meningkatkan kualitas hidup masyarakat.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-teal-100 rounded-full p-4 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.24 6 7 8.24 7 11C7 13.38 9.17 16.14 12 19C14.83 16.14 17 13.38 17 11C17 8.24 14.76 6 12 6Z" fill="#2DD4BF"/> {/* Teal-400 */}
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Misi</h3>
            <ul className="text-gray-600 text-sm list-disc list-inside text-left space-y-1">
              <li>Menyediakan obat dan produk kesehatan berkualitas</li>
              <li>Memberikan konsultasi farmasi profesional</li>
              <li>Melayani dengan ramah dan empati</li>
              <li>Mengutamakan kepuasan pelanggan</li>
            </ul>
          </div>

          {/* Nilai-Nilai */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.24 6 7 8.24 7 11C7 13.38 9.17 16.14 12 19C14.83 16.14 17 13.38 17 11C17 8.24 14.76 6 12 6Z" fill="#3B82F6"/> {/* Blue-500 */}
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Nilai-Nilai</h3>
            <ul className="text-gray-600 text-sm list-disc list-inside text-left space-y-1">
              <li>Integritas: Jujur dan terpercaya</li>
              <li>Profesional: Kompeten dan berkualitas</li>
              <li>Empati: Peduli terhadap kesehatan</li>
              <li>Inovasi: Terus berkembang</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section: Tim Kami */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Tim Kami</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Tim profesional kami terdiri dari apoteker berpengalaman dan staff terlatih yang siap melayani kebutuhan kesehatan Anda.
        </p>
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Anggota Tim 1 */}
          <div className="flex flex-col items-center text-center">
            <img src="https://www.shutterstock.com/image-photo/head-shot-portrait-smiling-indian-600nw-2078659537.jpg" alt="Dr. Sarah Wijaya" className="w-32 h-32 rounded-full object-cover mb-4 shadow-md" />
            <h4 className="text-lg font-semibold text-gray-800">Dr. Sarah Wijaya</h4>
            <p className="text-gray-500 text-sm">Apoteker Penanggung Jawab</p>
          </div>
          {/* Anggota Tim 2 */}
          <div className="flex flex-col items-center text-center">
            <img src="https://media.istockphoto.com/id/1311511363/photo/headshot-portrait-of-smiling-male-doctor-with-tablet.jpg?s=612x612&w=0&k=20&c=w5TecWtlA_ZHRpfGh20II-nq5AvnhpFu6BfOfMHuLMA=" alt="Ahmad Rizki" className="w-32 h-32 rounded-full object-cover mb-4 shadow-md" />
            <h4 className="text-lg font-semibold text-gray-800">Ahmad Rizki</h4>
            <p className="text-gray-500 text-sm">Apoteker</p>
          </div>
          {/* Anggota Tim 3 */}
          <div className="flex flex-col items-center text-center">
            <img src="https://media.istockphoto.com/id/1329569957/photo/happy-young-female-doctor-looking-at-camera.jpg?s=612x612&w=0&k=20&c=7Wq_Y2cl0T4op6Wg_3DFc-xtZfCqTTDvfaXkPGyrHDM=" alt="Maya Sari" className="w-32 h-32 rounded-full object-cover mb-4 shadow-md" />
            <h4 className="text-lg font-semibold text-gray-800">Maya Sari</h4>
            <p className="text-gray-500 text-sm">Asisten Apoteker</p>
          </div>
          {/* Anggota Tim 4 */}
          <div className="flex flex-col items-center text-center">
            <img src="https://www.rsintanhusada.com/img/foto%20dokter/Kevin%20Fachri%20Muhammad_web.jpg" alt="Budi Santoso" className="w-32 h-32 rounded-full object-cover mb-4 shadow-md" />
            <h4 className="text-lg font-semibold text-gray-800">Budi Santoso</h4>
            <p className="text-gray-500 text-sm">Customer Service</p>
          </div>
        </div>
      </section>

      {/* Section: Mengapa Memilih Kami? (Mirip dari homepage, bisa diulang) */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Mengapa Memilih Kami?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Keunggulan yang membuat Apotek ASEAN menjadi pilihan terbaik
        </p>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Card 1: Produk Terjamin */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#8BC34A"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Produk Terjamin</h3>
            <p className="text-gray-600">Semua produk kami telah tersertifikasi dan terjamin kualitasnya</p>
          </div>
          {/* Card 2: Pelayanan 24/7 */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 11H11V7H13V11ZM13 15H11V13H13V15Z" fill="#2196F3"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Pelayanan 24/7</h3>
            <p className="text-gray-600">Staf kami siap melayani kebutuhan kesehatan Anda kapan saja</p>
          </div>
          {/* Card 3: Konsultasi Gratis */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z" fill="#9C27B0"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Konsultasi Gratis</h3>
            <p className="text-gray-600">Dapatkan konsultasi gratis dari apoteker kami untuk kebutuhan kesehatan Anda</p>
          </div>
          {/* Card 4: Antar Gratis */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 8H17V5C17 4.45 16.55 4 16 4H8C7.45 4 7 4.45 7 5V8H4C3.45 8 3 8.45 3 9V14C3 14.55 3.45 15 4 15H5V18C5 18.55 5.45 19 6 19H7V20C7 20.55 7.45 21 8 21H16C16.55 21 17 20.55 17 20V19H18C18.55 19 19 18.55 19 18V9C19 8.45 18.55 8 18 8ZM9 6H15V8H9V6ZM15 17H9V15H15V17ZM17 17V15H18V17H17Z" fill="#8BC34A"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Antar Gratis</h3>
            <p className="text-gray-600">Layanan antar obat gratis untuk area tertentu</p>
          </div>
        </div>
      </section>

      {/* Footer - Konsisten dengan DashboardCustomer */}
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

export default ProfileCustomer;