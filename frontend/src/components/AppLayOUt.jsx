import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
const AppLayOUt = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayOUt;
