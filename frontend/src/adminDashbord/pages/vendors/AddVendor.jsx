import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVendor = () => {
  const [vendorDetails, setVendorDetails] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    products: 0,
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate adding vendor (you would typically make an API call here)
    console.log("New Vendor Details:", vendorDetails);

    // Redirect to another page after adding the vendor
    navigate("/dashboard/vendors");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Vendor</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold">Vendor Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={vendorDetails.name}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg w-full"
            placeholder="Enter vendor name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={vendorDetails.email}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg w-full"
            placeholder="Enter email address"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-lg font-semibold">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={vendorDetails.phone}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg w-full"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-lg font-semibold">Status</label>
          <select
            id="status"
            name="status"
            value={vendorDetails.status}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg w-full"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="products" className="block text-lg font-semibold">Number of Products</label>
          <input
            type="number"
            id="products"
            name="products"
            value={vendorDetails.products}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg w-full"
            placeholder="Enter number of products"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg w-full"
          >
            Add Vendor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVendor;
