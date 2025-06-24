import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center relative max-w-md w-full">

        {/* Ikon sukses */}
        <div className="flex justify-center mb-6">
          <AiOutlineCheckCircle className="text-green-500 text-7xl animate-bounce" />
        </div>

        {/* Judul dan pesan */}
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Pesanan Berhasil!</h1>
        <p className="text-gray-600 mb-6">
          Terima kasih, pesanan Anda telah kami terima dan akan segera kami proses.
        </p>

        {/* Tombol kembali */}
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Kembali ke Beranda
        </Link>

        {/* Gambar latar belakang (opsional, bisa diganti dengan image apotek/produk) */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
        </div>
      </div>
    </div>
  );
}
