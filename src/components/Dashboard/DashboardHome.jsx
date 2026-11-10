import { useEffect } from "react";
import { useState } from "react";
import { AxiosInstance } from "./../../utils/axiosInstance";
import { dateFormate } from "../../utils/helper";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider.jsx";

const DashboardHome = () => {
  const [talims, setTalims] = useState([]);
  const [loading, setLoading] = useState(false);
  const { initialUser } = useAuth();

  useEffect(() => {
    const fetchedTalims = async () => {
      setLoading(true);
      const res = await AxiosInstance.get("/talim");

      if (res.data) {
        const allTalims = res.data.data;
        setTalims(allTalims);
        setLoading(false);

        // automatically expired talims will be deleted after midnight
        const now = new Date();

        // 2. Create a reference point for Today at Midnight (00:00:00.000)
        const todayMidnight = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
        );
        allTalims.forEach(async (talim) => {
          const talimDate = new Date(talim.date);

          // Normalize the Talim date to Midnight of that day as well for fair comparison
          const talimMidnight = new Date(
            talimDate.getFullYear(),
            talimDate.getMonth(),
            talimDate.getDate(),
          );

          // 3. If talimMidnight is strictly LESS than todayMidnight, it means the day has completely passed
          if (talimMidnight < todayMidnight) {
            try {
              await AxiosInstance.delete(`/talim/auto-delete/${talim._id}`);
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

  const currentMonthBangla = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
  });

  const currentMonth = new Date().getMonth() + 1;

  const activeTalims = talims.filter((item) => {
    const itemMonth = new Date(item.date).getMonth() + 1;
    return currentMonth === itemMonth;
  });
  // const activeTalims = talims.filter((item) => {
  //   const itemDate = new Date(item.date).toISOString();
  //   return currentDate <= itemDate;
  // });

  const todayStr = new Date().toDateString();

  const todaysTalims = talims.filter((item) => {
    const itemDateStr = new Date(item.date).toDateString();
    return todayStr === itemDateStr;
  });

  const banglaDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 col-md-6 bg-amber-100">
          <section>
            {todaysTalims.length > 0 ? (
              <main>
                <header className="text-center py-4 my-2 bg-green-400">
                  <h2> {banglaDate} ইং</h2>
                  <h1> আজকের তা’লিমের মাহফিল</h1>
                  <hr />
                </header>
                <div className="md:flex justify-evenly items-center flex-wrap gap-4 ">
                  {todaysTalims.map((talim, index) => (
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
                          <strong>ওয়ার্ড নং- </strong>
                          {talim.ward?.split("-")[1]}
                        </p>
                        <p className="card-text">
                          <strong> গ্রামের নামঃ-</strong> {talim.village}
                        </p>
                        <p className="card-text">
                          <strong> মসজিদের/মহল্লার নামঃ-</strong>
                          {talim.masjid}
                        </p>
                        <p className="card-text">
                          <strong> আয়োজকের মোবাইলঃ- </strong> {talim.phone}
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
                        <strong> তারিখঃ- </strong> {dateFormate(talim.date)} ইং
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            ) : (
              <div className=" md:w-full flex justify-center items-center">
                <div className="my-3">
                  <h2>আজকে - {banglaDate} ইং </h2>
                  <h1 className="text-center">আজকে কোথায়ও তা’লিম নেই</h1>
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="col-sm-6 col-md-6 bg-amber-300">
          <div className="row">
            <section>
              <header className="text-center py-4 my-2 bg-green-400">
                <h2>{currentMonthBangla} ইং</h2>
                <h1 className=""> মাসের তা’লিমের সময়সূচী </h1>
                <hr />
              </header>
              {loading ? (
                <div className="max-w-screen h-screen flex justify-center items-center">
                  <div className="spinner-border text-success"></div>
                </div>
              ) : (
                <div className="p-2 md:flex justify-evenly items-center">
                  {activeTalims?.length > 0 ? (
                    <div className="">
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
                              <strong>ওয়ার্ড নং- </strong>
                              {talim.ward?.split("-")[1]}
                            </p>
                            <p className="card-text">
                              <strong> গ্রামের নামঃ-</strong> {talim.village}
                            </p>
                            <p className="card-text">
                              <strong> মসজিদের/মহল্লার নামঃ-</strong>
                              {talim.masjid}
                            </p>
                            <p className="card-text">
                              <strong> আয়োজকের মোবাইলঃ- </strong>
                              {talim.phone}
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
                            <strong> তারিখঃ- </strong> {dateFormate(talim.date)}{" "}
                            ইং
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className=" md:w-full md:h-screen flex justify-center items-center">
                      <h1 className="text-center">
                        তা’লিমের কোন তথ্য পাওয়া যায়নি
                      </h1>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
