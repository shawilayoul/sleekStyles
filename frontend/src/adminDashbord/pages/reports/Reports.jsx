import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the sales report
const salesData = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 2100 },
  { name: 'Wed', sales: 1500 },
  { name: 'Thu', sales: 1800 },
  { name: 'Fri', sales: 2200 },
  { name: 'Sat', sales: 3000 },
  { name: 'Sun', sales: 2700 },
];

const Reports = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sales Report Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold">Sales Report</h2>
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
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Report Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold">Revenue Report</h2>
          <p className="text-gray-600 mt-2">Total revenue generated in the last 3 months.</p>
          <div className="mt-4">
            <p className="text-xl font-bold">$12,000</p>
            <p className="text-sm text-gray-500">Last 3 Months</p>
          </div>
        </div>

        {/* Order Status Report Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
          <h2 className="text-2xl font-semibold">Order Status Report</h2>
          <p className="text-gray-600 mt-2">Breakdown of order statuses this week.</p>
          <div className="mt-4">
            <p className="text-xl font-bold">80 Orders</p>
            <p className="text-sm text-gray-500">This Week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
