import { useEffect } from "react";
import { useState } from "react";
import { AxiosInstance } from "./../../utils/axiosInstance";
import { dateFormate } from "../../utils/helper";
import { toast } from "react-toastify";
import {useAuth} from "../../context/AuthProvider.jsx"
const DashboardHome = () => {
  const [talims, setTalims] = useState([]);
  const [loading, setLoading] = useState(false);
  const {initialUser} = useAuth();


  useEffect(() => {
    const fetchedTalims = async () => {
      setLoading(true);
      const res = await AxiosInstance.get("/talim");

      if (res.data) {
        const allTalims = res.data.data;
        setTalims(allTalims);
        setLoading(false);
        const currentDate = new Date().toISOString();
        allTalims.forEach(async (talim) => {
          if (new Date(talim.date) < currentDate) {
            try {
              await AxiosInstance.delete(`/talim/${talim._id}`);
              setTalims((prev) =>
                prev.filter((item) => item._id !== talim._id),
              );
            } catch (err) {
              console.error("Failed to auto-delete expired item:", err);
            }
          }
        });
      }
    };

    fetchedTalims();
  }, []);

  const currentDate = new Date().toISOString();

  const activeTalims = talims.filter((item) => {
    const itemDate = new Date(item.date).toISOString();
    return currentDate <= itemDate;
  });

  const todayStr = new Date().toDateString();

  const todaysTalims = talims.filter((item) => {
    const itemDateStr = new Date(item.date).toDateString();
    return todayStr === itemDateStr;
  });

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

  
  return (
    <main>
      <section>
        <header className="text-center py-2">
          {" "}
          <h1> আজকের তা’লিমের মাহফিল গুলোর অবস্থান</h1>
        </header>
        <main>
          <div className="md:flex justify-evenly items-center flex-wrap gap-4">
            {todaysTalims.map((talim, index) => (
              <div key={index} className="card">
                <div className="card-header">
                  <b>
                    <strong> কুমিল্লা জেলার- {talim.upazila}</strong>
                  </b>
                </div>
                <div className="card-body">
                  <p className="card-text">ইউনিয়নঃ- {talim.union} </p>
                  <p className="card-text">
                    ওয়ার্ড নং- {talim.ward?.split("-")[1]}{" "}
                  </p>
                  <p className="card-text">গ্রামের নামঃ- {talim.village} </p>
                  <p className="card-text"> আয়োজকের মোবাইলঃ- {talim.phone} </p>
                  <p className="card-text">
                    মসজিদের/মহল্লার নামঃ- {talim.masjid}{" "}
                  </p>
                  {initialUser?.role === "admin" && (
                    <button
                      onClick={() => handleDeleteTalim(talim._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="card-footer">
                  তারিখঃ- {dateFormate(talim.date)}
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>

      <div>
        <hr />
      </div>
      <section>
        <header className="text-center">
          <h1 className="">সারা মাসের তা’লিমের সময় সূচী </h1>
          <hr />
        </header>
        {loading ? (
          <div className="max-w-screen h-screen flex justify-center items-center">
            <div className="spinner-border text-success"></div>
          </div>
        ) : (
          <div className="p-2">
            {activeTalims?.length > 0 ? (
              <div className="md:flex justify-evenly items-center flex-wrap gap-4">
                {activeTalims.map((talim, index) => (
                  <div key={index} className="card">
                    <div className="card-header">
                      <b>
                        <strong> কুমিল্লা জেলার- {talim.upazila}</strong>
                      </b>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        <strong>ইউনিয়নঃ-</strong> {talim.union}
                      </p>
                      <p className="card-text">
                        <strong>ওয়ার্ড নং- </strong>{" "}
                        {talim.ward?.split("-")[1]}{" "}
                      </p>
                      <p className="card-text">
                        <strong> গ্রামের নামঃ-</strong> {talim.village}{" "}
                      </p>
                      <p className="card-text">
                        <strong> আয়োজকের মোবাইলঃ-</strong> {talim.phone}{" "}
                      </p>
                      <p className="card-text">
                        <strong> মসজিদের/মহল্লার নামঃ-</strong>{" "}
                        {talim.masjid}{" "}
                      </p>
                      {initialUser?.role === "admin" && (
                        <button
                          onClick={() => handleDeleteTalim(talim._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <div className="card-footer">
                      <strong> তারিখঃ- </strong> {dateFormate(talim.date)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" md:w-full md:h-screen flex justify-center items-center">
                <h1 className="text-center"> তা’লিমের কোন তথ্য পাওয়া যায়নি</h1>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default DashboardHome;
