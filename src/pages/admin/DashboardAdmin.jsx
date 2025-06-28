import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const stats = [
    {
      label: "Pendapatan Hari Ini",
      value: "$53,000",
      percent: "+55%",
      color: "green",
    },
    {
      label: "Pengguna Hari Ini",
      value: "2,300",
      percent: "+3%",
      color: "blue",
    },
    { label: "Klien Baru", value: "+3,462", percent: "-2%", color: "red" },
    { label: "Penjualan", value: "$103,430", percent: "+5%", color: "purple" },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penjualan (dalam ribuan $)",
        data: [12, 19, 14, 17, 22, 30, 28, 26, 32, 35, 40, 45],
        backgroundColor: "rgba(139, 92, 246, 0.7)",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Jumlah Pelanggan",
        data: [50, 75, 120, 180, 220, 260, 300, 350, 400, 430, 460, 500],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false },
    },
  };

  const pieData = {
    labels: ["Obat-obatan", "Vitamin & Suplemen", "Ibu & Anak", "Herbal"],
    datasets: [
      {
        label: "Penjualan",
        data: [120, 95, 70, 45],
        backgroundColor: [
          "#6366f1", // Indigo
          "#10b981", // Emerald
          "#f59e0b", // Amber
          "#22c55e", // Green
        ],
        borderColor: "#f3f4f6", // slate-100
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 15,
          color: "#4b5563",
          font: { size: 12 },
        },
      },
      title: { display: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="pl-10 pr-6 py-6 bg-gray-50 min-h-screen space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Admin</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, percent, color }) => (
          <div key={label} className="bg-white rounded-xl shadow p-5 border">
            <p className="text-sm text-gray-500">{label}</p>
            <h2
              className={`text-2xl font-bold text-${color}-600 flex items-center gap-2`}
            >
              {value}
              <span className={`text-sm font-semibold text-${color}-500`}>
                {percent}
              </span>
            </h2>
          </div>
        ))}
      </div>

      {/* Grafik Penjualan & Pertumbuhan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Penjualan Bulanan
          </h3>
          <Bar options={barOptions} data={barData} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Pertumbuhan Pelanggan
          </h3>
          <Line options={lineOptions} data={lineData} />
        </div>
      </div>

      {/* Pie Chart dan Transaksi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 border flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Kategori Obat Terlaris
          </h3>
          <div className="w-60 h-60">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 border">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Transaksi Mingguan
          </h3>
          <Line
            options={{ responsive: true }}
            data={{
              labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
              datasets: [
                {
                  label: "Jumlah Transaksi",
                  data: [23, 45, 38, 50, 60, 52, 40],
                  borderColor: "#ec4899",
                  backgroundColor: "rgba(236, 72, 153, 0.3)",
                  fill: true,
                  tension: 0.4,
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
