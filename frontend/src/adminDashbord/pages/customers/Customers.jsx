import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Customers = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const customersPerPage = 5; // Number of customers per page

  const customers = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', totalSpent: '$250.00', itemsBought: 5 },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', totalSpent: '$190.00', itemsBought: 3 },
    { id: 3, name: 'Mark Johnson', email: 'markjohnson@example.com', totalSpent: '$320.00', itemsBought: 7 },
    { id: 4, name: 'Emily Davis', email: 'emilydavis@example.com', totalSpent: '$400.00', itemsBought: 8 },
    { id: 5, name: 'Chris Brown', email: 'chrisbrown@example.com', totalSpent: '$150.00', itemsBought: 4 },
    { id: 6, name: 'Sarah Wilson', email: 'sarahwilson@example.com', totalSpent: '$500.00', itemsBought: 10 },
    { id: 7, name: 'David Lee', email: 'davidlee@example.com', totalSpent: '$220.00', itemsBought: 6 },
    { id: 8, name: 'Jessica Taylor', email: 'jessicataylor@example.com', totalSpent: '$180.00', itemsBought: 3 },
    { id: 9, name: 'James Moore', email: 'jamesmoore@example.com', totalSpent: '$275.00', itemsBought: 5 },
    { id: 10, name: 'Sophia Harris', email: 'sophiaharris@example.com', totalSpent: '$150.00', itemsBought: 2 },
    // Add more customers as needed
  ];

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastCustomer = (currentPage + 1) * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Update the current page when user clicks on pagination controls
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Customer Information</h1>

      <input
        type="text"
        className="w-full max-w-md mx-auto mb-6 p-3 border border-gray-300 rounded-md"
        placeholder="Search by customer name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Customer Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Items Bought</th>
              <th className="px-6 py-4 text-left">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.itemsBought}</td>
                <td className="px-6 py-4">{customer.totalSpent}</td>
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
          pageCount={Math.ceil(filteredCustomers.length / customersPerPage)}
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

export default Customers;
