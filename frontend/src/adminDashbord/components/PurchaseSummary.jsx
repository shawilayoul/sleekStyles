import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const data = [
  { month: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { month: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { month: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { month: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { month: "May", uv: 1890, pv: 4800, amt: 2181 },
  { month: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { month: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];
const PurchaseSummary = () => {
  return (
    <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 shadow-md">
      <h2 className=" border p-2 font-bold bg-blue-100">Purchase Summary</h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PurchaseSummary;
