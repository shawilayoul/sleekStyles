import NavBar from "../adminDashbord/components/NavBar";
import { Outlet } from "react-router-dom";
import SidBar from "../adminDashbord/components/SidBar";

const AppLayOUtAdmin = () => {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="hidden w-[15%] md:w-[16%] z-10 md:flex">
          <SidBar />
        </div>
        <div className="w-full p-4">
          {" "}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayOUtAdmin;
