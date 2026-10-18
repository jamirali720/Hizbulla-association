import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <main className="border border-red-600">
      <div className="flex flex-col md:flex-row gap-0 md:gap-4 ">
        <div className="w-full rounded-sm md:w-2/12">
          <Sidebar />
        </div>
        <div className="w-full md:w-10/12 rounded-sm border border-red-950">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
