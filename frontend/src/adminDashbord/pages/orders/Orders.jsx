// Sample order data
const orders = [
  {
    orderId: 'ORD001',
    customerName: 'John Doe',
    orderDate: '2025-02-10',
    totalAmount: '$150.00',
    status: 'Shipped',
    items: [
      { name: 'T-shirt', quantity: 2, price: '$25.00' },
      { name: 'Jeans', quantity: 1, price: '$50.00' },
    ],
  },
  {
    orderId: 'ORD002',
    customerName: 'Jane Smith',
    orderDate: '2025-02-12',
    totalAmount: '$230.00',
    status: 'Pending',
    items: [
      { name: 'Dress', quantity: 1, price: '$120.00' },
      { name: 'Shoes', quantity: 1, price: '$110.00' },
    ],
  },
  {
    orderId: 'ORD003',
    customerName: 'Mark Johnson',
    orderDate: '2025-02-14',
    totalAmount: '$320.00',
    status: 'Delivered',
    items: [
      { name: 'Jacket', quantity: 1, price: '$150.00' },
      { name: 'Boots', quantity: 2, price: '$85.00' },
    ],
  },
];

const Orders = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Order Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Customer Name</th>
              <th className="px-6 py-4 text-left">Order Date</th>
              <th className="px-6 py-4 text-left">Total Amount</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{order.orderId}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4">{order.orderDate}</td>
                <td className="px-6 py-4">{order.totalAmount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      order.status === 'Shipped'
                        ? 'bg-blue-500'
                        : order.status === 'Pending'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mr-2">
                    View Details
                  </button>
                  {order.status === 'Pending' && (
                    <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                      Mark as Shipped
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
