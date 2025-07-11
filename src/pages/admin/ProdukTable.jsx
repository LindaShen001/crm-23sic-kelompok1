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
      setTimeout(() => setNotification(""), 4000); // Clear notification after 4 seconds
    } catch (err) {
      setError("Gagal menyimpan produk.");
      setTimeout(() => setError(""), 4000); // Clear error after 4 seconds
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
    setError(""); // Clear any previous error
  };

  const hapusProduk = async (id) => {
    try {
      const { error } = await supabase.from("obat").delete().eq("id", id);
      if (error) throw error;
      setProduk((prev) => prev.filter((p) => p.id !== id));
      setNotification("Produk berhasil dihapus.");
    } catch (err) {
      setError("Gagal menghapus produk.");
    } finally {
      setTimeout(() => setNotification(""), 4000);
      setTimeout(() => setError(""), 4000);
    }
  };

  const kategoriUnik = [...new Set(produk.map((p) => p.kategori))];
  const filteredProduk = produk.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase()) &&
    (kategoriFilter ? p.kategori === kategoriFilter : true)
  );
  const expiredProduk = produk.filter((p) => new Date(p.expired) < new Date());

  return (
    // PENTING: SESUAIKAN NILAI `pt-[UKURAN_HEADER_ANDA_DALAM_PX]`
    // DAN `ml-[UKURAN_SIDEBAR_ANDA_DALAM_PX]`
    // Dari gambar sebelumnya, 64px untuk header dan 256px untuk sidebar terlihat cocok.
    // Jika masih tertutup, coba tingkatkan nilai pt-[...] sedikit demi sedikit.
    <div className="relative ml-[256px] pt-[64px] px-4 md:px-8 min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-8">
        <h2 className="text-2xl font-bold text-blue-700">Manajemen Produk</h2>

        {notification && (
          <div className="text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded shadow-sm text-sm">
            {notification}
          </div>
        )}
        {error && (
          <div className="text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded shadow-sm text-sm">
            {error}
          </div>
        )}

        {/* Form Produk */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputField label="Nama Produk" name="nama" value={form.nama} onChange={handleChange} />
          <InputField label="Harga" name="harga" type="number" value={form.harga} onChange={handleChange} />
          <InputField label="Stok" name="stock" type="number" value={form.stock} onChange={handleChange} />
          <InputField label="Tanggal Expired" name="expired" type="date" value={form.expired} onChange={handleChange} />
          <InputField label="Supplier" name="supplier" value={form.supplier} onChange={handleChange} />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select
              name="kategori"
              value={form.kategori}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="obat">Obat-obatan</option>
              <option value="vitamin">Vitamin & Suplemen</option>
              <option value="ibu-anak">Ibu & Anak</option>
              <option value="herbal">Herbal</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar</label>
            <input
              name="gambar"
              value={form.gambar}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Contoh: https://..."
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded w-full"
            >
              {editingId ? "🔄 Perbarui Produk" : "➕ Tambah Produk"}
            </button>
          </div>
        </form>

        {/* Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Cari nama produk..."
            className="flex-1 border px-4 py-2 rounded shadow-sm"
          />
          <select
            value={kategoriFilter}
            onChange={(e) => setKategoriFilter(e.target.value)}
            className="flex-1 border px-4 py-2 rounded shadow-sm"
          >
            <option value="">📂 Semua Kategori</option>
            {kategoriUnik.map((kategori, i) => (
              <option key={i} value={kategori}>{kategori}</option>
            ))}
          </select>
        </div>

        {/* Produk Expired */}
        {expiredProduk.length > 0 && (
          <div className="bg-red-50 border border-red-200 p-4 rounded shadow-sm">
            <h3 className="text-red-700 font-semibold mb-3">📛 Produk Expired</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {expiredProduk.map((item) => (
                <div key={item.id} className="bg-white p-2 rounded shadow text-center">
                  <img src={item.gambar} alt={item.nama} className="h-16 w-16 object-contain mx-auto mb-1" />
                  <p className="text-sm font-semibold text-red-700 truncate">{item.nama}</p>
                  <p className="text-xs text-gray-600">Expired: {item.expired}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabel Produk */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md overflow-hidden">
            <thead className="bg-blue-100 text-blue-800 text-sm font-semibold">
              <tr>
                {["No", "Nama", "Gambar", "Harga", "Expired", "Stok", "Supplier", "Kategori", "Aksi"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {filteredProduk.map((p, i) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{p.nama}</td>
                  <td className="px-4 py-2">
                    <img src={p.gambar} alt={p.nama} className="h-10 w-10 object-contain rounded" />
                  </td>
                  <td className="px-4 py-2">Rp {Number(p.harga).toLocaleString()}</td>
                  <td className="px-4 py-2">{p.expired}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2">{p.supplier}</td>
                  <td className="px-4 py-2">{p.kategori}</td>
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
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className="w-full border px-3 py-2 rounded"
    />
  </div>
);