import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/wards";
const UNION_API = "http://localhost:5000/api/unions";

const WardPage = () => {
  const [list, setList] = useState([]);
  const [unions, setUnions] = useState([]);
  const [form, setForm] = useState({
    wardNumber: "",
    name: "",
    nameBn: "",
    union: "",
    members: [],
  });
  const [editId, setEditId] = useState(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    nameBn: "",
    designation: "",
    phone: "",
    nid: "",
  });

  const fetchData = async () => {
    const res = await axios.get(API);
    setList(res.data);
  };

  const fetchUnions = async () => {
    const res = await axios.get(UNION_API);
    setUnions(res.data);
  };

  useEffect(() => {
    fetchData();
    fetchUnions();
  }, []);

  const addMember = () => {
    if (!memberForm.name || !memberForm.designation) {
      alert("নাম ও পদবী অবশ্যই দিতে হবে");
      return;
    }
    setForm({
      ...form,
      members: [...form.members, { ...memberForm }],
    });
    setMemberForm({
      name: "",
      nameBn: "",
      designation: "",
      phone: "",
      nid: "",
    });
  };

  const removeMember = (index) => {
    const updated = form.members.filter((_, i) => i !== index);
    setForm({ ...form, members: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        wardNumber: Number(form.wardNumber),
      };
      if (editId) {
        await axios.put(`${API}/${editId}`, payload);
      } else {
        await axios.post(API, payload);
      }
      setForm({ wardNumber: "", name: "", nameBn: "", union: "", members: [] });
      setEditId(null);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  const handleEdit = (item) => {
    setForm({
      wardNumber: item.wardNumber,
      name: item.name,
      nameBn: item.nameBn,
      union: item.union?._id || item.union,
      members: item.members || [],
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (confirm("এই ওয়ার্ড কমিটি মুছে ফেলতে চান?")) {
      await axios.delete(`${API}/${id}`);
      fetchData();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        ওয়ার্ড কমিটি ব্যবস্থাপনা
      </h2>

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="ওয়ার্ড নম্বর (1-15)"
            min="1"
            max="15"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.wardNumber}
            onChange={(e) => setForm({ ...form, wardNumber: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Ward Name (English)"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="ওয়ার্ডের নাম (বাংলা)"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={form.nameBn}
            onChange={(e) => setForm({ ...form, nameBn: e.target.value })}
            required
          />
          <select
            value={form.union}
            onChange={(e) => setForm({ ...form, union: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          >
            <option value="">ইউনিয়ন নির্বাচন করুন</option>
            {unions.map((u) => (
              <option key={u._id} value={u._id}>
                {u.nameBn} — {u.upazila?.nameBn || ""}
              </option>
            ))}
          </select>
        </div>

        {/* Members Section */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-lg mb-3">সদস্য যোগ করুন</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
            <input
              type="text"
              placeholder="নাম"
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={memberForm.name}
              onChange={(e) =>
                setMemberForm({ ...memberForm, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="নাম (বাংলা)"
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={memberForm.nameBn}
              onChange={(e) =>
                setMemberForm({ ...memberForm, nameBn: e.target.value })
              }
            />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={memberForm.designation}
              onChange={(e) =>
                setMemberForm({ ...memberForm, designation: e.target.value })
              }
            >
              <option value="">পদবী নির্বাচন</option>
              <option value="Chairman">চেয়ারম্যান</option>
              <option value="Member">সদস্য</option>
              <option value="Female Member">মহিলা সদস্য</option>
              <option value="Reserved Female">সংরক্ষিত মহিলা</option>
            </select>
            <input
              type="text"
              placeholder="মোবাইল"
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={memberForm.phone}
              onChange={(e) =>
                setMemberForm({ ...memberForm, phone: e.target.value })
              }
            />
            <button
              type="button"
              onClick={addMember}
              className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
            >
              + সদস্য যোগ
            </button>
          </div>

          {/* Member List */}
          {form.members.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-medium mb-2">
                যোগ করা সদস্য ({form.members.length})
              </p>
              <div className="space-y-2">
                {form.members.map((m, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white px-3 py-2 rounded border"
                  >
                    <div>
                      <span className="font-medium">{m.name}</span>
                      {m.nameBn && (
                        <span className="text-gray-500 text-sm ml-2">
                          ({m.nameBn})
                        </span>
                      )}
                      <span className="ml-3 text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                        {m.designation}
                      </span>
                      {m.phone && (
                        <span className="ml-2 text-sm text-gray-600">
                          {m.phone}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      সরান
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            {editId ? "আপডেট করুন" : "ওয়ার্ড কমিটি তৈরি করুন"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({
                  wardNumber: "",
                  name: "",
                  nameBn: "",
                  union: "",
                  members: [],
                });
              }}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
            >
              বাতিল
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-50">
            <tr>
              <th className="px-4 py-3 text-left">ওয়ার্ড</th>
              <th className="px-4 py-3 text-left">ইউনিয়ন</th>
              <th className="px-4 py-3 text-left">উপজেলা</th>
              <th className="px-4 py-3 text-left">সদস্য সংখ্যা</th>
              <th className="px-4 py-3 text-center">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  কোনো ওয়ার্ড কমিটি পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              list.map((item) => (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      ওয়ার্ড {item.wardNumber} — {item.nameBn}
                    </div>
                    <div className="text-sm text-gray-500">{item.name}</div>
                  </td>
                  <td className="px-4 py-3">{item.union?.nameBn || "—"}</td>
                  <td className="px-4 py-3">
                    {item.union?.upazila?.nameBn || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {item.members?.length || 0} জন
                    </span>
                  </td>
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
};
export default WardPage;
