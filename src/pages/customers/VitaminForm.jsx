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
      const response = await fetch("https://ff06-35-196-91-69.ngrok-free.app/predict", {
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
        backgroundColor: "#6366f1",
        borderRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw.toFixed(2)}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { callback: (value) => `${value}%` }
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
        <div className="text-2xl font-bold text-blue-700">Apotek ASEAN</div>
        <nav className="flex space-x-8 text-sm font-semibold text-gray-700 relative items-center">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/profile" className="hover:text-blue-600 transition">Profil</Link>
          <Link to="/shop" className="hover:text-blue-600 transition">Produk</Link>
          <Link to="/customer/faq" className="hover:text-blue-600 transition">FAQ</Link>
          <div className="relative group">
            <button className="text-blue-600 font-bold transition focus:outline-none">Layanan</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-0 rounded-md z-10 min-w-[180px] py-1 top-full left-0">
              <Link to="/layanan/keamanan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200">Keamanan & Privasi</Link>
              <Link to="/checkvit" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition duration-200">Cek Kebutuhan Vitamin Anda</Link>
            </div>
          </div>
          <Link to="/kontak" className="hover:text-blue-600 transition">Hubungi Kami</Link>
          <button onClick={() => navigate("/login")} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-colors duration-200">Login Admin</button>
        </nav>
      </header>

    

      {/* Main content */}
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
            Cek Kebutuhan Vitamin Anda
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[{ name: "age", label: "Usia", placeholder: "Masukkan usia anda" },
              { name: "sleep_hours", label: "Jam Tidur", placeholder: "Masukkan durasi tidur anda (/hari)" },
              { name: "sun_exposure_minutes", label: "Paparan Matahari (mnt)", placeholder: "Masukkan lama durasi paparan matahari (/hari)" },
              { name: "water_intake_liters", label: "Air Minum (liter)", placeholder: "Masukkan liter air minum anda (/hari)" },
              { name: "stress_level", label: "Tingkat Stres (1–5)", placeholder: "Masukkan tingkat stress level anda" }].map((item) => (
              <div key={item.name} className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">{item.label}</label>
                <input
                  name={item.name}
                  type="number"
                  placeholder={item.placeholder}
                  value={formData[item.name]}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                />
              </div>
            ))}

            {[{
              name: "gender", label: "Gender", options: [
                { value: "", label: "Pilih" }, { value: "0", label: "Male" }, { value: "1", label: "Female" }
              ]
            }, {
              name: "health_condition", label: "Kondisi Kesehatan", options: [
                { value: "", label: "Pilih" }, { value: "0", label: "Anemia" }, { value: "1", label: "Flu Sering" },
                { value: "2", label: "Maag" }, { value: "3", label: "Lemas" }, { value: "4", label: "Normal" }
              ]
            }, {
              name: "diet_type", label: "Pola Makan", options: [
                { value: "", label: "Pilih" }, { value: "0", label: "Vegetarian" }, { value: "1", label: "Normal" }, { value: "2", label: "Kurang Sayur" }
              ]
            }, {
              name: "activity_level", label: "Aktivitas", options: [
                { value: "", label: "Pilih" }, { value: "0", label: "Sedentary" }, { value: "1", label: "Aktif" }, { value: "2", label: "Sangat Aktif" }
              ]
            }].map(({ name, label, options }) => (
              <div key={name} className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-1">{label}</label>
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                >
                  {options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            ))}

            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
              >
                🔍 Cek Rekomendasi
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-8 text-center">
              <div className="bg-green-100 text-green-800 border border-green-300 rounded-md py-3 px-4 font-semibold">
                Rekomendasi Vitamin: <span className="text-lg">{result}</span>
              </div>
            </div>
          )}

          {confidenceScores.length > 0 && (
            <div className="mt-10">
              <h3 className="text-center text-lg font-semibold mb-3">Confidence Score</h3>
              <Bar data={chartData} options={chartOptions} />

              {/* PROMO */}
              <div className="mt-8 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl px-6 py-5 shadow-md text-center">
                <p className="font-semibold text-md mb-1">Butuh {result}?</p>
                <p className="text-sm mb-3">
                  Dapatkan suplemen <span className="font-semibold">{result}</span> berkualitas hanya di marketplace kami!
                </p>
                <Link
                  to="/shop"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
                >
                  🔗 Cek di MarketPlace Sekarang!
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">Apotek ASEAN</div>
            <p className="text-gray-400 text-sm">
              Mengedepankan pelayanan kesehatan terpercaya untuk memenuhi kebutuhan masyarakat.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/layanan/konsultasi-online" className="hover:text-white">Konsultasi Online</Link></li>
              <li><Link to="/layanan/kirim-resep" className="hover:text-white">Kirim Resep</Link></li>
              <li><Link to="/layanan/cek-kesehatan" className="hover:text-white">Cek Kesehatan</Link></li>
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
              <li>Jl. Jend. Ahmad Yani No.123, Pekanbaru</li>
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
