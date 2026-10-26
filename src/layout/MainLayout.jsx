import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = () => {
  
  return (
    <div className="w-screen md:w-full">
      <header>
        <Navbar />
      </header>
    

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
