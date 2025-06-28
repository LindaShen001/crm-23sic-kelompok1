// File: src/pages/ProdukTable.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ProdukTable() {
  const [produk, setProduk] = useState([]);
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    expired: "",
    stock: "",
    supplier: "",
    kategori: "obat",
    gambar: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("");

  useEffect(() => {
    fetchProduk();
  }, []);

  const fetchProduk = async () => {
    const { data, error } = await supabase.from("obat").select("*");
    if (error) {
      setError("Gagal memuat data produk.");
    } else {
      setProduk(data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, harga, expired, stock, supplier, kategori, gambar } = form;

    if (!nama || !harga || !expired || !stock || !supplier || !kategori || !gambar) {
      setError("Mohon isi semua field.");
      return;
    }

    try {
      const newProduct = {
        nama,
        harga: Number(harga),
        expired,
        stock: Number(stock),
        supplier,
        kategori,
        gambar,
      };

      let response;
      if (editingId) {
        response = await supabase.from("obat").update(newProduct).eq("id", editingId).select();
        if (response.error) throw response.error;
        setProduk((prev) => prev.map((p) => (p.id === editingId ? { ...response.data[0] } : p)));
        setNotification("Produk berhasil diperbarui.");
      } else {
        response = await supabase.from("obat").insert([newProduct]).select();
        if (response.error) throw response.error;
        setProduk((prev) => [...prev, ...response.data]);
        setNotification("Produk berhasil ditambahkan.");
      }

      setForm({
        nama: "",
        harga: "",
        expired: "",
        stock: "",
        supplier: "",
        kategori: "obat",
        gambar: "",
      });
      setEditingId(null);
      setError("");
    } catch (err) {
      setError("Gagal menyimpan produk.");
    }
  };

  const handleEdit = (produk) => {
    setForm({
      nama: produk.nama || "",
      harga: produk.harga || "",
      expired: produk.expired || "",
      stock: produk.stock || "",
      supplier: produk.supplier || "",
      kategori: produk.kategori || "obat",
      gambar: produk.gambar || "",
    });
    setEditingId(produk.id);
  };

  const hapusProduk = async (id) => {
    await supabase.from("obat").delete().eq("id", id);
    setProduk((prev) => prev.filter((p) => p.id !== id));
    setNotification("Produk berhasil dihapus.");
    setTimeout(() => setNotification(""), 4000);
  };

  const kategoriUnik = [...new Set(produk.map((p) => p.kategori))];
  const filteredProduk = produk.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()) &&
    (kategoriFilter ? p.kategori === kategoriFilter : true)
  );
  const expiredProduk = produk.filter((p) => new Date(p.expired) < new Date());

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Daftar Produk</h2>

      {notification && (
        <div className="mb-4 text-green-600 text-sm text-center bg-green-50 py-2 rounded">
          {notification}
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white p-4 rounded shadow">
        {/* ...semua input sama seperti sebelumnya... */}
        <div>
          <label className="text-sm font-medium text-gray-700">Nama Produk</label>
          <input name="nama" value={form.nama} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Harga</label>
          <input name="harga" value={form.harga} onChange={handleChange} type="number" className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Stok</label>
          <input name="stock" value={form.stock} onChange={handleChange} type="number" className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Tanggal Expired</label>
          <input name="expired" value={form.expired} onChange={handleChange} type="date" className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Supplier</label>
          <input name="supplier" value={form.supplier} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Kategori</label>
          <select name="kategori" value={form.kategori} onChange={handleChange} className="border px-3 py-2 rounded w-full">
            <option value="obat">Obat-obatan</option>
            <option value="vitamin">Vitamin & Suplemen</option>
            <option value="ibu-anak">Ibu & Anak</option>
            <option value="herbal">Herbal</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Path Gambar</label>
          <input name="gambar" value={form.gambar} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2">
          {editingId ? "Perbarui Produk" : "Tambah Produk"}
        </button>
      </form>

      {/* 🔻 FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari produk berdasarkan nama..."
          className="border px-4 py-2 rounded w-full"
        />
        <select
          value={kategoriFilter}
          onChange={(e) => setKategoriFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        >
          <option value="">Semua Kategori</option>
          {kategoriUnik.map((kategori, i) => (
            <option key={i} value={kategori}>{kategori}</option>
          ))}
        </select>
      </div>

      {expiredProduk.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded p-4">
          <h3 className="text-red-700 font-semibold mb-3">📛 Produk Expired</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {expiredProduk.map((item) => (
              <div key={item.id} className="bg-white border border-red-300 rounded p-2 flex flex-col items-center text-center shadow-sm">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="h-16 w-16 object-contain mb-1"
                />
                <p className="text-xs font-semibold text-red-700 truncate w-full">{item.nama}</p>
                <p className="text-[11px] text-gray-600">Expired: {item.expired}</p>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* TABEL */}
      <table className="w-full table-auto bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-blue-100">
          <tr>
            {"No, Nama, Gambar, Harga, Expired, Stok, Supplier, Kategori, Aksi".split(", ").map((h) => (
              <th key={h} className="px-4 py-2 text-left text-sm font-medium text-blue-800">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredProduk.map((p, i) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm text-gray-600">{i + 1}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.nama}</td>
              <td className="px-4 py-2">
                <img src={p.gambar} alt={p.nama} width="60" className="rounded" />
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">Rp {Number(p.harga).toLocaleString()}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.expired}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.stock}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.supplier}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{p.kategori}</td>
              <td className="px-4 py-2 flex gap-2">
                <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800">
                  <FiEdit />
                </button>
                <button onClick={() => hapusProduk(p.id)} className="text-red-600 hover:text-red-800">
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
