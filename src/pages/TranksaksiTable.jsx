import React, { useState } from "react";

export default function TransaksiTable() {
  const [transaksi, setTransaksi] = useState([
    {
      id: 1,
      namaPelanggan: "Andi",
      namaObat: "Paracetamol",
      jenisObat: "Tablet",
      diskon: 10,
      metodePembayaran: "Tunai",
      totalPesanan: 50000,
      namaKasir: "Kasir A",
    },
    {
      id: 2,
      namaPelanggan: "Budi",
      namaObat: "Amoxicillin",
      jenisObat: "Kapsul",
      diskon: 5,
      metodePembayaran: "Transfer",
      totalPesanan: 75000,
      namaKasir: "Kasir B",
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    namaPelanggan: "",
    namaObat: "",
    jenisObat: "",
    diskon: "",
    metodePembayaran: "",
    totalPesanan: "",
    namaKasir: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const isEmpty = Object.values(form).some((v) => v === "");
    if (isEmpty) {
      alert("Mohon isi semua field transaksi");
      return;
    }

    if (isEditing) {
      setTransaksi((prev) =>
        prev.map((t) =>
          t.id === form.id ? { ...form, diskon: Number(form.diskon), totalPesanan: Number(form.totalPesanan) } : t
        )
      );
      setIsEditing(false);
    } else {
      const newTransaksi = {
        ...form,
        id: transaksi.length ? transaksi[transaksi.length - 1].id + 1 : 1,
        diskon: Number(form.diskon),
        totalPesanan: Number(form.totalPesanan),
      };
      setTransaksi((prev) => [...prev, newTransaksi]);
    }

    setForm({
      id: null,
      namaPelanggan: "",
      namaObat: "",
      jenisObat: "",
      diskon: "",
      metodePembayaran: "",
      totalPesanan: "",
      namaKasir: "",
    });
  }

  function hapusTransaksi(id) {
    if (window.confirm("Yakin ingin menghapus transaksi ini?")) {
      setTransaksi((prev) => prev.filter((t) => t.id !== id));
    }
  }

  function editTransaksi(id) {
    const transaksiToEdit = transaksi.find((t) => t.id === id);
    setForm(transaksiToEdit);
    setIsEditing(true);
  }

  function batal() {
    setIsEditing(false);
    setForm({
      id: null,
      namaPelanggan: "",
      namaObat: "",
      jenisObat: "",
      diskon: "",
      metodePembayaran: "",
      totalPesanan: "",
      namaKasir: "",
    });
  }

  const styles = {
    container: {
      maxWidth: 900,
      margin: "20px auto",
      fontFamily: "Segoe UI, sans-serif",
      padding: 20,
      backgroundColor: "#f9f9f9",
      borderRadius: 8,
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    title: {
      textAlign: "center",
      color: "#333",
      marginBottom: 20,
    },
    form: {
      marginBottom: 30,
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 8,
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    formRow: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 15,
    },
    label: {
      marginBottom: 6,
      fontWeight: "600",
      color: "#555",
    },
    input: {
      padding: 8,
      borderRadius: 4,
      border: "1px solid #ccc",
      fontSize: 14,
    },
    buttonPrimary: {
      backgroundColor: "#4a90e2",
      border: "none",
      padding: "10px 16px",
      borderRadius: 5,
      color: "#fff",
      fontWeight: "600",
      cursor: "pointer",
      marginRight: 10,
    },
    buttonSecondary: {
      backgroundColor: "#ccc",
      border: "none",
      padding: "10px 16px",
      borderRadius: 5,
      cursor: "pointer",
      fontWeight: "600",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      borderRadius: 8,
      overflow: "hidden",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    },
    th: {
      backgroundColor: "#4a90e2",
      color: "#fff",
      fontWeight: "600",
      padding: "12px 10px",
      textAlign: "left",
    },
    td: {
      padding: "12px 10px",
      borderBottom: "1px solid #eee",
      color: "#333",
      fontSize: 14,
    },
    actionBtn: {
      padding: "6px 10px",
      borderRadius: 5,
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: 13,
      marginRight: 6,
    },
    editBtn: {
      backgroundColor: "#ffc107",
      color: "#333",
    },
    deleteBtn: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Manajemen Transaksi</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formRow}>
          <label style={styles.label}>Nama Pelanggan:</label>
          <input type="text" name="namaPelanggan" value={form.namaPelanggan} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Nama Obat:</label>
          <input type="text" name="namaObat" value={form.namaObat} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Jenis Obat:</label>
          <input type="text" name="jenisObat" value={form.jenisObat} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Diskon (%):</label>
          <input type="number" name="diskon" value={form.diskon} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Metode Pembayaran:</label>
          <input type="text" name="metodePembayaran" value={form.metodePembayaran} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Total Pesanan:</label>
          <input type="number" name="totalPesanan" value={form.totalPesanan} onChange={handleChange} style={styles.input} required />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Nama Kasir:</label>
          <input type="text" name="namaKasir" value={form.namaKasir} onChange={handleChange} style={styles.input} required />
        </div>

        <button type="submit" style={styles.buttonPrimary}>
          {isEditing ? "Update Transaksi" : "Tambah Transaksi"}
        </button>

        {isEditing && (
          <button type="button" style={styles.buttonSecondary} onClick={batal}>
            Batal
          </button>
        )}
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No</th>
            <th style={styles.th}>Nama Pelanggan</th>
            <th style={styles.th}>Nama Obat</th>
            <th style={styles.th}>Jenis Obat</th>
            <th style={styles.th}>Diskon (%)</th>
            <th style={styles.th}>Metode Pembayaran</th>
            <th style={styles.th}>Total Pesanan</th>
            <th style={styles.th}>Nama Kasir</th>
            <th style={styles.th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transaksi.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: 20 }}>
                Tidak ada transaksi
              </td>
            </tr>
          ) : (
            transaksi.map((t, idx) => (
              <tr key={t.id}>
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>{t.namaPelanggan}</td>
                <td style={styles.td}>{t.namaObat}</td>
                <td style={styles.td}>{t.jenisObat}</td>
                <td style={styles.td}>{t.diskon}%</td>
                <td style={styles.td}>{t.metodePembayaran}</td>
                <td style={styles.td}>Rp {t.totalPesanan.toLocaleString("id-ID")}</td>
                <td style={styles.td}>{t.namaKasir}</td>
                <td style={styles.td}>
                  <button onClick={() => editTransaksi(t.id)} style={{ ...styles.actionBtn, ...styles.editBtn }}>
                    Edit
                  </button>
                  <button onClick={() => hapusTransaksi(t.id)} style={{ ...styles.actionBtn, ...styles.deleteBtn }}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}