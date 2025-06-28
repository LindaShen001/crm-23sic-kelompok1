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
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center">
          <Link to="/" className="hover:text-purple-600 transition">Home</Link>
          <Link to="/profile" className="hover:text-purple-600 transition">Profil</Link>
          <Link to="/shop" className="hover:text-purple-600 transition">Produk</Link>
          <Link to="/customer/faq" className="text-purple-600 font-bold transition">FAQ</Link>

          <div className="relative group">
            <button className="hover:text-purple-600 transition focus:outline-none">Layanan</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link to="/layanan/keamanan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700">Keamanan & Privasi</Link>
              <Link to="/checkvit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700">Cek Kebutuhan Vitamin Anda</Link>
            </div>
          </div>

          <Link to="/kontak" className="hover:text-purple-600 transition">Hubungi Kami</Link>
          <button onClick={() => navigate("/login")} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200">
            Login Admin
          </button>
        </nav>
      </header>

      <div className="pt-[72px]"></div>

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center border-b pb-4">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <div key={faq.id} className="bg-white p-5 rounded-xl shadow-md border border-gray-200 transition duration-200 hover:shadow-lg">
              <button className="flex justify-between items-center w-full text-left" onClick={() => toggleFAQ(index)}>
                <h2 className="text-lg font-semibold text-purple-800">{faq.pertanyaan}</h2>
                <FiChevronDown className={`h-5 w-5 text-purple-500 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
              </button>
              {openIndex === index && <p className="text-gray-700 mt-3 leading-relaxed transition-all duration-300">{faq.jawaban}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
