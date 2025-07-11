import React, { useMemo, useState, useEffect } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Mendaftarkan komponen Chart.js yang diperlukan
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function LaporanAnalisis() {
  // State untuk filter bulan laporan (format YYYY-MM)
  const [filterBulan, setFilterBulan] = useState("2025-06"); // Default bulan Juni 2025
  // State untuk menyimpan data penjualan
  const [penjualan, setPenjualan] = useState([]);
  // State untuk form input data penjualan baru
  const [form, setForm] = useState({ tanggal: "", nama: "", jumlah: 0, harga: 0 });

  // Efek samping untuk memuat data penjualan dummy saat komponen dimuat
  useEffect(() => {
    // Data dummy penjualan
    const dummyData = [
      { tanggal: "2025-06-01", nama: "Paracetamol 500mg", jumlah: 20, harga: 1500 },
      { tanggal: "2025-06-01", nama: "Vitamin C 1000mg", jumlah: 10, harga: 3000 },
      { tanggal: "2025-06-02", nama: "Ibuprofen 200mg", jumlah: 15, harga: 1800 },
      { tanggal: "2025-06-03", nama: "Amoxicillin 250mg", jumlah: 25, harga: 2000 },
      { tanggal: "2025-06-04", nama: "Paracetamol 500mg", jumlah: 30, harga: 1500 },
      { tanggal: "2025-06-04", nama: "Vitamin C 1000mg", jumlah: 5, harga: 3000 },
      { tanggal: "2025-06-05", nama: "Cough Syrup", jumlah: 12, harga: 5000 },
      { tanggal: "2025-06-06", nama: "Ibuprofen 200mg", jumlah: 10, harga: 1800 },
      { tanggal: "2025-06-06", nama: "Antacid Tablet", jumlah: 8, harga: 2500 },
      { tanggal: "2025-06-07", nama: "Paracetamol 500mg", jumlah: 40, harga: 1500 },
      { tanggal: "2025-06-08", nama: "Amoxicillin 250mg", jumlah: 18, harga: 2000 },
      { tanggal: "2025-06-09", nama: "Vitamin C 1000mg", jumlah: 12, harga: 3000 },
      { tanggal: "2025-06-10", nama: "Cough Syrup", jumlah: 15, harga: 5000 },
      { tanggal: "2025-06-10", nama: "Ibuprofen 200mg", jumlah: 7, harga: 1800 },
      { tanggal: "2025-06-11", nama: "Antacid Tablet", jumlah: 10, harga: 2500 },
      { tanggal: "2025-06-12", nama: "Paracetamol 500mg", jumlah: 35, harga: 1500 },
      { tanggal: "2025-06-13", nama: "Amoxicillin 250mg", jumlah: 20, harga: 2000 },
      { tanggal: "2025-06-14", nama: "Cough Syrup", jumlah: 6, harga: 5000 },
      { tanggal: "2025-06-15", nama: "Vitamin C 1000mg", jumlah: 9, harga: 3000 },
      { tanggal: "2025-06-15", nama: "Antacid Tablet", jumlah: 5, harga: 2500 },
    ];
    setPenjualan(dummyData);
    // Menyimpan dummy data ke localStorage
    localStorage.setItem("laporanPenjualan", JSON.stringify(dummyData));

    // Memuat data dari localStorage jika ada saat komponen pertama kali dimuat
    const savedData = localStorage.getItem("laporanPenjualan");
    if (savedData) {
      try {
        setPenjualan(JSON.parse(savedData));
      } catch (e) {
        console.error("Error parsing data from localStorage", e);
        // Fallback to dummyData if parsing fails
        setPenjualan(dummyData);
      }
    }
  }, []);

  // Handler untuk perubahan input form
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler untuk submit form (menambah data penjualan baru)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!form.tanggal || !form.nama || +form.jumlah <= 0 || +form.harga <= 0) {
      alert("Mohon lengkapi semua field dengan benar.");
      return;
    }

    const newData = [...penjualan, { ...form, jumlah: +form.jumlah, harga: +form.harga }];
    setPenjualan(newData);
    // Memperbarui data di localStorage
    localStorage.setItem("laporanPenjualan", JSON.stringify(newData));

    // Reset form setelah submit
    setForm({ tanggal: "", nama: "", jumlah: 0, harga: 0 });
  };

  // useMemo untuk menghitung laporan berdasarkan data penjualan dan filter bulan
  const laporan = useMemo(() => {
    // Filter data penjualan berdasarkan bulan yang dipilih
    const dataFiltered = Array.isArray(penjualan)
      ? penjualan.filter(
          (item) => typeof item.tanggal === "string" && item.tanggal.startsWith(filterBulan)
        )
      : [];

    // Hitung total pendapatan
    const totalPendapatan = dataFiltered.reduce(
      (sum, item) => sum + item.harga * item.jumlah,
      0
    );
    // Hitung total produk terjual
    const totalProduk = dataFiltered.reduce((sum, item) => sum + item.jumlah, 0);
    // Hitung jumlah transaksi
    const totalTransaksi = dataFiltered.length;

    const pendapatanPerHari = {};
    const penjualanPerProduk = {};

    // Agregasi pendapatan per hari dan penjualan per produk
    dataFiltered.forEach((item) => {
      const tanggal = item.tanggal;
      pendapatanPerHari[tanggal] =
        (pendapatanPerHari[tanggal] || 0) + item.harga * item.jumlah;
      penjualanPerProduk[item.nama] =
        (penjualanPerProduk[item.nama] || 0) + item.jumlah;
    });

    // Urutkan produk berdasarkan jumlah penjualan untuk menentukan terlaris dan kurang laku
    const sortedProduk = Object.entries(penjualanPerProduk).sort((a, b) => b[1] - a[1]);
    const produkTerlaris = sortedProduk[0];
    const produkKurangLaku = sortedProduk[sortedProduk.length - 1];

    return {
      totalPendapatan,
      totalProduk,
      totalTransaksi,
      pendapatanPerHari,
      penjualanPerProduk,
      produkTerlaris,
      produkKurangLaku,
    };
  }, [penjualan, filterBulan]); // Dependencies for useMemo

  // Data untuk Line Chart (Pendapatan Harian)
  const lineChartData = {
    labels: Object.keys(laporan.pendapatanPerHari).sort(), // Urutkan tanggal
    datasets: [
      {
        label: "Pendapatan Harian (Rp)",
        data: Object.values(laporan.pendapatanPerHari),
        borderColor: "#4CAF50", // Warna hijau
        backgroundColor: "rgba(76, 175, 80, 0.2)", // Latar belakang area
        tension: 0.3, // Kehalusan garis
        fill: true, // Mengisi area di bawah garis
      },
    ],
  };

  // Data untuk Bar Chart (Statistik Bulan Ini)
  const barChartData = {
    labels: ["Total Pendapatan", "Total Produk Terjual", "Jumlah Transaksi"],
    datasets: [
      {
        label: "Nilai Statistik",
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"], // Warna berbeda untuk setiap bar
        data: [
          laporan.totalPendapatan,
          laporan.totalProduk,
          laporan.totalTransaksi,
        ],
      },
    ],
  };

  // Fungsi helper untuk data Doughnut Chart (Produk Terlaris/Kurang Laku)
  const doughnutData = (label, data, total) => ({
    labels: [label || "Tidak Ada Data", "Sisa Penjualan"], // Label untuk segmen
    datasets: [
      {
        data: [data || 0, Math.max(0, total - (data || 0))], // Data segmen (produk terjual vs sisa)
        backgroundColor: ["#4CAF50", "#e0e0e0"], // Warna hijau untuk produk utama, abu-abu untuk sisa
        hoverOffset: 4,
      },
    ],
  });

  return (
      <div className="p-6 pt-[64px] lg:pl-[256px]">
      <h1 className="text-2xl font-bold mb-4">Ringkasan & Analisis Penjualan</h1>

      {/* Filter Bulan */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <label htmlFor="filterBulan" className="block text-sm font-medium text-gray-700 mb-2">
          Pilih Bulan Analisis:
        </label>
        <input
          type="month"
          id="filterBulan"
          value={filterBulan}
          onChange={(e) => setFilterBulan(e.target.value)}
          className="border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
        />
      </div>

      {/* Form Tambah Data Penjualan Baru (opsional, untuk demo data dummy) */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 mb-8">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Input Data Penjualan (Demo)</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div>
            <label className="block text-xs font-medium text-gray-700">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Nama Produk</label>
            <input
              type="text"
              name="nama"
              placeholder="Nama Produk"
              value={form.nama}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Jumlah</label>
            <input
              type="number"
              name="jumlah"
              placeholder="Jumlah"
              value={form.jumlah}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700">Harga per Unit (Rp)</label>
            <input
              type="number"
              name="harga"
              placeholder="Harga"
              value={form.harga}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
          </div>
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-sm text-sm"
            >
              Tambah Data
            </button>
          </div>
        </form>
      </div>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center text-center">
          <h4 className="font-medium text-gray-600 mb-2 text-base">Total Pendapatan Bulan Ini</h4>
          <p className="text-green-600 font-bold text-2xl md:text-3xl">
            Rp {laporan.totalPendapatan.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center text-center">
          <h4 className="font-medium text-gray-600 mb-2 text-base">Total Produk Terjual</h4>
          <p className="text-blue-600 font-bold text-2xl md:text-3xl">{laporan.totalProduk} Unit</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center justify-center text-center">
          <h4 className="font-medium text-gray-600 mb-2 text-base">Jumlah Transaksi</h4>
          <p className="text-orange-600 font-bold text-2xl md:text-3xl">{laporan.totalTransaksi} Transaksi</p>
        </div>
      </div>

      {/* Bagian Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
          <h4 className="font-semibold mb-4 text-lg md:text-xl text-gray-800 border-b pb-2">Grafik Pendapatan Harian</h4>
          {Object.keys(laporan.pendapatanPerHari).length > 0 ? (
            <div className="h-[250px] md:h-[300px]"> {/* Mengatur tinggi fixed untuk grafik */}
              <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10 text-sm">Tidak ada data pendapatan untuk bulan ini.</p>
          )}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
          <h4 className="font-semibold mb-4 text-lg md:text-xl text-gray-800 border-b pb-2">Statistik Penjualan Global</h4>
          <div className="h-[250px] md:h-[300px]"> {/* Mengatur tinggi fixed untuk grafik */}
            <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Produk Terlaris & Kurang Laku */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col items-center">
          <h4 className="font-semibold mb-4 text-lg md:text-xl text-gray-800 border-b pb-2 w-full text-center">Produk Terlaris</h4>
          <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] flex items-center justify-center mb-2"> {/* Ukuran Doughnut lebih kecil */}
            {laporan.produkTerlaris ? (
              <Doughnut
                data={doughnutData(
                  laporan.produkTerlaris[0],
                  laporan.produkTerlaris[1],
                  laporan.totalProduk
                )}
                options={{ maintainAspectRatio: false, responsive: true }}
              />
            ) : (
              <p className="text-gray-500 text-sm">Belum ada produk terlaris.</p>
            )}
          </div>
          {laporan.produkTerlaris && (
            <p className="mt-2 text-base font-medium text-center">
              **{laporan.produkTerlaris[0]}** ({laporan.produkTerlaris[1]} unit)
            </p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col items-center">
          <h4 className="font-semibold mb-4 text-lg md:text-xl text-gray-800 border-b pb-2 w-full text-center">Produk Kurang Laku</h4>
          <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] flex items-center justify-center mb-2"> {/* Ukuran Doughnut lebih kecil */}
            {laporan.produkKurangLaku ? (
              <Doughnut
                data={doughnutData(
                  laporan.produkKurangLaku[0],
                  laporan.produkKurangLaku[1],
                  laporan.totalProduk
                )}
                options={{ maintainAspectRatio: false, responsive: true }}
              />
            ) : (
              <p className="text-gray-500 text-sm">Belum ada produk kurang laku.</p>
            )}
          </div>
          {laporan.produkKurangLaku && (
            <p className="mt-2 text-base font-medium text-center">
              **{laporan.produkKurangLaku[0]}** ({laporan.produkKurangLaku[1]} unit)
            </p>
          )}
        </div>
      </div>

      {/* Riwayat Penjualan */}
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 overflow-x-auto">
        <h4 className="font-semibold mb-4 text-lg md:text-xl text-gray-800 border-b pb-2">Riwayat Penjualan</h4>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Tanggal</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Nama Produk</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Jumlah</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Harga</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Subtotal</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {laporan.totalTransaksi === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500 text-sm">
                  Tidak ada data penjualan untuk bulan ini.
                </td>
              </tr>
            ) : (
              penjualan
                .filter((item) => item.tanggal.startsWith(filterBulan))
                .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)) // Urutkan dari tanggal terbaru
                .map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap text-sm">{item.tanggal}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">{item.nama}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">{item.jumlah}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">Rp {item.harga.toLocaleString("id-ID")}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm">Rp {(item.harga * item.jumlah).toLocaleString("id-ID")}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}