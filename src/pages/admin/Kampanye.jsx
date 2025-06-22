import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

const Kampanye = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({
    id: null,
    judul: "",
    konten: "",
    status: "aktif",
    tanggal: "",
  });

  // Ambil data dari Supabase
  const fetchCampaigns = async () => {
    const { data, error } = await supabase.from("kampanye").select("*").order("tanggal", { ascending: false });
    if (!error) setCampaigns(data);
    else console.error("Gagal fetch:", error.message);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi
    if (!form.judul || !form.konten || !form.status || !form.tanggal) {
      alert("Semua field harus diisi!");
      return;
    }

    const formattedDate = new Date(form.tanggal).toISOString();

    if (form.id) {
      // UPDATE
      const { error } = await supabase
        .from("kampanye")
        .update({
          judul: form.judul,
          konten: form.konten,
          status: form.status,
          tanggal: formattedDate,
        })
        .eq("id", form.id);

      if (error) {
        console.error("Gagal update:", error.message);
      } else {
        fetchCampaigns();
        resetForm();
      }
    } else {
      // INSERT
      const { error } = await supabase.from("kampanye").insert([
        {
          judul: form.judul,
          konten: form.konten,
          status: form.status,
          tanggal: formattedDate,
        },
      ]);

      if (error) {
        console.error("Gagal tambah:", error.message);
      } else {
        fetchCampaigns();
        resetForm();
      }
    }
  };

  const handleEdit = (kampanye) => {
    setForm({
      id: kampanye.id,
      judul: kampanye.judul,
      konten: kampanye.konten,
      status: kampanye.status,
      tanggal: kampanye.tanggal?.slice(0, 16), // untuk input datetime-local
    });
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("kampanye").delete().eq("id", id);
    if (!error) fetchCampaigns();
    else console.error("Gagal hapus:", error.message);
  };

  const resetForm = () => {
    setForm({
      id: null,
      judul: "",
      konten: "",
      status: "aktif",
      tanggal: "",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manajemen Edukasi & Promosi Kesehatan</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="judul"
          placeholder="Judul Kampanye"
          value={form.judul}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="konten"
          placeholder="Konten Kampanye"
          value={form.konten}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
        <input
          type="datetime-local"
          name="tanggal"
          value={form.tanggal}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {form.id ? "Update Kampanye" : "Tambah Kampanye"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <h3 className="text-xl font-semibold mb-2">Daftar Kampanye</h3>
      {campaigns.length === 0 ? (
        <p>Belum ada kampanye.</p>
      ) : (
        <ul className="space-y-2">
          {campaigns.map((c) => (
            <li key={c.id} className="border p-4 rounded flex justify-between items-start">
              <div>
                <p className="font-bold text-purple-700">{c.judul}</p>
                <p>{c.konten}</p>
                <p className="text-sm text-gray-600">Kirim pada: {new Date(c.tanggal).toLocaleString()}</p>
                <p className={`text-sm ${c.status === "aktif" ? "text-green-500" : "text-red-500"}`}>
                  Status: {c.status}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Kampanye;
