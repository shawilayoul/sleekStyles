import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Sample data for the sales report
const salesData = [
  { name: 'Mon', sales: 1200, revenue: 800, orders: 15 },
  { name: 'Tue', sales: 2100, revenue: 1200, orders: 22 },
  { name: 'Wed', sales: 1500, revenue: 900, orders: 18 },
  { name: 'Thu', sales: 1800, revenue: 1100, orders: 20 },
  { name: 'Fri', sales: 2200, revenue: 1300, orders: 25 },
  { name: 'Sat', sales: 3000, revenue: 1800, orders: 30 },
  { name: 'Sun', sales: 2700, revenue: 1600, orders: 28 },
];

// Sample data for order status breakdown
const orderStatusData = [
  { name: 'Completed', value: 60 },
  { name: 'Pending', value: 20 },
  { name: 'Cancelled', value: 10 },
  { name: 'Refunded', value: 10 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Reports = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Weekly Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sales Report Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold text-gray-800">Sales Report</h2>
          <p className="text-gray-600 mt-2">Sales data for the last 7 days.</p>

          {/* Sales Chart */}
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Report Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold text-gray-800">Revenue Report</h2>
          <p className="text-gray-600 mt-2">Revenue generated in the last 7 days.</p>

          {/* Revenue Chart */}
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Report Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold text-gray-800">Order Status Report</h2>
          <p className="text-gray-600 mt-2">Breakdown of order statuses this week.</p>

          {/* Order Status Chart */}
          <div className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Metrics Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Total Sales */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-gray-800">Total Sales</h2>
          <p className="text-3xl font-bold mt-2 text-gray-800">$15,500</p>
          <p className="text-sm text-gray-600">Last 7 Days</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-gray-800">Total Revenue</h2>
          <p className="text-3xl font-bold mt-2 text-gray-800">$9,200</p>
          <p className="text-sm text-gray-600">Last 7 Days</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-gray-800">Total Orders</h2>
          <p className="text-3xl font-bold mt-2 text-gray-800">158</p>
          <p className="text-sm text-gray-600">Last 7 Days</p>
        </div>

        {/* Average Order Value */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-xl font-semibold text-gray-800">Avg. Order Value</h2>
          <p className="text-3xl font-bold mt-2 text-gray-800">$98.10</p>
          <p className="text-sm text-gray-600">Last 7 Days</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;