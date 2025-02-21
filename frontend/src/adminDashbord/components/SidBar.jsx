import { RxDashboard } from "react-icons/rx";
import { LiaShoppingBasketSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { FaAngleLeft, FaAngleDown, FaRegMoneyBillAlt } from "react-icons/fa";
import { PiUsersThree, PiCertificateLight } from "react-icons/pi";
import { SiExpensify } from "react-icons/si";
import { FaRegFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";

const SidBar = () => {
  const [toggleProducts, setToggleProducts] = useState(false);
  const [toggleCustomers, setToggleCustomers] = useState(false);
  const [toggleVendors, setToggleVendors] = useState(false);
  const [toggleBilling, setToggleBilling] = useState(false);
  const [toggleOrders, setToggleOrders] = useState(false);
  const [toggleReports, setToggleReports] = useState(false);
  const [toggleCategory, setToggleCategory] = useState(false);

  return (
    <div className="fixed flex flex-col gap-2 m-auto p-4  h-screen  bg-gray-800 text-white">
      <div className="dashboard mt">
        <Link
          to="/dashboard"
          className="flex gap-3 items-center p-2 cursor-pointer"
        >
          <RxDashboard /> <h3>Dashboard</h3>
        </Link>
      </div>
      <div className="product">
        <div
          className="flex items-center justify-between  p-2  hover:bg-blue-300 "
          onClick={() => setToggleProducts(!toggleProducts)}
        >
          <div className="flex items-center justify-between  gap-3">
            <LiaShoppingBasketSolid /> <h3>Product</h3>
          </div>
          <div className="arrow ml-10">
            {toggleProducts ? <FaAngleDown /> : <FaAngleLeft />}
          </div>
        </div>
        {toggleProducts && (
          <ul className="flex flex-col ml-6 ">
            <li className="p-1  hover:bg-blue-300 ">
              <Link to="products">Products</Link>
            </li>
            <li className="p-1 hover:bg-blue-300 ">
              <Link to="addProduct">Add Product</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="Category">
        <div
          className="flex items-center p-2 justify-between hover:bg-blue-300 "
          onClick={() => setToggleCategory(!toggleCategory)}
        >
          <div className="flex items-center justify-between  gap-3">
            <PiCertificateLight /> <h3>Category</h3>
          </div>
          <div className="arrow ml-10">
            {toggleCategory ? <FaAngleDown /> : <FaAngleLeft />}
          </div>
        </div>
        {toggleCategory && (
          <ul className="flex flex-col ml-6 ">
            <li className="p-1  hover:bg-blue-300 ">
              <Link to="categories">Categories</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="customer">
        <div
          className="flex items-center p-2  justify-between hover:bg-blue-300 "
          onClick={() => setToggleCustomers(!toggleCustomers)}
        >
          <div className="flex items-center justify-between  gap-3">
            <PiUsersThree /> <h3>Customers</h3>
          </div>
          <div className="arrow ml-10">
            {toggleCustomers ? <FaAngleDown /> : <FaAngleLeft />}
          </div>
        </div>
        {toggleCustomers && (
          <ul className="flex flex-col ml-6 ">
            <li className="p-1  hover:bg-blue-300 ">
              <Link to="customers">Customers</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="vendors">
        <div
          className="flex items-center p-2 justify-between  hover:bg-blue-300 "
          onClick={() => setToggleVendors(!toggleVendors)}
        >
          <div className="flex items-center justify-between  gap-3">
            <FaRegUser /> <h3>Vendors</h3>
          </div>
          <div className="arrow ml-10">
            {toggleVendors ? <FaAngleDown /> : <FaAngleLeft />}
          </div>
        </div>
        {toggleVendors && (
          <ul className="flex flex-col ml-6 ">
            <li className="p-1  hover:bg-blue-300 ">
              <Link to="vendors">Vendors</Link>
            </li>
            <li className="p-1 hover:bg-blue-300 ">
              <Link to="addVendor">Add Vendor</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="billing">
        <div
          className="flex items-center p-2 justify-between hover:bg-blue-300 "
          onClick={() => setToggleBilling(!toggleBilling)}
        >
          <div className="flex items-center justify-between  gap-3">
            <FaRegMoneyBillAlt /> <h3>Billing</h3>
          </div>
          <div className="arrow ml-10">
            {toggleBilling ? <FaAngleDown /> : <FaAngleLeft />}
          </div>
        </div>
        {toggleBilling && (
          <ul className="flex flex-col ml-6 ">
            <li className="p-1  hover:bg-blue-300 ">
              <Link to="billing">Billings</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="orders">
        <div
          className="flex items-center p-2  justify-between hover:bg-blue-300 "
          onClick={() => setToggleOrders(!toggleOrders)}
        >
          <div className="flex items-center justify-between  gap-3">
            <FaRegFolderClosed /> <h3>Orders</h3>
          </div>
          <div className="arrow ml-10">
            {toggleOrders ? <FaAngleDown /> : <FaAngleLeft />}
          </div>
        </div>
        {toggleOrders && (
          <ul className="flex flex-col ml-6 ">
            <li className="p-1  hover:bg-blue-300 ">
              <Link to="orders">Orders</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="reports">
        <div
          className="flex items-center p-2 justify-between hover:bg-blue-300 "
          onClick={() => setToggleReports(!toggleReports)}
        >
          <div className="flex items-center justify-between  gap-3">
            <SiExpensify /> <h3>Reports</h3>
          </div>
          <div className="arrow ml-10">
            {toggleReports ? <FaAngleDown /> : <FaAngleLeft />}
          </div>
        </div>
        {toggleReports && (
          <ul className="flex flex-col ml-6 ">
            <li className="p-1  hover:bg-blue-300 ">
              <Link to="report">Reports</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="settings">
        <div className="flex items-center p-2 justify-between hover:bg-blue-300 ">
          <Link to="settings">
            <div className="flex items-center justify-between  gap-3">
              <FiSettings /> <h3>settings</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidBar;
