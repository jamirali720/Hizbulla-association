import { useEffect, useState } from "react";
import { AxiosInstance } from "../../utils/axiosInstance";
import { userStatus } from "../../utils/helper";
import locations from "../../data/bangladeshLocations.json";
import {
  numBang,  
  // monthBang,
  // numToBanglaWords,
  // dayBang,
  // currencyToBang,
  // timeBang,
} from "bang-utils";
const Home = () => {
  const [search, setSearch] = useState("");
  const [upazilaName, setUpazilaName] = useState("তিতাস");
  const [union, setUnion] = useState("");
  const [ward, setWard] = useState("");
  const [village, setVillage] = useState("");
  const [pirvaiMuhibbin, setPirvaiMuhibbin] = useState("");
  const [usersList, setUsersList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const refreshList = async () => {
      const res = await AxiosInstance.get(
        `/auth/all-users?search=${search}&union=${union}&ward=${ward}&village=${village}&pirvaiMuhibbin=${pirvaiMuhibbin}`,
      );
      if (res.data) {
        setUsersList(res.data.data);
      }
    };
    refreshList();
  }, [search, ward, union, village, pirvaiMuhibbin]);

  // Get dependent data
  const selectedUpazila = locations.find(
    (item) => item.upazilaName === upazilaName,
  );

  const unions = selectedUpazila?.unions ?? [];

  const selectedUnion = unions.find((item) => item.name === union);

  const wards = selectedUnion?.wards ?? [];

  const selectedWard = wards.find((item) => item.name === ward);

  const villages = selectedWard?.villages ?? [];

  const handleClearFilter = () => {
    setSearch("");
    setUnion("");
    setVillage("");
    setWard("");
    setPirvaiMuhibbin("");
    window.location.reload();
  };

  const totalPages = Math.ceil(usersList.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = usersList.slice(startIndex, endIndex);

  console.log( "check value",  pirvaiMuhibbin)

  const banglaDate = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <div className="text-center my-3  md:flex justify-evenly">
        <h3 style={{ color: "#ba1434" }}>আজ -  {banglaDate} </h3>
        <h1 style={{ color: "#ba1434" }}>
          সর্বমোট{" = "}
          <strong className="text-blue-700 font-bold">
            {numBang(usersList.length)}
          </strong>{" "}
          জন
        </h1>
      </div>
      <div className="my-2">
        <div className="md:flex gap-x-2  justify-around items-center">
          <div className="md:w-2/6 h-12 my-2 md:my-0">
            <input
              type="text"
              class="form-control h-full"
              placeholder="নাম অথবা মোবাইল নাম্বার দিয়ে খোঁজেন"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="md:w-2/12 h-12 my-2 md:my-0">
            {" "}
            <select
              className="form-select h-full"
              defaultValue={upazilaName}
              onChange={(e) => setUpazilaName(e.target.value)}
            >
              {/* <option value="তিতাস">উপজেলা নির্বাচন করুন</option> */}

              {locations.map((item) => (
                <option key={item.upazilaId} value={item.upazilaName}>
                  {item.upazilaName}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-2/12 h-12 my-2 md:my-0">
            <select
              className="form-select h-full"
              onChange={(e) => setUnion(e.target.value)}
            >
              <option value="">ইউনিয়ন নির্বাচন করুন</option>
              <option value="All">সকল ইউনিয়ন</option>

              {unions.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:w-2/12 h-12 my-2 md:my-0">
            {" "}
            <select
              className="form-select h-full"
              disabled={!union}
              onChange={(e) => setWard(e.target.value)}
            >
              <option value="">ওয়ার্ড নির্বাচন করুন</option>
              <option value="All">সকল ওয়ার্ড</option>

              {wards.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-2/12 h-12 my-2 md:my-0">
            <select
              className="form-select h-full"
              disabled={!ward}
              onChange={(e) => setVillage(e.target.value)}
            >
              <option value="">গ্রাম নির্বাচন করুন</option>
              <option value="All">সকল গ্রাম</option>

              {villages.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-2/12 h-12 my-2 md:my-0 ">
            <select
              class="form-select h-full"
              value={pirvaiMuhibbin}
              onChange={(e) => setPirvaiMuhibbin(e.target.value)}
            >
              <option value="">মুরীদ/মুহিব্বীন নির্বাচন করুন</option>
              <option value="All">সকল</option>

              {userStatus.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-2/12 h-12 my-2 md:my-0">
            <button
              className="btn btn-danger w-full h-full"
              onClick={handleClearFilter}
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto p-4 overflow-auto">
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
              <th>অবস্থান </th>
              <th>মোবাইল নাম্বার </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 &&
              currentUsers.map((user, index) => (
                <tr key={index}>
                  <td className="text-success">
                    {" "}
                    <img
                      src="../../../public/minar.png"
                      alt="minar"
                      width="50"
                      height="50"
                    />{" "}
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
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-screen md:w-full md:h-24 flex justify-between items-center px-4 mb-2 bg-gray-100">
        <div className="mb-3">
          <label className="form-label fw-semibold">Show</label>
          <select
            className="form-select"
            onChange={(e) => setItemsPerPage(e.target.value)}
          >
            <option value="5">5</option>
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
    </main>
  );
};

export default Home;
