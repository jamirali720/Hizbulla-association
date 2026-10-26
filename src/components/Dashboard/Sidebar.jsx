import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import {
  SquareDashedKanban,
  LayoutDashboard,
  User,
  Settings,
  BuildingComplexPlus,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", link: "", icon: LayoutDashboard },
  { name: "Registration", link: "registration", icon: BuildingComplexPlus },
  { name: "Management", link: "management", icon: SquareDashedKanban },
  { name: "Committees", link: "committees", icon: SquareDashedKanban },
  { name: "Profile", link: "profile", icon: User },
  { name: "Settings", link: "settings", icon: Settings },
  // { name: "Logout",link: "logout",  icon: FiLogOut },
];
const adminMenuItems = [
  { name: "Upazila", link: "upazila", icon: SquareDashedKanban },
  { name: "Union", link: "union", icon: SquareDashedKanban },
  { name: "Ward", link: "ward", icon: SquareDashedKanban },
];

const Sidebar = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const { user, logoutUser } = useState({});
  const location = useLocation();

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
        {adminMenuItems.map((item, index) => {
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
        <button>
          <FiLogOut />
        </button>
        
      </nav>
    </aside>
  );
};

export default Sidebar;
