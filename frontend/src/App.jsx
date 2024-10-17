import router from "./route/Route";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51PcwcKHJQxQ42hCcM0rwQ4qHQ08ilzH3sQU1olBUcjBTLz5kGajoMBXprfGHP98L6PS6kmvyAK1Rb7WuOplqjQwN00gjJSQP1S"
  );
  return (
    <div className="bg-gray-100">
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
        <Toaster/>
      </Elements>
    </div>
  );
};

export default App;
