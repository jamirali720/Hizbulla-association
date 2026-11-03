import { useEffect } from "react";
import { useState } from "react";
import { AxiosInstance } from "./../../utils/axiosInstance";
import { numBang } from "bang-utils";
import { dateFormate } from "../../utils/helper";
const DashboardHome = () => {
  const [talims, setTalims] = useState([]);

  useEffect(() => {
    const fetchedTalims = async () => {
      const res = await AxiosInstance.get("/talim");

      if (res.data) {
        setTalims(res.data.data);
      }
    };

    fetchedTalims();
  }, []);
  console.log(talims);
  return (
    <div>
      {talims.length > 0 ? (
        <div className="md:flex justify-evenly items-center">
          {talims.map((talim, index) => (
            <div key={index} className="card text-center">
              <div className="card-header">কুমিল্লা জেলার-{talim.upazila} </div>
              <div className="card-body">
                <h4 className="card-title"></h4>
                <p className="card-text">ইউনিয়নঃ- {talim.union} </p>
                <p className="card-text">
                  ওয়ার্ড নং- {talim.ward?.split("-")[1]}{" "}
                </p>
                <p className="card-text">গ্রামের নামঃ- {talim.village} </p>
                <p className="card-text"> আয়োজকের মোবাইলঃ- {talim.phone} </p>
                <p className="card-text">
                  মসজিদের/মহল্লার নামঃ- {talim.masjid}{" "}
                </p>
                <div className="flex justify-evenly items-center gap-3">
                  <button className="btn btn-info">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </div>
              </div>
              <div className="card-footer">
                তারিখঃ- {dateFormate(talim.date)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h1> no Talim</h1>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
