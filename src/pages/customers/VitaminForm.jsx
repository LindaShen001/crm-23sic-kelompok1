import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function VitaminForm() {
  const [formData, setFormData] = useState({
    age: "",
    sleep_hours: "",
    sun_exposure_minutes: "",
    water_intake_liters: "",
    stress_level: "",
    gender: "",
    health_condition: "",
    diet_type: "",
    activity_level: ""
  });

  const [result, setResult] = useState(null);
  const [confidenceScores, setConfidenceScores] = useState([]);
  const navigate = useNavigate();

  const labelMapping = [
    "Vitamin D",
    "Vitamin B12",
    "Vitamin C",
    "Magnesium",
    "Multivitamin",
    "Zinc"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      age: parseFloat(formData.age),
      sleep_hours: parseFloat(formData.sleep_hours),
      sun_exposure_minutes: parseFloat(formData.sun_exposure_minutes),
      water_intake_liters: parseFloat(formData.water_intake_liters),
      stress_level: parseInt(formData.stress_level),
      gender: parseInt(formData.gender),
      health_condition: parseInt(formData.health_condition),
      diet_type: parseInt(formData.diet_type),
      activity_level: parseInt(formData.activity_level)
    };

    try {
      const response = await fetch("https://1cad-34-48-78-103.ngrok-free.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      });

      const json = await response.json();

      if (json.success) {
        setResult(labelMapping[json.predicted_label]);
        if (json.predictions) {
          setConfidenceScores(json.predictions);
        }
      } else {
        setResult("Prediksi gagal: " + json.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Gagal menghubungkan server.");
    }
  };

  const chartData = {
    labels: labelMapping,
    datasets: [
      {
        label: "Confidence (%)",
        data: confidenceScores,
        backgroundColor: "#0d6efd",
        borderRadius: 8
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-purple-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 items-center">
          <Link to="/" className="text-purple-600 font-bold">Home</Link>
          <Link to="/profile" className="hover:text-purple-600">Profil</Link>
          <Link to="/shop" className="hover:text-purple-600">Produk</Link>
          <Link to="/customer/faq" className="hover:text-purple-600">FAQ</Link>
          <div className="relative group">
            <button className="hover:text-purple-600">Layanan</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-1 rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link to="/layanan/keamanan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700">Keamanan & Privasi</Link>
              <Link to="/checkvit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 hover:text-purple-700">Cek Kebutuhan Vitamin Anda</Link>
            </div>
          </div>
          <Link to="/kontak" className="hover:text-purple-600">Hubungi Kami</Link>
          <button
            onClick={() => navigate("/login")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md"
          >
            Login Admin
          </button>
        </nav>
      </header>

      {/* Spacer */}
      <div className="pt-[80px] px-4 flex-grow">
        {/* Form + Hasil */}
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">Form Prediksi Vitamin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: "age", label: "Usia" },
              { name: "sleep_hours", label: "Jam Tidur" },
              { name: "sun_exposure_minutes", label: "Paparan Matahari (mnt)" },
              { name: "water_intake_liters", label: "Air Minum (liter)" },
              { name: "stress_level", label: "Tingkat Stres (1–5)" }
            ].map((item) => (
              <div key={item.name} className="flex flex-col">
                <label className="font-semibold">{item.label}</label>
                <input
                  name={item.name}
                  type="number"
                  value={formData[item.name]}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded-md"
                />
              </div>
            ))}

            {[
              {
                name: "gender", label: "Gender", options: [
                  { value: "", label: "Pilih" },
                  { value: "0", label: "Male" },
                  { value: "1", label: "Female" }
                ]
              },
              {
                name: "health_condition", label: "Kondisi Kesehatan", options: [
                  { value: "", label: "Pilih" },
                  { value: "0", label: "Anemia" },
                  { value: "1", label: "Flu Sering" },
                  { value: "2", label: "Maag" },
                  { value: "3", label: "Lemas" },
                  { value: "4", label: "Normal" }
                ]
              },
              {
                name: "diet_type", label: "Pola Makan", options: [
                  { value: "", label: "Pilih" },
                  { value: "0", label: "Vegetarian" },
                  { value: "1", label: "Normal" },
                  { value: "2", label: "Kurang Sayur" }
                ]
              },
              {
                name: "activity_level", label: "Aktivitas", options: [
                  { value: "", label: "Pilih" },
                  { value: "0", label: "Sedentary" },
                  { value: "1", label: "Aktif" },
                  { value: "2", label: "Sangat Aktif" }
                ]
              }
            ].map(({ name, label, options }) => (
              <div key={name} className="flex flex-col">
                <label className="font-semibold">{label}</label>
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded-md"
                >
                  {options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            ))}

            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 mt-4 rounded-lg font-semibold">
              Cek Rekomendasi
            </button>
          </form>

          {result && (
            <div className="mt-6 text-center bg-green-100 text-green-800 font-semibold py-3 rounded-md">
              Rekomendasi Vitamin: {result}
            </div>
          )}

          {confidenceScores.length > 0 && (
            <div className="mt-8">
              <h3 className="text-center text-lg font-semibold mb-2">Confidence Score</h3>
              <Bar data={chartData} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8 mt-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-purple-400 mb-4">Apotek ASEAN</div>
            <p className="text-gray-400 text-sm">
              Mengedepankan pelayanan kesehatan terpercaya untuk memenuhi kebutuhan masyarakat.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/layanan/konsultasi-online" className="hover:text-white">Konsultasi Online</Link></li>
              <li><Link to="/layanan/kirim-resep" className="hover:text-white">Kirim Resep</Link></li>
              <li><Link to="/checkvit" className="hover:text-white">Cek Kebutuhan Vitamin Anda</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link to="/karir" className="hover:text-white">Karir</Link></li>
              <li><Link to="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</Link></li>
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>+6282114452448</li>
              <li>info@apotekasean.com</li>
              <li>Jl. Jend. Ahmad Yani No.123, Pekanbaru, Riau</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2024 Apotek ASEAN. Semua hak dilindungi.
        </div>
      </footer>
    </div>
  );
}
