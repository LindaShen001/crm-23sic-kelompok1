// src/pages/customers/FAQCustomer.jsx
import React, { useEffect, useState } from "react";
import { loadFaqData } from "../../data/faqStorage";

export default function FAQCustomer() {
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    setFaqList(loadFaqData());
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqList.map((faq) => (
          <div key={faq.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
