import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useProductStore from "../../../store/productStore";
import ReactPaginate from "react-paginate";

const Products = () => {
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [productsPerPage] = useState(4);
  const [filterValue, setFilterValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { product, getProducts } = useProductStore();

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

  // Filter products by category and search by subcategory
  const filterProducts = () => {
    if (!product) return []; // Ensure product is defined

    let filteredProducts = product;

    // Filter by category and subcategory
    if (filterValue) {
      const [category, subcategory] = filterValue.split("/");
      filteredProducts = filteredProducts.filter((product) => {
        if (category && !subcategory) {
          return product.category === category;
        }
        if (category && subcategory) {
          return (
            product.category === category && product.subcategory === subcategory
          );
        }
        return true;
      });
    }

    // Search by product name (case-insensitive)
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredProducts || [];
  };

  // Calculate the indices for products per page

  const filteredProducts = filterProducts();
  const indexOfLastProduct = (currentPage + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Array.isArray(filteredProducts)
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

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

  // Handle page click for pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Product List</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Filter and Search Section */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setFilterValue(e.target.value); // Reset filter value when category changes
            }}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>

          {/* Search by Subcategory */}
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-grow"
          />
        </div>

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
                  Subcategory
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
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        product.quantity > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>{" "}
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.subcategory}</td>
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
        <div className="mt-4 flex justify-center items-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
            onPageChange={handlePageClick}
            containerClassName={
              "flex flex-wrap justify-center items-center gap-2"
            }
            pageClassName={"page-item"}
            pageLinkClassName={
              "px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-sm sm:text-base"
            }
            previousClassName={"page-item"}
            previousLinkClassName={
              "px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-sm sm:text-base"
            }
            nextClassName={"page-item"}
            nextLinkClassName={
              "px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-sm sm:text-base"
            }
            breakClassName={"page-item"}
            breakLinkClassName={
              "px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 text-sm sm:text-base"
            }
            activeClassName={"active-page"}
            activeLinkClassName={"active-page-link"}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
