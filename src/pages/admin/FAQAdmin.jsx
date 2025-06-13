// src/pages/admin/FAQAdmin.jsx
import React, { useState, useEffect } from "react";
import { loadFaqData, saveFaqData } from "../../data/faqStorage";

export default function FAQAdmin() {
  const [faqList, setFaqList] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    setFaqList(loadFaqData());
  }, []);

  const handleAddOrUpdate = () => {
    let updatedList;

    if (editId !== null) {
      updatedList = faqList.map((faq) =>
        faq.id === editId ? { ...faq, question, answer } : faq
      );
      setEditId(null);
    } else {
      const newFAQ = {
        id: Date.now(),
        question,
        answer,
      };
      updatedList = [...faqList, newFAQ];
    }

    setFaqList(updatedList);
    saveFaqData(updatedList);
    setQuestion("");
    setAnswer("");
  };

  const handleEdit = (faq) => {
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setEditId(faq.id);
  };

  const handleDelete = (id) => {
    const updated = faqList.filter((faq) => faq.id !== id);
    setFaqList(updated);
    saveFaqData(updated);
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
          {editId !== null ? "Update FAQ" : "Tambah FAQ"}
        </button>
      </div>

      <ul className="space-y-4">
        {faqList.map((faq) => (
          <li key={faq.id} className="bg-white shadow p-4 rounded">
            <div className="font-semibold">{faq.question}</div>
            <div className="text-gray-700">{faq.answer}</div>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => handleEdit(faq)}
                className="text-sm text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                className="text-sm text-red-600"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
