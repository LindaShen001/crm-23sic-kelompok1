import React, { useState, useEffect } from "react";

const HealthCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", sendAt: "" });

  // Simulasi auto-send campaign
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16);
      campaigns.forEach((campaign) => {
        if (!campaign.sent && campaign.sendAt === now) {
          alert(`Mengirim: ${campaign.title}`);
          campaign.sent = true;
        }
      });
      setCampaigns([...campaigns]);
    }, 60000); // cek tiap menit

    return () => clearInterval(interval);
  }, [campaigns]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCampaign = {
      ...form,
      id: Date.now(),
      sent: false,
    };
    setCampaigns([...campaigns, newCampaign]);
    setForm({ title: "", content: "", sendAt: "" });
  };

  const handleDelete = (id) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manajemen Edukasi & Promosi Kesehatan</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          name="title"
          placeholder="Judul Kampanye"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          placeholder="Konten Kampanye"
          value={form.content}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          name="sendAt"
          value={form.sendAt}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Tambah Kampanye
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Daftar Kampanye</h3>
      {campaigns.length === 0 ? (
        <p>Belum ada kampanye.</p>
      ) : (
        <ul className="space-y-2">
          {campaigns.map((c) => (
            <li key={c.id} className="border p-4 rounded flex justify-between items-start">
              <div>
                <p className="font-bold">{c.title}</p>
                <p>{c.content}</p>
                <p className="text-sm text-gray-600">Kirim pada: {c.sendAt.replace("T", " ")}</p>
                <p className={`text-sm ${c.sent ? "text-green-500" : "text-yellow-500"}`}>
                  Status: {c.sent ? "Terkirim" : "Belum Terkirim"}
                </p>
              </div>
              <button
                className="text-red-500 font-bold"
                onClick={() => handleDelete(c.id)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HealthCampaign;
