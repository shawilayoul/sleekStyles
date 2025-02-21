// Sample billing data
const billingData = [
  {
    orderId: "ORD001",
    customerName: "John Doe",
    email: "johndoe@example.com",
    totalAmount: "$150.00",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    orderDate: "2025-02-10",
    shippingAddress: "123 Main St, Springfield, IL, 62701",
    items: [
      { name: "T-shirt", quantity: 2, price: "$25.00" },
      { name: "Jeans", quantity: 1, price: "$50.00" },
    ],
  },
  {
    orderId: "ORD002",
    customerName: "Jane Smith",
    email: "janesmith@example.com",
    totalAmount: "$230.00",
    paymentStatus: "Pending",
    paymentMethod: "PayPal",
    orderDate: "2025-02-15",
    shippingAddress: "456 Elm St, Metropolis, NY, 10001",
    items: [
      { name: "Dress", quantity: 1, price: "$120.00" },
      { name: "Shoes", quantity: 1, price: "$110.00" },
    ],
  },
  {
    orderId: "ORD003",
    customerName: "Alice Johnson",
    email: "alicej@example.com",
    totalAmount: "$89.99",
    paymentStatus: "Paid",
    paymentMethod: "Debit Card",
    orderDate: "2025-02-18",
    shippingAddress: "789 Oak St, Smalltown, TX, 75001",
    items: [
      { name: "Sunglasses", quantity: 1, price: "$45.00" },
      { name: "Hat", quantity: 2, price: "$22.50" },
    ],
  },
  {
    orderId: "ORD004",
    customerName: "Bob Brown",
    email: "bobbrown@example.com",
    totalAmount: "$320.50",
    paymentStatus: "Pending",
    paymentMethod: "Credit Card",
    orderDate: "2025-02-20",
    shippingAddress: "321 Pine St, Lakeside, CA, 92040",
    items: [
      { name: "Laptop Bag", quantity: 1, price: "$120.00" },
      { name: "Wireless Mouse", quantity: 1, price: "$50.00" },
      { name: "Keyboard", quantity: 1, price: "$150.50" },
    ],
  },
];

const Billing = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Billing Dashboard
      </h1>

      <div className="space-y-6">
        {billingData.map((billing) => (
          <div
            key={billing.orderId}
            className="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Order ID: {billing.orderId}
                </h2>
                <p className="text-gray-600">
                  Customer: {billing.customerName}
                </p>
                <p className="text-gray-600">Email: {billing.email}</p>
                <p className="text-gray-600">Order Date: {billing.orderDate}</p>
                <p className="text-gray-600">
                  Shipping Address: {billing.shippingAddress}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-semibold ${
                    billing.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {billing.paymentStatus}
                </p>
                <p className="text-sm text-gray-600">
                  Payment Method: {billing.paymentMethod}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-800">Order Items</h3>
              <table className="w-full mt-2 table-auto">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Item</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {billing.items.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">{item.price}</td>
                      <td className="px-4 py-2">
                        $
                        {(
                          parseFloat(item.price.replace("$", "")) *
                          item.quantity
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Total Amount: {billing.totalAmount}
                </p>
              </div>

              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
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
