// src/pages/FormProduk.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productService";

export default function FormProduk() {
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    expired: "",
    stok: "",
    supplier: "",
    kategori: "obat",
    gambar: "",
  });

  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, harga, expired, stok, supplier, kategori, gambar } = form;

    if (!nama || !harga || !expired || !stok || !supplier || !kategori || !gambar) {
      setError("Mohon isi semua field.");
      return;
    }

    try {
      await createProduct({ ...form, harga: Number(harga), stok: Number(stok) });
      setNotification("Produk berhasil ditambahkan.");
      setTimeout(() => navigate("/obat"), 1500);
    } catch (err) {
      setError("Gagal menambahkan produk.");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Tambah Produk Baru</h2>

      {notification && (
        <div className="mb-4 text-green-600 text-sm text-center bg-green-50 py-2 rounded">
          {notification}
        </div>
      )}
      {error && (
        <p className="text-red-500 mb-4 text-sm text-center bg-red-50 py-2 rounded">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
          <input
            name="harga"
            type="number"
            value={form.harga}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Stok</label>
          <input
            name="stok"
            type="number"
            value={form.stok}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal Expired</label>
          <input
            type="date"
            name="expired"
            value={form.expired}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Kategori</label>
          <select
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="obat">Obat</option>
            <option value="alat">Alat Kesehatan</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Nama Supplier</label>
          <input
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Gambar (path lokal)</label>
          <input
            name="gambar"
            value={form.gambar}
            onChange={handleChange}
            placeholder="Contoh: images/obattablet.png"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div className="md:col-span-2 flex justify-end space-x-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            Simpan Produk
          </button>
          <button
            type="button"
            onClick={() => navigate("/obat")}
            className="bg-gray-300 text-gray-800 px-5 py-2 rounded shadow hover:bg-gray-400 transition"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
