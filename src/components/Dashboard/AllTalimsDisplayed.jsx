import { useEffect, useState } from "react";
import { AxiosInstance } from "../../utils/axiosInstance";
import { numBang } from "bang-utils";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { dateFormate } from "../../utils/helper";
const AllTalimsDisplayed = () => {
  const [talims, setTalims] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { initialUser } = useAuth();

  useEffect(() => {
    const getAllTalims = async () => {
      try {
        const res = await AxiosInstance.get("/talim");
        if (res.data) {
          setTalims(res.data.data);
        }
      } catch (error) {
        toast.error(error.response.data.message, { position: "bottom-center" });
        console.log(error);
      }
    };
    getAllTalims();
  }, []);

  const handleDeleteTalim = async (id) => {
    try {
      const res = await AxiosInstance.delete(`/talim/${id}`);
      if (res.data) {
        toast.success(res.data.message, { position: "bottom-center" });
      }
      setTalims((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.success(err.response.data.message, { position: "bottom-center" });
    }
  };

  const totalPages = Math.ceil(talims.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTalims = talims.slice(startIndex, endIndex);

  return (
    <div>
      <main>
        <div className="text-center my-2 md:flex justify-evenly items-center ">
          <div className="w-3/4">
            <h3 style={{ color: "#ba1434", marginTop: "16px" }}>
              সর্বমোট{" = "}
              <strong className="text-blue-700 font-bold">
                {numBang(talims.length)}
              </strong>
              <strong>টি তা’লিম চলমান আছে। </strong>
            </h3>
          </div>
        </div>
        <div className="mx-auto p-4 overflow-auto">
          {currentTalims.length > 0 ? (
            <table className="table table-striped table-hover table-bordered text-center">
              <thead>
                <tr>
                  <th>উপজেলা</th>
                  <th>ইউনিয়নের নাম</th>
                  <th>ওয়ার্ড নং</th>
                  <th>গ্রামের নাম</th>
                  <th>মসজিদ/মহল্লার নাম </th>
                  <th>আয়োজকের মোবাইল </th>
                  <th>সম্পাদন </th>
                </tr>
              </thead>
              <tbody>
                {currentTalims.length > 0 &&
                  currentTalims.map((talim, index) => (
                    <tr key={index}>
                      <td className="text-success text-nowrap"> {talim.upazila} </td>
                      <td className="text-success text-nowrap"> {talim.union}</td>
                      <td className="text-success text-nowrap"> {talim.ward}</td>
                      <td className="text-success text-nowrap"> {talim.village}</td>
                      <td className="text-success text-nowrap"> {talim.masjid}</td>
                      <td className="text-success text-nowrap">
                        {dateFormate(talim.date)}
                      </td>

                      <td className="text-success md:flex justify-evenly">
                        {initialUser?.role === "admin" ? (
                          <>
                            <button
                              type="btn"
                              className="btn btn-danger  py-2 fw-semibold"
                              onClick={() => handleDeleteTalim(talim._id)}
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <button>Empty</button>
                        )}
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

export default AllTalimsDisplayed;
