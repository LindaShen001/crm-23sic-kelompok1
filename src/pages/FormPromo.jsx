// src/pages/FormPromo.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";

export default function FormPromo() {
  const [form, setForm] = useState({
    name: "",
    promo: { tipe: "persen", nilai: 0 },
    startDate: "",
    endDate: "",
    productIds: [],
  });
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const promoId = query.get("id");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("obat").select("id, nama");
      if (error) setError("Gagal memuat produk");
      else setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!promoId) return;
    const fetchPromo = async () => {
      const { data, error } = await supabase.from("promo").select("*").eq("id", promoId).single();
      if (error) setError("Gagal memuat data promo.");
      else setForm(data);
    };
    fetchPromo();
  }, [promoId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipe" || name === "nilai") {
      setForm((prev) => ({ ...prev, promo: { ...prev.promo, [name]: name === "nilai" ? Number(value) : value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (id) => {
    setForm((prev) => {
      const exists = prev.productIds.includes(id);
      return {
        ...prev,
        productIds: exists ? prev.productIds.filter((pid) => pid !== id) : [...prev.productIds, id],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, promo, startDate, endDate, productIds } = form;
    if (!name || !promo.tipe || !promo.nilai || !startDate || !endDate || productIds.length === 0) {
      setError("Mohon lengkapi semua field.");
      return;
    }

    const dataToSend = { name, promo, startDate, endDate, productIds };

    if (promoId) {
      const { error } = await supabase.from("promo").update(dataToSend).eq("id", promoId);
      if (error) setError("Gagal memperbarui promo.");
      else {
        setNotification("Promo berhasil diperbarui.");
        setTimeout(() => navigate("/promo"), 1500);
      }
    } else {
      const { error } = await supabase.from("promo").insert([dataToSend]);
      if (error) setError("Gagal menambahkan promo.");
      else {
        setNotification("Promo berhasil ditambahkan.");
        setTimeout(() => navigate("/promo"), 1500);
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">{promoId ? "Edit Promo" : "Tambah Promo"}</h2>

      {notification && <div className="mb-4 text-green-600 text-sm text-center bg-green-50 py-2 rounded">{notification}</div>}
      {error && <p className="text-red-500 mb-4 text-sm text-center bg-red-50 py-2 rounded">{error}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 bg-white p-4 rounded shadow">
        <label className="text-sm font-medium text-gray-700">Nama Promo</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Contoh: Promo Akhir Tahun"
          className="border px-3 py-2 rounded"
        />

        <label className="text-sm font-medium text-gray-700">Jenis dan Nilai Promo</label>
        <div className="grid grid-cols-2 gap-2">
          <select name="tipe" value={form.promo.tipe} onChange={handleChange} className="border px-3 py-2 rounded">
            <option value="persen">Diskon Persen</option>
            <option value="potongan">Potongan Harga</option>
            <option value="gratis">Beli 1 Gratis 1</option>
          </select>
          <input
            name="nilai"
            value={form.promo.nilai}
            onChange={handleChange}
            type="number"
            placeholder="Nilai Promo"
            className="border px-3 py-2 rounded"
          />
        </div>

        <label className="text-sm font-medium text-gray-700">Periode Promo</label>
        <div className="grid grid-cols-2 gap-2">
          <input name="startDate" value={form.startDate} onChange={handleChange} type="date" className="border px-3 py-2 rounded" />
          <input name="endDate" value={form.endDate} onChange={handleChange} type="date" className="border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">Pilih Produk Terkait:</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded p-2">
            {products.map((product) => (
              <label key={product.id} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.productIds.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
                <span>{product.nama}</span>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {promoId ? "Perbarui Promo" : "Tambah Promo"}
        </button>
      </form>
    </div>
  );
}