// Sample billing data
const billingData = [
  {
    orderId: 'ORD001',
    customerName: 'John Doe',
    email: 'johndoe@example.com',
    totalAmount: '$150.00',
    paymentStatus: 'Paid',
    paymentMethod: 'Credit Card',
    orderDate: '2025-02-10',
    items: [
      { name: 'T-shirt', quantity: 2, price: '$25.00' },
      { name: 'Jeans', quantity: 1, price: '$50.00' },
    ],
  },
  {
    orderId: 'ORD002',
    customerName: 'Jane Smith',
    email: 'janesmith@example.com',
    totalAmount: '$230.00',
    paymentStatus: 'Pending',
    paymentMethod: 'PayPal',
    orderDate: '2025-02-15',
    items: [
      { name: 'Dress', quantity: 1, price: '$120.00' },
      { name: 'Shoes', quantity: 1, price: '$110.00' },
    ],
  },
];

const Billing = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Billing Information</h1>

      <div className="space-y-6">
        {billingData.map((billing) => (
          <div
            key={billing.orderId}
            className="bg-white shadow-lg rounded-lg p-6 mb-6"
          >
            <h2 className="text-xl font-semibold">Order ID: {billing.orderId}</h2>
            <p className="text-gray-600">Customer: {billing.customerName}</p>
            <p className="text-gray-600">Email: {billing.email}</p>
            <p className="text-gray-600">Order Date: {billing.orderDate}</p>

            <div className="mt-4">
              <h3 className="text-lg font-medium">Items:</h3>
              <table className="w-full mt-2 table-auto">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {billing.items.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">Total Amount: {billing.totalAmount}</p>
                <p className="text-sm text-gray-600">Payment Status: {billing.paymentStatus}</p>
                <p className="text-sm text-gray-600">Payment Method: {billing.paymentMethod}</p>
              </div>

              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Download Invoice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Billing;
