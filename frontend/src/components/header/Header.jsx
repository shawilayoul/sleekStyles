import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CardElement } from "@stripe/react-stripe-js";
import { Link, useNavigate } from "react-router-dom";
import { FaUser} from "react-icons/fa";
import { useContext, useState } from "react";
import { ProductsContext } from "../../context/ProductContext";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const Header = () => {
  const [cartModel, setCartModel] = useState(false);
  const [checkOutModel, setCheckoutModel] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const {
    productsInCart,
    getTotalCost,
    deleteFromCart,
    addOneToCart,
    removerOneFromCart,
    clearCart,
  } = useContext(ProductsContext);

  // get the total qauntity
  const totatlQauntity = productsInCart.reduce(
    (sum, acc) => sum + acc.qauntity,
    0
  );
  // make the ayment method
  const stripe = useStripe();
  const elements = useElements();

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: "Jenny Rosen",
        email: "shawil@gmail.com",
        phone: "07 8237 11 77",
      },
    });

    if (error) {
      console.log(error);
      setLoading(false); // Reset loading state if there's an error
    } else {
      console.log(paymentMethod);
      // Send the paymentMethod.id to your backend for processing
      const response = await axios.post(
        "https://sleekstyles.onrender.com/create-checkout/",
        {
          amount: getTotalCost() * 1000,
          paymentMethodId: paymentMethod.id,
        }
      );
      if (response.data.success) {
        console.log("payment success");

        // Clear the cart by calling clearCart from the ProductsContext
        clearCart();

        // Close the checkout modal and navigate to the success page
        setCheckoutModel(false); // Close the checkout modal
        navigate("/checkout-success");

        // Optionally, reset the cart modal as well
        setCartModel(false);
      } else {
        console.error("Payment failed, try again.");
        setLoading(false); // Reset loading state in case of failure
      }
    }
  };

  const menu = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Shop",
      link: "/shop",
    },

    {
      id: 3,
      name: "Blog",
      link: "/blog",
    },
    { id: 4, name: "About", link: "/about" },
    { id: 5, name: "Contact", link: "/contact" },
  ];
  return (
    <header className="bg-gray-800 text-white z-20 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  h-16">
          {/* Logo Section */}
          <div className="hidden flex-shrink-0 md:flex items-center">
            <a href="/" className="md:text-2xl font-bold text-xl">
              SleekStyles
            </a>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="outline-none focus:outline-none text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
          {/* Navigation Links - hidden on small screens */}
          <ul className="hidden md:flex space-x-8 items-center">
            {menu.map(({ id, name, link }) => (
              <li key={id} className="hover:bg-blue-700 px-3 py-2 rounded-md">
                <Link to={link} className="link">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          {/* search btn cart profile */}
          <div className="right flex items-center gap-10 ms:gap-2">
            <div className="user cursor-pointer">
              <FaUser className="icons" onClick={() => navigate("/signup")} />
            </div>
            <div className="relative">
              <div className="cart-container flex items-center">
                <div
                  onClick={() => setCartModel(!cartModel)}
                  className="cursor-pointer flex items-center"
                >
                  {/* Cart Icon and Total Quantity */}
                  <div className="cart-item bg-gray-200 text-gray-800 px-4 py-2 rounded-full flex items-center justify-center">
                    <p className="font-bold">{totatlQauntity}</p>
                  </div>
                  <FaShoppingCart className="text-2xl text-white ml-2 " />
                </div>

                {/* Cart Model */}
                {cartModel && (
                  <div className="cartModel absolute top-full right-0 bg-white shadow-lg rounded-lg mt-4 w-80 md:w-96 p-4">
                    {/* Items in Cart */}
                    {totatlQauntity > 0 ? (
                      <div className="items space-y-4">
                        {productsInCart.map(
                          ({ id, name, price, image, qauntity }) => (
                            <div
                              key={id}
                              className="item flex items-center justify-between"
                            >
                              {/* Item Info */}
                              <div className="item1 flex items-center space-x-4">
                                <img
                                  className="w-16 h-16 object-cover rounded-lg"
                                  src={image}
                                  alt={name}
                                />
                                <div>
                                  <h4 className="font-semibold">{name}</h4>
                                  <p className="text-sm text-gray-500">
                                    ${price}
                                  </p>
                                </div>
                              </div>

                              {/* Quantity Controls */}
                              <div className="item2 flex items-center space-x-2">
                                <button
                                  className="px-2 py-1 bg-gray-700 text-white rounded-md"
                                  onClick={() => addOneToCart(id)}
                                >
                                  +
                                </button>
                                <p className="font-bold">{qauntity}</p>
                                <button
                                  className="px-2 py-1 bg-gray-700 text-white rounded-md"
                                  onClick={() => removerOneFromCart(id)}
                                >
                                  -
                                </button>
                                <MdDelete
                                  className="text-red-500 text-xl cursor-pointer"
                                  onClick={() => deleteFromCart(id)}
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p className="text-red-500 text-center mt-4">
                        There are no items in the cart, add some.
                      </p>
                    )}

                    {/* Total and Checkout Button */}
                    {totatlQauntity > 0 && (
                      <div className="mt-4">
                        <p className="total font-bold text-lg text-gray-700">
                          Total: ${getTotalCost()}
                        </p>
                        <button
                          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => {
                            setCheckoutModel(!checkOutModel);
                            setCartModel(!cartModel);
                          }}
                        >
                          Checkout
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Checkout Form */}
                {checkOutModel && (
                  <form
                    onSubmit={handleStripePayment}
                    className="ChackoutForm absolute top-full right-0 bg-white shadow-lg rounded-lg mt-4 w-80 md:w-96 p-4 space-y-1"
                  >
                    {/* Email Field */}
                    <div className="space-y-1">
                      <p className="font-bold">E-mail</p>
                      <input
                        type="email"
                        placeholder="Enter your Email"
                        className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
                        required
                      />
                    </div>

                    {/* Card Information */}
                    <div className="space-y-1">
                      <p className="font-bold">Card Information</p>
                      <CardElement
                        className="border p-2 rounded-md border-gray-300"
                        required
                      />
                    </div>

                    {/* Billing Address - Street */}
                    <div className="space-y-1">
                      <p className="font-bold">Street Address</p>
                      <input
                        type="text"
                        placeholder="Enter your street address"
                        className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
                        required
                      />
                    </div>

                    {/* Billing Address - City */}
                    <div className="space-y-1">
                      <p className="font-bold">City</p>
                      <input
                        type="text"
                        placeholder="Enter your city"
                        className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
                        required
                      />
                    </div>

                    {/* Billing Address - State/Province */}
                    <div className="space-y-1">
                      <p className="font-bold">State/Province</p>
                      <input
                        type="text"
                        placeholder="Enter your state or province"
                        className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1">
                      <p className="font-bold">Phone Number</p>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
                        required
                      />
                    </div>

                    {/* Postal Code */}
                    <div className="space-y-1">
                      <p className="font-bold">Postal Code</p>
                      <input
                        type="text"
                        placeholder="Postal code"
                        className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
                        required
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-1 flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mr-2"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600">
                        I agree to the{" "}
                        <a href="/terms" className="text-blue-500">
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a href="/privacy-policy" className="text-blue-500">
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-between space-x-2 mt-4">
                      <button
                        type="button"
                        className="w-1/2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => setCheckoutModel(!checkOutModel)}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="w-1/2 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : "Pay Now"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gray-400">
          {menu.map(({ id, name, link }) => (
            <li key={id} className="block px-4 py-2 text-sm hover:bg-blue-700">
              <Link
                to={link}
                className="link"
                onClick={() => setIsOpen(!isOpen)}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};
export default Header;
