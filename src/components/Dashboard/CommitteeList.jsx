import { useEffect, useState } from "react";
import { AxiosInstance } from "../../utils/axiosInstance";
import { numBang } from "bang-utils";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { committeeType } from "../../utils/helper";
import locations from "../../data/bangladeshLocations.json";

const CommitteeList = () => {
  const [committees, setCommittees] = useState([]);
  const [unionName, setUnionName] = useState("");
  const [wardName, setWardName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [level, setLevel] = useState("upazila");

  const selectedUpazila = locations.find((item) => item.upazilaName);

  const unions = selectedUpazila?.unions ?? [];

  const selectedUnion = unions.find((item) => item.name);

  const wards = selectedUnion?.wards ?? [];

  useEffect(() => {
    const getCommittees = async () => {
      try {
        const res = await AxiosInstance.get(
          `/${level}?union=${unionName}&ward=${wardName}`,
        );
        if (res.data) {
          setCommittees(res.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    };
    getCommittees();
  }, [level, wardName, unionName]);

  const handleDeleteUser = async (id) => {
    const res = await AxiosInstance.delete(`/${level}/${id}`);
    console.log(res);
    if (res.data) {
      toast.success(res.data.message);
      setCommittees((prevCommittees) =>
        prevCommittees.filter((item) => item._id !== id),
      );
    }
  };

  const totalPages = Math.ceil(committees.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = committees.slice(startIndex, endIndex);

  return (
    <div>
      <main>
        <div className="text-center my-2 md:flex justify-evenly items-center ">
          <div className="w-3/4">
            <h3 style={{ color: "#ba1434", marginTop: "16px" }}>
              সর্বমোট{" = "}
              <strong className="text-blue-700 font-bold">
                {numBang(committees.length)}
              </strong>{" "}
              জন কমিটি সদস্য আছে।
            </h3>
          </div>
          <div className="w-1/4">
            <select
              style={{ minWidth: "360px" }}
              className="form-select my-2 text-center"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              {committeeType.map((item) => (
                <option value={item.id} key={item.id}>{item.name} </option>
              ))}
            </select>
          </div>
          <div>
            {level === "union" && (
              <div className="w-1/4">
                <select
                  style={{ minWidth: "360px" }}
                  className="form-select my-2 text-center"
                  value={unionName}
                  onChange={(e) => {
                    setUnionName(e.target.value);
                  }}
                >
                  <option value="">ইউনিয়ন নির্বাচন করুন</option>
                  {unions.map((item) => (
                    <option value={item.name} key={item.id}>{item.name} </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div>
            {level === "ward" && (
              <div className="w-1/4">
                <select
                  style={{ minWidth: "360px" }}
                  className="form-select my-2 text-center"
                  value={wardName}
                  onChange={(e) => {
                    setWardName(e.target.value);
                  }}
                >
                  <option value="">ওয়ার্ড নির্বাচন করুন</option>
                  {wards.map((item) => (
                    <option value={item.name} key={item.id}>{item.name} </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto p-4 overflow-auto">
          {currentUsers.length > 0 ? (
            <table className="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>ছবি</th>
                  <th>নাম</th>
                  <th>কমিটির পদবী </th>
                  <th>কমিটির পর্যায় </th>
                  <th>গ্রাম</th>
                  <th>ওয়ার্ড</th>
                  <th>ইউনিয়ন</th>
                  <th>উপজেলা</th>
                  <th>জেলা</th>
                  <th>মোবাইল নাম্বার </th>
                  <th>সিরিয়াল </th>
                  <th>সম্পাদন </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 &&
                  currentUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="text-success">
                        <img
                          src="../../../public/minar.png"
                          alt="minar"
                          width="50"
                          height="50"
                        />
                      </td>

                      <td className="text-success"> {user.user?.fullname} </td>
                      <td className="text-success"> {user.position} </td>
                      <td className="text-success"> {user.committeeName} </td>
                      <td className="text-success"> {user.user?.village} </td>
                      <td className="text-success"> {user.user?.ward} </td>
                      <td className="text-success"> {user.user?.union} </td>
                      <td className="text-success"> {user.user?.upazila} </td>
                      <td className="text-success"> {user.user?.district} </td>
                      <td className="text-success"> {user.user?.phone} </td>
                      <td className="text-success"> {user?.sorting} </td>
                      <td className="text-success md:flex justify-evenly">
                        <button
                          type="btn"
                          className="btn btn-danger  py-2 fw-semibold"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </button>

                        <Link
                          to={`/dashboard/update-committee/${level}/${user._id}`}
                        >
                          <button
                            type="btn"
                            className="btn btn-primary  py-2 fw-semibold"
                          >
                            Edit
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className=" md:w-full md:h-screen flex justify-center items-center">
              <h1 className="text-center"> কোন ডাটা পাওয়া যায়নি</h1>
            </div>
          )}

          <div className="w-screen md:w-full md:h-24 flex justify-between items-center px-4 mb-2 bg-gray-100">
            <div className="mb-3">
              <label className="form-label fw-semibold">Show</label>
              <select
                className="form-select"
                onChange={(e) => setItemsPerPage(e.target.value)}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className="flex justify-end items-center">
              {currentPage > 1 && (
                <button
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((current) => current - 1);
                    }
                  }}
                  disabled={currentPage === 1}
                  className="p-2 mx-2 btn btn-info"
                >
                  Prev
                </button>
              )}
              <span>
                Page {currentPage} of {totalPages || 1}
              </span>
              {currentPage < totalPages && (
                <button
                  onClick={() => {
                    if (totalPages && totalPages > currentPage) {
                      setCurrentPage((current) => current + 1);
                    }
                  }}
                  disabled={totalPages === currentPage}
                  className="p-2 mx-2 btn btn-info"
                >
                  next
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommitteeList;
