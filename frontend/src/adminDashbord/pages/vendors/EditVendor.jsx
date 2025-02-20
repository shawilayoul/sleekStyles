import { useState, useEffect } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';

// Sample vendor data (replace with real data from your API)
const initialVendors = [
  { id: 1, name: 'Vendor One', email: 'vendorone@example.com', phone: '+123456789', status: 'Active', products: 50 },
  { id: 2, name: 'Vendor Two', email: 'vendortwo@example.com', phone: '+987654321', status: 'Inactive', products: 30 },
  // Add more vendors for testing
];

const VendorEdit = () => {
  const { id } = useParams();

    const navigate = useNavigate();
  
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const selectedVendor = initialVendors.find((v) => v.id === parseInt(id));
    setVendor(selectedVendor);
  }, [id]);

  const handleSave = () => {
    navigate('/dashboard/vendors'); // Redirect to the Vendors page after saving
  };

  if (!vendor) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Vendor</h1>

      <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
        <form>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Vendor Name</label>
            <input
              type="text"
              value={vendor.name}
              onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={vendor.email}
              onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Phone</label>
            <input
              type="text"
              value={vendor.phone}
              onChange={(e) => setVendor({ ...vendor, phone: e.target.value })}
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Products Supplied</label>
            <input
              type="number"
              value={vendor.products}
              onChange={(e) => setVendor({ ...vendor, products: e.target.value })}
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Status</label>
            <select
              value={vendor.status}
              onChange={(e) => setVendor({ ...vendor, status: e.target.value })}
              className="px-4 py-2 border rounded-lg w-full"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => history.push('/vendors')}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorEdit;
