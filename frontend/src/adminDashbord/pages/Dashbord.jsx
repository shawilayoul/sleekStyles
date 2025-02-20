import { Line, Bar, Pie } from "react-chartjs-2"; // For chart rendering
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  // Example data for charts
  const salesData = {
    labels: ["January", "February", "March", "April", "May", "June","July"],
    datasets: [
      {
        label: "Sales Revenue",
        data: [1200, 1900, 1300, 2300, 1700, 2000,1500],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const orderStatusData = {
    labels: ["Completed", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Orders Status",
        data: [60, 30, 10],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
        hoverOffset: 4,
      },
    ],
  };

  const productCategoryData = {
    labels: ["Men", "Women", "Kids"],
    datasets: [
      {
        label: "Revenue by Category",
        data: [5000, 8000, 3000],
        backgroundColor: ["#FF6347", "#FFD700", "#98FB98"],
      },
    ],
  };

  const customerData = {
    labels: ["New Customers", "Returning Customers"],
    datasets: [
      {
        label: "Customer Retention",
        data: [40, 60],
        backgroundColor: ["#42A5F5", "#66BB6A"],
      },
    ],
  };

  /*const trafficData = {
    labels: ["Direct", "Organic", "Referral", "Social Media", "Paid Search"],
    datasets: [
      {
        label: "Website Traffic Source",
        data: [50, 30, 10, 5, 5],
        backgroundColor: [
          "#FF5722",
          "#FF9800",
          "#9C27B0",
          "#3F51B5",
          "#009688",
        ],
      },
    ],
  };
*/
 /* const marketingData = {
    labels: ["Email Campaign", "Discount Promo", "Social Media Ads"],
    datasets: [
      {
        label: "Marketing Campaigns Performance",
        data: [800, 1200, 600],
        backgroundColor: ["#4CAF50", "#FFEB3B", "#2196F3"],
      },
    ],
  };
*/
  // Additional data for Other Analytics
  const inventoryData = {
    labels: ["T-Shirts", "Jeans", "Dresses", "Shoes", "Accessories"],
    datasets: [
      {
        label: "Stock Levels",
        data: [200, 150, 100, 80, 50],
        backgroundColor: [
          "#FF6347",
          "#FFD700",
          "#98FB98",
          "#42A5F5",
          "#9C27B0",
        ],
      },
    ],
  };

  const customerDemographicsData = {
    labels: ["18-24", "25-34", "35-44", "45+"],
    datasets: [
      {
        label: "Customer Age Groups",
        data: [30, 40, 20, 10],
        backgroundColor: ["#FF5722", "#FF9800", "#9C27B0", "#3F51B5"],
      },
    ],
  };

  const abandonedCartData = {
    labels: [
      "High Shipping Costs",
      "Changed Mind",
      "Found Cheaper",
      "Checkout Issues",
    ],
    datasets: [
      {
        label: "Abandoned Cart Reasons",
        data: [40, 30, 20, 10],
        backgroundColor: ["#FF6347", "#FFD700", "#98FB98", "#42A5F5"],
      },
    ],
  };

  const returnTrendsData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Return Trends",
        data: [50, 60, 70, 65, 75, 80],
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  const shippingPerformanceData = {
    labels: ["On Time", "Delayed", "Cancelled"],
    datasets: [
      {
        label: "Shipping Performance",
        data: [85, 10, 5],
        backgroundColor: ["#4CAF50", "#FF9800", "#F44336"],
      },
    ],
  };

  /*const socialMediaData = {
    labels: ["Instagram", "Facebook", "Twitter", "Pinterest"],
    datasets: [
      {
        label: "Social Media Engagement",
        data: [500, 300, 200, 100],
        backgroundColor: ["#E1306C", "#4267B2", "#1DA1F2", "#E60023"],
      },
    ],
  };*/

  return (
    <div className="admin-dashboard p-6 bg-gray-100 min-h-screen">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Overview */}
        <section className="sales-overview bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Sales Overview
          </h2>
          <Line data={salesData} />
        </section>

        {/* Order Status */}
        <section className="order-status bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Status
          </h2>
          <Pie data={orderStatusData} />
        </section>

        {/* Revenue by Category */}
        <section className="product-category bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Revenue by Category
          </h2>
          <Bar data={productCategoryData} />
        </section>

        {/* Customer Analytics */}
        <section className="customer-analytics bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Customer Analytics
          </h2>
          <Pie data={customerData} />
        </section>

        {/* Traffic Analytics 
        <section className="traffic-analytics bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Traffic Analytics</h2>
          <Bar data={trafficData} />
        </section>*/}

        {/* Marketing Performance 
        <section className="marketing-performance bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Marketing Campaigns Performance</h2>
          <Pie data={marketingData} />
        </section>*/}
        <section className="traffic-analytics bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Inventory Analytics
          </h3>
          <Bar data={inventoryData} />
        </section>
        {/* Customer Demographics */}
        <section className="traffic-analytics bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Customer Demographics
          </h3>
          <Pie data={customerDemographicsData} />
        </section>
        {/* Abandoned Cart Analytics */}
        <section className="traffic-analytics bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Abandoned Cart Analytics
          </h3>
          <Pie data={abandonedCartData} />
        </section>
        {/* Return Trends */}
        <section className="traffic-analytics bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Return Trends
          </h3>
          <Line data={returnTrendsData} />
        </section>
        {/* Shipping Performance */}
        <section className="traffic-analytics bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Shipping Performance
          </h3>
          <Pie data={shippingPerformanceData} />
        </section>
        {/* Social Media Engagement 
        <section className="traffic-analytics bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">
            Social Media Engagement
          </h3>
          <Bar data={socialMediaData} />
        </section>*/}
        {/* Other Analytics */}
      </div>
    </div>
  );
};

export default Dashboard;
