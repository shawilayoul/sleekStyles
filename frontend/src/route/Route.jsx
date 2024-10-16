import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayOUt from "../components/AppLayOUt";
import Home from "../pages/home/Home";
import Shop from "../pages/shop/Shop";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Blog from "../pages/blog/Blog";
import SucessURl from "../components/SucessURl";
import Cancel from "../components/Cancel";
import NavBar from "../adminDashbord/components/NavBar";
import SidBar from "../adminDashbord/components/SidBar";
import Settings from "../adminDashbord/pages/settings/Settings";
import AppLayOUtAdmin from "../components/AppLayOUtAdmin";
import SignInPage from "../components/SignInPage";
import SignUpPage from "../components/SignUpPage";
import VerifiyEmail from "../components/VerifiyEmail";
import ForgotPassword from "../components/ForgotPassword";
import ResetPassword from "../components/ResetPassword";
import Dashbord from "../adminDashbord/pages/Dashbord";
import Products from "../adminDashbord/pages/products/Products";
import AddProduct from "../adminDashbord/pages/products/AddProduct";
import EditProduct from "../adminDashbord/pages/products/EditProduct";
import ProductDetail from "../adminDashbord/pages/products/ProductDetail";
import Vendors from "../adminDashbord/pages/vendors/Vendors";
import Customers from "../adminDashbord/pages/customers/Customers";
import AddCustomer from "../adminDashbord/pages/customers/AddCustomer";
import EditCustomer from "../adminDashbord/pages/customers/EditCustomer";
import AddVendor from "../adminDashbord/pages/vendors/AddVendor";
import EditVendor from "../adminDashbord/pages/vendors/EditVendor";
import Billing from "../adminDashbord/pages/billing/Billing";
import AddBilling from "../adminDashbord/pages/billing/AddBilling";
import EditBilling from "../adminDashbord/pages/billing/EditBilling";
import Orders from "../adminDashbord/pages/orders/Orders";
import AddOrder from "../adminDashbord/pages/orders/AddOrder";
import EditOrder from "../adminDashbord/pages/orders/EditOrder";
import Reports from "../adminDashbord/pages/reports/Reports";
import AddReport from "../adminDashbord/pages/reports/AddReport";
import EditReport from "../adminDashbord/pages/reports/EditReport";
import Categories from "../adminDashbord/pages/category/Categories";
import AddCategory from "../adminDashbord/pages/category/AddCategory";
import EditCategory from "../adminDashbord/pages/category/EditCategory";
import ProductDetails from "../pages/ProductDetails";

import useAuthStore from "../store/authStore";
import { useEffect } from "react";

const ProdectedRoute = ({ children }) => {

  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verifyEmail" />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const Effect = () => {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayOUt />,
    children: [
      {
        index: true,
        element: (
          <RedirectAuthenticatedUser>
            <Home />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: "/signUp",
        element: <SignUpPage />,
      },
      {
        path: "/signIn",
        element: <SignInPage />,
      },
      {
        path: "/verifyEmail",
        element: <VerifiyEmail />,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetpassword/:token",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element:
    (
      <AppLayOUtAdmin />
    ),
    children: [
      {
        index: true,
        element: 
            <Dashbord />
      },

      {
        path: "navBar",
        element: <NavBar />,
      },
      {
        path: "sidBar",
        element: <SidBar />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "addProduct",
        element: <AddProduct />,
      },
      {
        path: "products/editProduct/:productId",
        element: <EditProduct />,
      },
      {
        path: "productDetail",
        element: <ProductDetail />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "addCustomer",
        element: <AddCustomer />,
      },
      {
        path: "editCustomer",
        element: <EditCustomer />,
      },
      {
        path: "vendors",
        element: <Vendors />,
      },
      {
        path: "addVendor",
        element: <AddVendor />,
      },
      {
        path: "editVendor",
        element: <EditVendor />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "addBilling",
        element: <AddBilling />,
      },
      {
        path: "editBilling",
        element: <EditBilling />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "addOrder",
        element: <AddOrder />,
      },
      {
        path: "editOrder",
        element: <EditOrder />,
      },
      {
        path: "report",
        element: <Reports />,
      },
      {
        path: "addReport",
        element: <AddReport />,
      },
      {
        path: "editReport",
        element: <EditReport />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "addCategory",
        element: <AddCategory />,
      },
      {
        path: "editCategory",
        element: <EditCategory />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },

  {
    path: "/checkout-success",
    element: <SucessURl />,
  },
  {
    path: "/checkout-cancel",
    element: <Cancel />,
  },
]);

export default router;
