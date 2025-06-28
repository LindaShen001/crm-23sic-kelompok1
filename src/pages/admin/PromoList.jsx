// src/pages/PromoList.jsx
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function PromoList() {
  const [promos, setPromos] = useState([]);
  const [promoObats, setPromoObats] = useState([]);
  const [obats, setObats] = useState([]);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    discounttype: "persen",
    discountvalue: "",
    startdate: "",
    enddate: "",
    productIds: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promoRes, relasiRes, obatRes] = await Promise.all([
          supabase.from("promo").select("*"),
          supabase.from("promo_obat").select("*"),
          supabase.from("obat").select("id, nama"),
        ]);

        if (promoRes.error || relasiRes.error || obatRes.error) throw new Error("Gagal memuat data promo.");

        setPromos(promoRes.data);
        setPromoObats(relasiRes.data);
        setObats(obatRes.data);
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat memuat data.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckObat = (id) => {
    setForm((prev) => {
      const exists = prev.productIds.includes(id);
      return {
        ...prev,
        productIds: exists
          ? prev.productIds.filter((pid) => pid !== id)
          : [...prev.productIds, id],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nama, discounttype, discountvalue, startdate, enddate, productIds } = form;
    if (!nama || !discountvalue || !startdate || !enddate || productIds.length === 0) {
      setError("Mohon lengkapi semua data.");
      return;
    }

    try {
      let dataInsert;
      if (editingId) {
        const { error: updateError } = await supabase
          .from("promo")
          .update({ nama, discounttype, discountvalue: Number(discountvalue), startdate, enddate })
          .eq("id", editingId);

        if (updateError) throw updateError;

        await supabase.from("promo_obat").delete().eq("promo_id", editingId);
        await supabase.from("promo_obat").insert(productIds.map((pid) => ({ promo_id: editingId, obat_id: pid })));
        setNotification("Promo berhasil diperbarui.");
      } else {
        const { data, error } = await supabase
          .from("promo")
          .insert([{ nama, discounttype, discountvalue: Number(discountvalue), startdate, enddate }])
          .select("id")
          .single();

        if (error) throw error;

        await supabase.from("promo_obat").insert(productIds.map((pid) => ({ promo_id: data.id, obat_id: pid })));
        setNotification("Promo berhasil ditambahkan.");
      }

      setForm({ nama: "", discounttype: "persen", discountvalue: "", startdate: "", enddate: "", productIds: [] });
      setEditingId(null);
      const updatedPromos = await supabase.from("promo").select("*");
      setPromos(updatedPromos.data);
    } catch (err) {
      setError("Gagal menyimpan promo.");
    }
  };

  const handleEdit = async (promo) => {
    const related = promoObats.filter((r) => r.promo_id === promo.id).map((r) => r.obat_id);
    setForm({
      nama: promo.nama,
      discounttype: promo.discounttype,
      discountvalue: promo.discountvalue,
      startdate: promo.startdate,
      enddate: promo.enddate,
      productIds: related,
    });
    setEditingId(promo.id);
  };

  const hapusPromo = async (id) => {
    await supabase.from("promo_obat").delete().eq("promo_id", id);
    await supabase.from("promo").delete().eq("id", id);
    setPromos((prev) => prev.filter((p) => p.id !== id));
    setNotification("Promo berhasil dihapus.");
  };

  const getProdukTerkait = (promoId) => {
    const idProduk = promoObats.filter((r) => r.promo_id === promoId).map((r) => r.obat_id);
    const namaProduk = obats.filter((obat) => idProduk.includes(obat.id)).map((obat) => obat.nama);
    return namaProduk.length > 0 ? namaProduk.join(", ") : "-";
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Daftar Promo</h2>
      {notification && <p className="mb-4 text-green-600 text-sm bg-green-50 py-2 px-4 rounded">{notification}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 bg-white p-4 rounded shadow mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Nama Promo</label>
          <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Promo" className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Jenis Promo</label>
          <select name="discounttype" value={form.discounttype} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="persen">Diskon Persen</option>
            <option value="potongan">Potongan Harga</option>
            <option value="gratis">Beli 1 Gratis 1</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Nilai Promo</label>
          <input name="discountvalue" value={form.discountvalue} onChange={handleChange} placeholder="Contoh: 10 atau 20000" className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tanggal Mulai</label>
          <input name="startdate" type="date" value={form.startdate} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Tanggal Berakhir</label>
          <input name="enddate" type="date" value={form.enddate} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Produk Terkait</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 border p-2 rounded max-h-32 overflow-y-auto">
            {obats.map((obat) => (
              <label key={obat.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.productIds.includes(obat.id)}
                  onChange={() => handleCheckObat(obat.id)}
                />
                {obat.nama}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {editingId ? "Perbarui Promo" : "Simpan Promo"}
        </button>
      </form>


      <table className="table-auto w-full bg-white shadow rounded">
        <thead className="bg-blue-100 text-blue-800">
          <tr>
            <th className="p-2 text-sm text-left">No</th>
            <th className="p-2 text-sm text-left">Nama Promo</th>
            <th className="p-2 text-sm text-left">Jenis</th>
            <th className="p-2 text-sm text-left">Nilai</th>
            <th className="p-2 text-sm text-left">Periode</th>
            <th className="p-2 text-sm text-left">Produk Terkait</th>
            <th className="p-2 text-sm text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {promos.length > 0 ? (
            promos.map((promo, i) => (
              <tr key={promo.id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-sm">{i + 1}</td>
                <td className="p-2 text-sm">{promo.nama}</td>
                <td className="p-2 text-sm capitalize">{promo.discounttype}</td>
                <td className="p-2 text-sm">
                  {promo.discounttype === "persen"
                    ? `${promo.discountvalue}%`
                    : promo.discounttype === "potongan"
                      ? `Rp ${Number(promo.discountvalue).toLocaleString()}`
                      : "Beli 1 Gratis 1"}
                </td>
                <td className="p-2 text-sm">{promo.startdate} - {promo.enddate}</td>
                <td className="p-2 text-sm">{getProdukTerkait(promo.id)}</td>
                <td className="p-2 text-sm space-x-1">
                  <button onClick={() => handleEdit(promo)} className="text-blue-600 hover:underline text-sm">Edit</button>
                  <button onClick={() => hapusPromo(promo.id)} className="text-red-600 hover:underline text-sm">Hapus</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">Tidak ada data promo.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
