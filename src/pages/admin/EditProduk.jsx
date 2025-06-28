import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPromoById, updatePromo } from '../../api/promoService';
import { getProducts } from '../../api/productService';

const EditPromo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    discountType: 'persen',
    discountValue: '',
    startDate: '',
    endDate: '',
    productIds: [],
  });

  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promoData, productData] = await Promise.all([
          getPromoById(id),
          getProducts()
        ]);
        setForm(promoData);
        setProducts(productData);
      } catch (error) {
        console.error('Gagal mengambil data promo/produk:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductToggle = (productId) => {
    setForm((prev) => ({
      ...prev,
      productIds: prev.productIds.includes(productId)
        ? prev.productIds.filter((id) => id !== productId)
        : [...prev.productIds, productId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, discountType, discountValue, startDate, endDate, productIds } = form;

    if (!name || !discountType || !startDate || !endDate) {
      setError('Nama, tipe promo, dan tanggal wajib diisi.');
      return;
    }

    if (discountType !== 'khusus' && !discountValue) {
      setError('Isi nilai diskon.');
      return;
    }

    if (discountType === 'persen') {
      const percent = Number(discountValue);
      if (percent <= 0 || percent > 100) {
        setError('Diskon persen harus antara 1% sampai 100%.');
        return;
      }
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('Tanggal berakhir harus setelah tanggal mulai.');
      return;
    }

    if (productIds.length === 0) {
      setError('Pilih minimal satu produk.');
      return;
    }

    try {
      await updatePromo(id, form);
      navigate('/promo-list');
    } catch (error) {
      console.error('Gagal update promo:', error);
      setError('Gagal update promo.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Promo</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Nama Promo</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tipe Promo</label>
          <select
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="persen">Diskon Persen (%)</option>
            <option value="potongan">Potongan Harga (Rp)</option>
            <option value="khusus">Promo Khusus</option>
          </select>
        </div>

        {form.discountType !== 'khusus' && (
          <div>
            <label className="block font-medium text-gray-700">
              {form.discountType === 'persen' ? 'Diskon (%)' : 'Potongan Harga (Rp)'}
            </label>
            <input
              type="number"
              name="discountValue"
              value={form.discountValue}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        {form.discountType === 'khusus' && (
          <div>
            <label className="block font-medium text-gray-700">Deskripsi Promo</label>
            <input
              type="text"
              name="discountValue"
              value={form.discountValue}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Contoh: Beli 2 Gratis 1"
            />
          </div>
        )}

        <div>
          <label className="block font-medium text-gray-700">Tanggal Mulai</label>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Tanggal Berakhir</label>
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Pilih Produk Promo</label>
          <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border p-2 rounded">
            {products.map((prod) => (
              <label key={prod.id} className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.productIds.includes(prod.id)}
                  onChange={() => handleProductToggle(prod.id)}
                />
                <span>{prod.nama}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditPromo;
