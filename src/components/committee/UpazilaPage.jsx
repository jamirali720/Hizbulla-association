import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/upazilas";

const UpazilaPage = () => {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    nameBn: "",
    district: "",
    districtBn: "",
    code: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    const res = await axios.get(API);
    setList(res.data);
  };

  useEffect(() => {
    

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`${API}/${editId}`, form);
    } else {
      await axios.post(API, form);
    }
    setForm({ name: "", nameBn: "", district: "", districtBn: "", code: "" });
    setEditId(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (confirm("মুছে ফেলতে চান?")) {
      await axios.delete(`${API}/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        উপজেলা ব্যবস্থাপনা
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          placeholder="Upazila Name (English)"
          className="border rounded-lg px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="উপজেলার নাম (বাংলা)"
          className="border rounded-lg px-3 py-2"
          value={form.nameBn}
          onChange={(e) => setForm({ ...form, nameBn: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="District"
          className="border rounded-lg px-3 py-2"
          value={form.district}
          onChange={(e) => setForm({ ...form, district: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="জেলা (বাংলা)"
          className="border rounded-lg px-3 py-2"
          value={form.districtBn}
          onChange={(e) => setForm({ ...form, districtBn: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Code (optional)"
          className="border rounded-lg px-3 py-2"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <button
          type="submit"
          className="bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-700"
        >
          {editId ? "আপডেট করুন" : "যোগ করুন"}
        </button>
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-4 py-3 text-left">নাম</th>
              <th className="px-4 py-3 text-left">জেলা</th>
              <th className="px-4 py-3 text-left">কোড</th>
              <th className="px-4 py-3 text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium">{item.nameBn}</div>
                  <div className="text-sm text-gray-500">{item.name}</div>
                </td>
                <td className="px-4 py-3">{item.districtBn}</td>
                <td className="px-4 py-3">{item.code || "-"}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:underline"
                  >
                    এডিট
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    ডিলিট
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UpazilaPage;
