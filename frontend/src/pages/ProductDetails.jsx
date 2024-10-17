import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductsContext } from "../context/ProductContext";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  const { addOneToCart, cartModel, setCartModel} =
    useContext(ProductsContext);

  //loading spinner
  const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  };
  // Fetch product details from the backend
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://sleekstyles.onrender.com/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row">
        {/* Product Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            className="object-cover h-[400px]  rounded-lg"
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 lg:pl-12 mt-6 lg:mt-0">
          <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>
          <p className="text-lg text-gray-700 mb-6">{product.description}</p>
          <div className="text-2xl font-semibold text-gray-900 mb-4">
            ${product.price}
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={() =>
                addOneToCart(
                  id,
                  product.productName,
                  product.price,
                  product.image
                )
              }
            >
              Add to Cart
            </button>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              onClick={() => setCartModel(!cartModel)}
            >
              Pay Now
            </button>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-xl font-semibold mb-2">Product Details:</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Quantity: {product.quantity}</li>
              <li>Category: {product.category}</li>
              <li>
                Available: {product.available ? "In Stock" : "Out of Stock"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
