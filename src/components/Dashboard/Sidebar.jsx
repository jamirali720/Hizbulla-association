import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import { FaPeopleGroup } from "react-icons/fa6";
import {
  SquareDashedKanban,
  LayoutDashboard,
  BuildingComplexPlus,
} from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

const menuItems = [
  { name: "Dashboard", link: "", icon: LayoutDashboard },
  {
    name: "User Registration",
    link: "user-registration",
    icon: BuildingComplexPlus,
  },
  {
    name: "User Management",
    link: "user-management",
    icon: SquareDashedKanban,
  },
  { name: "Committees", link: "committees", icon: SquareDashedKanban },
  { name: "All Talims", link: "all-talims", icon: FaPeopleGroup },
  { name: "Add Talim", link: "talim", icon: FaPeopleGroup },
];

const Sidebar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <aside className="w-full min-h-screen bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              to={
                item.link === ""
                  ? "/dashboard"
                  : `/dashboard/${item.link.toLowerCase()}`
              }
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition"
            >
              <Icon size={20} />
              <span className="hover:text-white">{item.name}</span>
            </Link>
          );
        })}

        <button
          className="flex justify-center items-center gap-3 cursor-pointer px-3"
          onClick={handleLogout}
        >
          <span>
            <FiLogOut />
          </span>
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
