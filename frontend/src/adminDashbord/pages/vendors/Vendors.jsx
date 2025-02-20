import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

// Sample vendor data (replace with real data from your API)
const initialVendors = [
  {
    id: 1,
    name: "Vendor One",
    email: "vendorone@example.com",
    phone: "+123456789",
    status: "Active",
    products: 50,
    location: "New York, USA",
    category: "Electronics",
    joinDate: "2022-05-15",
  },
  {
    id: 2,
    name: "Vendor Two",
    email: "vendortwo@example.com",
    phone: "+987654321",
    status: "Inactive",
    products: 30,
    location: "London, UK",
    category: "Clothing",
    joinDate: "2021-11-30",
  },
  {
    id: 3,
    name: "Vendor Three",
    email: "vendorthree@example.com",
    phone: "+1122334455",
    status: "Active",
    products: 100,
    location: "Berlin, Germany",
    category: "Home Appliances",
    joinDate: "2020-08-01",
  },
  {
    id: 4,
    name: "Vendor Four",
    email: "vendorfour@example.com",
    phone: "+2233445566",
    status: "Inactive",
    products: 75,
    location: "Tokyo, Japan",
    category: "Furniture",
    joinDate: "2019-03-10",
  },
  {
    id: 5,
    name: "Vendor Five",
    email: "vendorfive@example.com",
    phone: "+9988776655",
    status: "Active",
    products: 125,
    location: "Paris, France",
    category: "Cosmetics",
    joinDate: "2022-01-22",
  },
  {
    id: 6,
    name: "Vendor Six",
    email: "vendorsix@example.com",
    phone: "+5566778899",
    status: "Active",
    products: 200,
    location: "Los Angeles, USA",
    category: "Sports Equipment",
    joinDate: "2021-07-11",
  },
  {
    id: 7,
    name: "Vendor Seven",
    email: "vendorseven@example.com",
    phone: "+6677889900",
    status: "Inactive",
    products: 60,
    location: "Toronto, Canada",
    category: "Toys",
    joinDate: "2020-06-24",
  },
  {
    id: 8,
    name: "Vendor Eight",
    email: "vendoreight@example.com",
    phone: "+1122336677",
    status: "Active",
    products: 140,
    location: "Sydney, Australia",
    category: "Books",
    joinDate: "2019-12-15",
  },
  {
    id: 9,
    name: "Vendor Nine",
    email: "vendornine@example.com",
    phone: "+9988779900",
    status: "Inactive",
    products: 90,
    location: "Madrid, Spain",
    category: "Stationery",
    joinDate: "2021-05-30",
  },
  {
    id: 10,
    name: "Vendor Ten",
    email: "vendorten@example.com",
    phone: "+7766554433",
    status: "Active",
    products: 250,
    location: "Rome, Italy",
    category: "Kitchenware",
    joinDate: "2023-02-10",
  },
  {
    id: 11,
    name: "Vendor Eleven",
    email: "vendoreleven@example.com",
    phone: "+3344556677",
    status: "Active",
    products: 60,
    location: "Dubai, UAE",
    category: "Jewelry",
    joinDate: "2021-09-17",
  },
  {
    id: 12,
    name: "Vendor Twelve",
    email: "vendortwelve@example.com",
    phone: "+6677881122",
    status: "Inactive",
    products: 110,
    location: "Singapore",
    category: "Footwear",
    joinDate: "2018-04-22",
  },
  {
    id: 13,
    name: "Vendor Thirteen",
    email: "vendorthirteen@example.com",
    phone: "+4555667788",
    status: "Active",
    products: 80,
    location: "Hong Kong",
    category: "Gardening",
    joinDate: "2022-10-05",
  },
  {
    id: 14,
    name: "Vendor Fourteen",
    email: "vendorfourteen@example.com",
    phone: "+7788995544",
    status: "Inactive",
    products: 150,
    location: "Seoul, South Korea",
    category: "Food & Beverages",
    joinDate: "2020-02-14",
  },
  {
    id: 15,
    name: "Vendor Fifteen",
    email: "vendorfifteen@example.com",
    phone: "+1122334455",
    status: "Active",
    products: 220,
    location: "Mumbai, India",
    category: "Beauty Products",
    joinDate: "2021-01-19",
  },
  // More vendors can be added as necessary for testing
];

const Vendors = () => {
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState(initialVendors);
  const [currentPage, setCurrentPage] = useState(0);

  const vendorsPerPage = 6;

  const navigate = useNavigate();

  // Search filter logic
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(search.toLowerCase()) ||
      vendor.email.toLowerCase().includes(search.toLowerCase()) ||
      vendor.status.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Handle "Edit" button click
  const handleEditClick = (id) => {
    navigate(`/dashboard/editVendor/${id}`);
  };

  // Handle "Activate" / "Deactivate" button
  const handleStatusChange = (id) => {
    setVendors(
      vendors.map((vendor) =>
        vendor.id === id
          ? {
              ...vendor,
              status: vendor.status === "Active" ? "Inactive" : "Active",
            }
          : vendor
      )
    );
  };

  // Get the vendors for the current page
  const currentVendors = filteredVendors.slice(
    currentPage * vendorsPerPage,
    (currentPage + 1) * vendorsPerPage
  );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Vendors</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or status"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Vendor Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentVendors.map((vendor) => (
              <tr key={vendor.id} className="border-b">
                <td className="py-3 px-6">{vendor.name}</td>
                <td className="py-3 px-6">{vendor.email}</td>
                <td className="py-3 px-6">{vendor.phone}</td>
                <td className="py-3 px-6">{vendor.products}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      vendor.status === "Active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>
                <td className="py-3 px-6">
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded-full mr-2"
                    onClick={() => handleEditClick(vendor.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${
                      vendor.status === "Active"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    } text-white py-1 px-4 rounded-full`}
                    onClick={() => handleStatusChange(vendor.id)}
                  >
                    {vendor.status === "Active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center items-center space-x-2">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(filteredVendors.length / vendorsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center space-x-2"}
          pageClassName={"page-item"}
          pageLinkClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          }
          previousClassName={"page-item"}
          previousLinkClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          }
          nextClassName={"page-item"}
          nextLinkClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          }
          breakClassName={"page-item"}
          breakLinkClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          }
          activeClassName={"bg-blue-500 text-white"}
        />
      </div>
    </div>
  );
};

export default Vendors;
