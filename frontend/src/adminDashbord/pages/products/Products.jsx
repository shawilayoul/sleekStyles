import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useProductStore from "../../../store/productStore";

const Products = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { product, getProducts } = useProductStore();
  console.log(product)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProducts();
      } catch (error) {
        setError("Error fetching products");
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://sleekstyles.onrender.com/api/products/${productId}`
      );
      product.filter((product) => product._id !== productId); // Update UI after deletion
      await getProducts();
      toast.success("Product has been deleted successfully");
    } catch (error) {
      setError("Error deleting product");
    }
  };

  //if (loading) return <p>Loading products...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Image
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Quantity
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
           { Array.isArray(product) ? product?.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-3 px-4">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{product.productName}</td>
                  <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{product.quantity}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">
                    <div
                      onClick={() => navigate(`editProduct/${product._id}`)}
                    ></div>
                    <Link
                      to={`editProduct/${product._id}`}
                      className="text-blue-500 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )):null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
