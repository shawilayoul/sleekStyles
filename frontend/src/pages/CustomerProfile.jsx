import { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

const CustomerProfile = () => {

  const { user, logout } = useAuthStore(); // Add logout function from the auth store

    const navigate = useNavigate();

  
  const handleLogout = () => {
    logout(); 
    navigate('/')
  };
  const [customerInfo, setCustomerInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Springfield, IL',
    orderHistory: [
      { orderId: '12345', date: '2025-01-15', status: 'Delivered' },
      { orderId: '12346', date: '2025-02-10', status: 'Shipped' },
    ],
    wishlist: ['Red Hoodie', 'Blue Jeans'],
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">Welcome {user?.username}</h1>

        {/* Personal Information Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600"><strong>Name:</strong> {user?.username}</p>
              <p className="text-gray-600"><strong>Email:</strong> {user?.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {customerInfo.phone}</p>
              <p className="text-gray-600"><strong>Shipping Address:</strong> {customerInfo.address}</p>
            </div>
          </div>
        </section>

        {/* Order History Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Order History</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-3">
              {customerInfo.orderHistory.map((order, index) => (
                <li key={index} className="p-4 border-b border-gray-200">
                  <p className="text-gray-700"><strong>Order ID:</strong> {order.orderId}</p>
                  <p className="text-gray-700"><strong>Date:</strong> {order.date}</p>
                  <p className="text-gray-700"><strong>Status:</strong> {order.status}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Wishlist Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Wishlist</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-2">
              {customerInfo.wishlist.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Update Info Button */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
          >
            logOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
