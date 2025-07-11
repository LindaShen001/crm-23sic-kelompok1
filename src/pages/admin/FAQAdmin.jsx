// src/pages/admin/FAQAdmin.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function FAQAdmin() {
  // State untuk mengelola daftar FAQ
  const [faqList, setFaqList] = useState([]);
  // State untuk input pertanyaan FAQ
  const [question, setQuestion] = useState("");
  // State untuk input jawaban FAQ
  const [answer, setAnswer] = useState("");
  // State untuk menandai FAQ yang sedang diedit (menyimpan ID FAQ)
  const [editId, setEditId] = useState(null);

  // Efek samping untuk memuat data FAQ saat komponen pertama kali di-render
  useEffect(() => {
    fetchFAQ();
  }, []);

  // Fungsi untuk mengambil data FAQ dari Supabase
  const fetchFAQ = async () => {
    const { data, error } = await supabase.from("faq").select("*").order("created_at", { ascending: false });
    if (!error) {
      setFaqList(data);
    } else {
      console.error("Fetch FAQ error:", error);
    }
  };

  // Fungsi untuk menambahkan atau memperbarui FAQ
  const handleAddOrUpdate = async () => {
    // Pastikan pertanyaan dan jawaban tidak kosong
    if (!question || !answer) {
      alert("Pertanyaan dan Jawaban tidak boleh kosong!");
      return;
    }

    if (editId) {
      // Jika dalam mode edit, lakukan update data
      const { error } = await supabase
        .from("faq")
        .update({ pertanyaan: question, jawaban: answer })
        .eq("id", editId);

      if (error) {
        console.error("Update FAQ error:", error);
      }
    } else {
      // Jika tidak dalam mode edit, lakukan insert data baru
      const { error } = await supabase.from("faq").insert([{ pertanyaan: question, jawaban: answer }]);
      if (error) {
        console.error("Add FAQ error:", error);
      }
    }

    // Reset form dan mode edit setelah operasi selesai
    setQuestion("");
    setAnswer("");
    setEditId(null);
    fetchFAQ(); // Muat ulang data FAQ
  };

  // Fungsi untuk mengaktifkan mode edit dan mengisi form dengan data FAQ yang dipilih
  const handleEdit = (faq) => {
    setQuestion(faq.pertanyaan);
    setAnswer(faq.jawaban);
    setEditId(faq.id);
  };

  // Fungsi untuk menghapus FAQ
  const handleDelete = async (id) => {
    const { error } = await supabase.from("faq").delete().eq("id", id);
    if (error) {
      console.error("Delete FAQ error:", error);
    }
    fetchFAQ(); // Muat ulang data FAQ setelah penghapusan
  };

  return (
    // **PENYESUAIAN PENTING DI SINI:**
    // Menambahkan `pt-[TinggiHeaderAnda]` dan `lg:pl-[LebarSidebarAnda]`.
    // Ganti `[TinggiHeaderAnda]` dan `[LebarSidebarAnda]` dengan nilai piksel sebenarnya.
    // Contoh: Jika header 64px, gunakan `pt-[64px]`.
    // Contoh: Jika sidebar 256px, gunakan `lg:pl-[256px]`.
    <div className="p-6 pt-[64px] lg:pl-[256px]">
      <h1 className="text-2xl font-bold mb-4">Manajemen FAQ</h1>

      {/* Form untuk menambah/mengedit FAQ */}
      <div className="space-y-4 mb-6 p-4 bg-white shadow rounded">
        <input
          type="text"
          placeholder="Pertanyaan"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          placeholder="Jawaban"
          className="w-full p-2 border rounded resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4" // Menambahkan baris default untuk textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          {editId ? "Update FAQ" : "Tambah FAQ"}
        </button>
      </div>

      {/* Daftar FAQ */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-3">Daftar FAQ</h2>
        {faqList.length === 0 ? (
          <p className="text-center text-gray-500 py-4">Belum ada FAQ yang ditambahkan.</p>
        ) : (
          <ul className="space-y-4">
            {faqList.map((faq) => (
              <li key={faq.id} className="border-b pb-4 last:border-b-0">
                <div className="font-semibold text-gray-900">{faq.pertanyaan}</div>
                <div className="text-gray-700 mt-1">{faq.jawaban}</div>
                <div className="space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}