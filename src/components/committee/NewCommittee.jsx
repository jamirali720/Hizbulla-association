import { NavLink, Outlet } from "react-router-dom";


const NewCommittee = () => {
  return (
    
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-emerald-700 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold">স্থানীয় সরকার ব্যবস্থাপনা</h1>
            <div className="flex gap-6">
              <NavLink
                to="/new/upazilas"
                className={({ isActive }) =>
                  isActive ? "font-bold underline" : ""
                }
              >
                উপজেলা
              </NavLink>
              <NavLink
                to="/new/unions"
                className={({ isActive }) =>
                  isActive ? "font-bold underline" : ""
                }
              >
                ইউনিয়ন
              </NavLink>
              <NavLink
                to="/new/wards"
                className={({ isActive }) =>
                  isActive ? "font-bold underline" : ""
                }
              >
                ওয়ার্ড কমিটি
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Outlet/>
        </main>
      </div>
    
  );
};

export default NewCommittee;
