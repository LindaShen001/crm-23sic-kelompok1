import React, { useState } from "react";

export default function ProdukTable() {
  const [produk, setProduk] = useState([
    {
      id: 1,
      nama: "Sabun Mandi",
      harga: 15000,
      expired: "2025-08-10",
      stok: 50,
      supplier: "PT Bersih Sejahtera",
    },
    {
      id: 2,
      nama: "Sikat Gigi",
      harga: 12000,
      expired: "2026-01-15",
      stok: 200,
      supplier: "CV Sehat Selalu",
    },
    {
      id: 3,
      nama: "Pasta Gigi",
      harga: 25000,
      expired: "2025-11-30",
      stok: 150,
      supplier: "PT Mulia Abadi",
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    nama: "",
    harga: "",
    expired: "",
    stok: "",
    supplier: "",
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

    if (!form.nama || !form.harga || !form.expired || !form.stok || !form.supplier) {
      alert("Mohon isi semua field");
      return;
    }

    if (isEditing) {
      setProduk((prevProduk) =>
        prevProduk.map((p) =>
          p.id === form.id ? { ...form, harga: Number(form.harga), stok: Number(form.stok) } : p
        )
      );
      setIsEditing(false);
    } else {
      const newProduk = {
        ...form,
        id: produk.length ? produk[produk.length - 1].id + 1 : 1,
        harga: Number(form.harga),
        stok: Number(form.stok),
      };
      setProduk((prevProduk) => [...prevProduk, newProduk]);
    }

    setForm({ id: null, nama: "", harga: "", expired: "", stok: "", supplier: "" });
  }

  function hapusProduk(id) {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      setProduk((prevProduk) => prevProduk.filter((p) => p.id !== id));
    }
  }

  function editProduk(id) {
    const produkToEdit = produk.find((p) => p.id === id);
    setForm(produkToEdit);
    setIsEditing(true);
  }

  function batal() {
    setIsEditing(false);
    setForm({ id: null, nama: "", harga: "", expired: "", stok: "", supplier: "" });
  }

  // Style CSS in JS
  const styles = {
    container: {
      maxWidth: 900,
      margin: "20px auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
    formTitle: {
      marginBottom: 15,
      color: "#444",
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
      outline: "none",
      transition: "border-color 0.3s",
    },
    inputFocus: {
      borderColor: "#4a90e2",
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
      transition: "background-color 0.3s",
    },
    buttonPrimaryHover: {
      backgroundColor: "#357ABD",
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
      userSelect: "none",
    },
    td: {
      padding: "12px 10px",
      borderBottom: "1px solid #eee",
      color: "#333",
      fontSize: 14,
    },
    trHover: {
      backgroundColor: "#f5faff",
    },
    actionBtn: {
      padding: "6px 10px",
      borderRadius: 5,
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: 13,
      marginRight: 6,
      transition: "background-color 0.3s",
    },
    editBtn: {
      backgroundColor: "#ffc107",
      color: "#333",
    },
    editBtnHover: {
      backgroundColor: "#e0a800",
    },
    deleteBtn: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
    deleteBtnHover: {
      backgroundColor: "#b02a37",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Daftar Produk</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3 style={styles.formTitle}>{isEditing ? "Edit Produk" : "Tambah Produk"}</h3>

        <div style={styles.formRow}>
          <label style={styles.label}>Nama Produk:</label>
          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama produk"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Harga:</label>
          <input
            type="number"
            name="harga"
            value={form.harga}
            onChange={handleChange}
            placeholder="Harga produk"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Expired:</label>
          <input
            type="date"
            name="expired"
            value={form.expired}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Jumlah Stok:</label>
          <input
            type="number"
            name="stok"
            value={form.stok}
            onChange={handleChange}
            placeholder="Jumlah stok"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.label}>Nama Supplier:</label>
          <input
            type="text"
            name="supplier"
            value={form.supplier}
            onChange={handleChange}
            placeholder="Nama supplier"
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          style={styles.buttonPrimary}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonPrimaryHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.buttonPrimary.backgroundColor)}
        >
          {isEditing ? "Update Produk" : "Tambah Produk"}
        </button>

        {isEditing && (
          <button
            type="button"
            style={styles.buttonSecondary}
            onClick={batal}
          >
            Batal
          </button>
        )}
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>No</th>
            <th style={styles.th}>Nama Produk</th>
            <th style={styles.th}>Harga</th>
            <th style={styles.th}>Expired</th>
            <th style={styles.th}>Jumlah Stok</th>
            <th style={styles.th}>Nama Supplier</th>
            <th style={styles.th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {produk.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                Tidak ada produk
              </td>
            </tr>
          ) : (
            produk.map((p, idx) => (
              <tr
                key={p.id}
                style={{ cursor: "default" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.trHover.backgroundColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td style={styles.td}>{idx + 1}</td>
                <td style={styles.td}>{p.nama}</td>
                <td style={styles.td}>Rp {p.harga.toLocaleString("id-ID")}</td>
                <td style={styles.td}>{p.expired}</td>
                <td style={styles.td}>{p.stok}</td>
                <td style={styles.td}>{p.supplier}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => editProduk(p.id)}
                    style={{ ...styles.actionBtn, ...styles.editBtn }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.editBtnHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.editBtn.backgroundColor)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => hapusProduk(p.id)}
                    style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.deleteBtnHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.deleteBtn.backgroundColor)}
                  >
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
