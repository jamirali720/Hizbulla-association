import  { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm ">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-around h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-blue-600 flex items-center gap-2"
            >
              <img
                src="../../public/minar.png"
                alt="minar"
                className="h-10 w-10"
              />
              <span>আল্লাহর দল, হবেই সফল</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-lg text-gray-600 gap-4">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
            <Link to="/services" className="hover:text-blue-600 transition">
              Services
            </Link>
            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3 gap-4">
            {isLogged ? (
              <button className="px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer">
                <Link to="/dashboard/profile"> প্রোফাইল</Link>
              </button>
            ) : (
              <>
                <button className="px-4 py-2 text-lg font-medium text-gray-700 hover:text-blue-600 transition cursor-pointer">
                  <Link to="/auth">Account</Link>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Dashboard
          </Link>
          <Link
            to="/services"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Contact
          </Link>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button className="btn btn-success cursor-pointer">
              <Link className="text-white" to="/auth">Account</Link>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
