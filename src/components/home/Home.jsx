import { useEffect, useState } from "react";

const Home = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const refreshList = () => {
      fetch("https://association-server.onrender.com/getAllUsers")
        .then((res) => res.json())
        .then((users) => setUsersList(users));
    };
    refreshList();
  }, []);

  return (
    <main>
      <div className="mx-auto p-4 overflow-auto">
        <table class="table table-striped table-hover table-bordered text-center">
          <thead>
            <tr>
              <th>ছবি</th>
              <th>নাম</th>
              <th>জেলা</th>
              <th>উপজেলা</th>
              <th>ইউনিয়ন</th>
              <th>ওয়ার্ড</th>
              <th>গ্রাম</th>
              <th>পদবী </th>
              <th>মোবাইল নাম্বার </th>
            </tr>
          </thead>
          <tbody>
            {usersList.map((user, index) => (
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
                <td className="text-success"> {user.email} </td>
                <td className="text-success"> {user.phone} </td>
                <td className="text-success"> {user.donation} </td>
                <td className="text-success"> {user.address} </td>
                <td className="text-success"> {user.date} </td>
                <td className="text-success"> {user.date} </td>
                <td className="text-success"> {user.date} </td>
                <td className="text-success"> {user.date} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Home;
