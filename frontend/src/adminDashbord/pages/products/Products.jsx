import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useProductStore from "../../../store/productStore";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(4); // Adjust this to how many products you want per page

  const { product, getProducts } = useProductStore();
  const navigate = useNavigate();

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
  }, [getProducts]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `https://sleekstyles.onrender.com/api/products/${productId}`
      );
      await getProducts(); // Re-fetch the products after deletion
      toast.success("Product has been deleted successfully");
    } catch (error) {
      setError("Error deleting product");
    }
  };

  // Calculate the indices for products per page
  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page click for pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

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
              {currentProducts?.map((product) => (
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center space-x-2">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(product?.length / productsPerPage)}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center space-x-2"}
          pageClassName={"page-item"}
          pageLinkClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          }
          previousClassName={"page-item"}
          previousLinkClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          }
          nextClassName={"page-item"}
          nextLinkClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          }
          breakClassName={"page-item"}
          breakLinkClassName={
            "px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          }
          activeClassName={"bg-blue-500 text-white"}
        />
      </div>
      </div>
    </div>
  );
};

export default Products;
