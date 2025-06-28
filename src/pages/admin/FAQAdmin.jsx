// src/pages/admin/FAQAdmin.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function FAQAdmin() {
  const [faqList, setFaqList] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchFAQ();
  }, []);

  const fetchFAQ = async () => {
    const { data, error } = await supabase.from("faq").select("*").order("created_at", { ascending: false });
    if (!error) setFaqList(data);
  };

  const handleAddOrUpdate = async () => {
    if (!question || !answer) return;

    if (editId) {
      await supabase
        .from("faq")
        .update({ pertanyaan: question, jawaban: answer })
        .eq("id", editId);
    } else {
      await supabase.from("faq").insert([{ pertanyaan: question, jawaban: answer }]);
    }

    setQuestion("");
    setAnswer("");
    setEditId(null);
    fetchFAQ();
  };

  const handleEdit = (faq) => {
    setQuestion(faq.pertanyaan);
    setAnswer(faq.jawaban);
    setEditId(faq.id);
  };

  const handleDelete = async (id) => {
    await supabase.from("faq").delete().eq("id", id);
    fetchFAQ();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manajemen FAQ</h1>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Pertanyaan"
          className="w-full p-2 border rounded"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          placeholder="Jawaban"
          className="w-full p-2 border rounded"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdate}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editId ? "Update FAQ" : "Tambah FAQ"}
        </button>
      </div>

      <ul className="space-y-4">
        {faqList.map((faq) => (
          <li key={faq.id} className="bg-white shadow p-4 rounded">
            <div className="font-semibold">{faq.pertanyaan}</div>
            <div className="text-gray-700">{faq.jawaban}</div>
            <div className="space-x-2 mt-2">
              <button onClick={() => handleEdit(faq)} className="text-sm text-blue-600">
                Edit
              </button>
              <button onClick={() => handleDelete(faq.id)} className="text-sm text-red-600">
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
