import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="w-screen md:w-full">
      <header>
        <Navbar />
      </header>
      {/* {location.pathname === "/" && <Carousel />} */}

      <section>
        <main>
          <Outlet />
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default MainLayout;
