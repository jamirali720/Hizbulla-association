import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosInstance } from "./../../utils/axiosInstance";
import { toast } from "react-toastify";

import { numBang } from "bang-utils";
const ManageUsers = () => {
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
 

  useEffect(() => {
    const refreshList = async () => {
      const resp = await AxiosInstance.get(`/auth/users`);
      console.log(resp);
      if (resp.status === 200) {
        setUsersList(resp.data.data);
      }
    };
    // setInterval(() => {
    refreshList();
    // }, 500);
  }, []);

  const totalPages = Math.ceil(usersList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = usersList.slice(startIndex, endIndex);

  const handleDeleteUser = async (id) => {
    const res = await AxiosInstance.delete(
      `/auth/delete-user/${id}`,
    );

    if (res.data) {
      toast.success(res.data.message);
      
    }
  };

  return (
    <div>
      <main>
        <div className="text-center my-2  md:flex justify-evenly">
          <h1 style={{ color: "#ba1434", marginTop:"16px" }}>
            সর্বমোট{" = "}
            <strong className="text-blue-700 font-bold">
              {numBang(usersList.length)}
            </strong>{" "}
            জন পীরভাই/মুহিব্বীন আছেন। 
          </h1>
        </div>
        <div className="mx-auto p-4 overflow-auto">
          {currentUsers.length > 0 ? (
            <table class="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>ছবি</th>
                  <th>ইউজার আইডি</th>
                  <th>নাম</th>
                  <th>জেলা</th>
                  <th>উপজেলা</th>
                  <th>ইউনিয়ন</th>
                  <th>ওয়ার্ড</th>
                  <th>গ্রাম</th>
                  <th>পদবী </th>                 
                  <th>মোবাইল নাম্বার </th>
                  <th>সম্পাদন </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="text-success">
                      <img
                        src="../../../public/minar.png"
                        alt="minar"
                        width="50"
                        height="50"
                      />
                    </td>
                    <td className="text-success"> {user.userId} </td>
                    <td className="text-success"> {user.fullname} </td>
                    <td className="text-success"> {user.district} </td>
                    <td className="text-success"> {user.upazila} </td>
                    <td className="text-success"> {user.union} </td>
                    <td className="text-success"> {user.ward} </td>
                    <td className="text-success"> {user.village} </td>
                    <td className="text-success"> {user.position} </td>                    
                    <td className="text-success"> {user.phone} </td>
                    <td className="text-success md:flex justify-evenly">
                      <button
                        type="btn"
                        className="btn btn-danger  py-2 fw-semibold"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>

                      <Link to={`/dashboard/update-user/${user._id}`}>
                        <button
                          type="btn"
                          className="btn btn-primary  py-2 fw-semibold"
                        >
                          Edit
                        </button>
                      </Link>
                      <Link to={`/dashboard/add-committe/${user._id}`}>
                        <button
                          type="btn"
                          className="btn btn-primary  py-2 fw-semibold"
                        >
                          Committee
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

export default ManageUsers;
