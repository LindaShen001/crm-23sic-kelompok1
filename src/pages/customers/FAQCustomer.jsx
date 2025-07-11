// src/pages/customers/FAQCustomer.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

export default function FAQCustomer() {
  const [faqList, setFaqList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFAQ();
  }, []);

  const fetchFAQ = async () => {
    const { data, error } = await supabase.from("faq").select("*").order("created_at", { ascending: false });
    if (!error) setFaqList(data);
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-blue-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/profile" className="hover:text-blue-600 transition">Profil</Link>
          <Link to="/shop" className="hover:text-blue-600 transition">Produk</Link>
          <Link to="/customer/faq" className="text-blue-600 font-bold transition">FAQ</Link>

          <div className="relative group">
            <button className="hover:text-blue-600 transition focus:outline-none">Layanan</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link to="/layanan/keamanan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700">Keamanan & Privasi</Link>
              <Link to="/checkvit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700">Cek Kebutuhan Vitamin Anda</Link>
            </div>
          </div>

          <Link to="/kontak" className="hover:text-blue-600 transition">Hubungi Kami</Link>
          <button onClick={() => navigate("/login")} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200">
            Login Admin
          </button>
        </nav>
      </header>

      <div className="pt-[72px] flex-grow">
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center border-b pb-4">
            Frequently Asked Questions
          </h1>

          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <div key={faq.id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200 transition duration-200 hover:shadow-lg">
                <button className="flex justify-between items-center w-full text-left" onClick={() => toggleFAQ(index)}>
                  <h2 className="text-lg font-semibold text-blue-800">{faq.pertanyaan}</h2>
                  <FiChevronDown className={`h-5 w-5 text-blue-500 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
                </button>
                {openIndex === index && (
                  <p className="text-gray-700 mt-3 leading-relaxed transition-all duration-300">
                    {faq.jawaban}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">Apotek ASEAN</div>
            <p className="text-gray-400 text-sm">
              Mengedepankan pelayanan kesehatan terpercaya untuk memenuhi kebutuhan masyarakat.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
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
              <li>Jl. Jend. Ahmad Yani No.123, Kota Pekanbaru, Riau</li>
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
