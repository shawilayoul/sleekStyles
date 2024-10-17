import { GoPackage } from "react-icons/go";

import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
const CustomerExpenses = () => {
  return (
    <div className="md:row-span-1 xl:row-span-2 shadow-md p-2">
      <div
        className=" border-b-2 p-2 flex
          items-center justify-between bg-blue-100"
      >
        <h3 className="font-bold"> Customer & Expenses</h3>
        <p>06-28 August 2024</p>
      </div>
      <div className="bottom flex gap-4 items-center justify-center w-full h-[70%] p-2">
        <div className="bg-blue-100 w-10 rounded-full h-10 flex items-center justify-center">
          {" "}
          <GoPackage />
        </div>
        <div className="right w-full">
          <div className="top flex items-center justify-between gap-2">
            <p>Customer Growth</p>
            <p>175.00</p>
            <div className="flex items-center gap-1">
              <FaArrowTrendUp /> <p className="text-green-400">+142</p>
            </div>
          </div>
          <hr />
          <div className="bottom flex items-center justify-between gap-2 mt-2">
            <p>Expenses</p>
            <p>10.00</p>
            <div className="flex items-center gap-1">
              <FaArrowTrendDown /> <p className="text-red-400">-52%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerExpenses;
