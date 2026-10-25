import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/unions';
const UPAZILA_API = 'http://localhost:5000/api/upazilas';

const UnionPage =() =>{
  const [list, setList] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [form, setForm] = useState({
    name: '',
    nameBn: '',
    upazila: '',
    code: ''
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(API);
    setList(res.data);
  };

  const fetchUpazilas = async () => {
    const res = await axios.get(UPAZILA_API);
    setUpazilas(res.data);
  };

  useEffect(() => {
    fetchData();
    fetchUpazilas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
      } else {
        await axios.post(API, form);
      }
      setForm({ name: '', nameBn: '', upazila: '', code: '' });
      setEditId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      nameBn: item.nameBn,
      upazila: item.upazila?._id || item.upazila,
      code: item.code || ''
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (confirm('এই ইউনিয়ন মুছে ফেলতে চান?')) {
      await axios.delete(`${API}/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ইউনিয়ন ব্যবস্থাপনা</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <input
          type="text"
          placeholder="Union Name (English)"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="ইউনিয়নের নাম (বাংলা)"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={form.nameBn}
          onChange={(e) => setForm({ ...form, nameBn: e.target.value })}
          required
        />
        <select
          value={form.upazila}
          onChange={(e) => setForm({ ...form, upazila: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        >
          <option value="">উপজেলা নির্বাচন করুন</option>
          {upazilas.map((u) => (
            <option key={u._id} value={u._id}>
              {u.nameBn} ({u.districtBn})
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Code (optional)"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700 transition col-span-1 md:col-span-2 lg:col-span-1"
        >
          {editId ? 'আপডেট করুন' : 'যোগ করুন'}
        </button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setForm({ name: '', nameBn: '', upazila: '', code: '' });
            }}
            className="bg-gray-400 text-white rounded-lg py-2 hover:bg-gray-500 transition"
          >
            বাতিল
          </button>
        )}
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-4 py-3 text-left">ইউনিয়ন</th>
              <th className="px-4 py-3 text-left">উপজেলা</th>
              <th className="px-4 py-3 text-left">জেলা</th>
              <th className="px-4 py-3 text-left">কোড</th>
              <th className="px-4 py-3 text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  কোনো ইউনিয়ন পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">{item.nameBn}</div>
                    <div className="text-sm text-gray-500">{item.name}</div>
                  </td>
                  <td className="px-4 py-3">
                    {item.upazila?.nameBn || '—'}
                  </td>
                  <td className="px-4 py-3">
                    {item.upazila?.districtBn || '—'}
                  </td>
                  <td className="px-4 py-3">{item.code || '—'}</td>
                  <td className="px-4 py-3 text-center space-x-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      এডিট
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      ডিলিট
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UnionPage;