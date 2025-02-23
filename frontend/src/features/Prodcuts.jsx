import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { filterProducts, setFilterValue, addOneToCart } =
    useContext(ProductsContext);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSubFilter, setSelectedSubFilter] = useState(""); // New state for subcategory filter
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Handle category filter change
  const handleSelectedFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setSelectedSubFilter(""); // Reset subcategory filter
    setFilterValue(e.target.value === "all" ? "" : e.target.value); // Set filterValue
  };
  // Handle subcategory filter change
  const handleSelectedSubFilterChange = (e) => {
    setSelectedSubFilter(e.target.value);
    setFilterValue(`${selectedFilter}/${e.target.value}`); // Set filterValue
  };

  // Calculate index of the first and last products on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Get the products for the current page
  const currentProducts = (filterProducts || []).slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  // Define subcategories based on the selected category
  const getSubcategories = () => {
    switch (selectedFilter) {
      case "men":
        return ["T-Shirts", "Jeans", "Shoes", "Accessories"];
      case "women":
        return ["Dresses", "Jeans", "Shoes", "Accessories"];
      case "kids":
        return ["T-Shirts", "Dresses", "Shoes"];
      default:
        return [];
    }
  };

  return (
    <>
      <h3 className="title text-2xl md:text-3xl font-bold text-center my-6 text-gray-800">
        Our Products
      </h3>
      <section className="products">
        {/* Category Filter */}
        {/* Category Filter */}
        <div className="filter flex flex-wrap justify-center gap-2 mb-6">
          {["all", "men", "women", "kids"].map((filter) => {
            // Check for valid filter value
            if (!filter || typeof filter !== "string") return null;

            return (
              <button
                key={filter}
                value={filter}
                onClick={handleSelectedFilterChange}
                className={`px-3 py-2 rounded-lg font-semibold text-sm sm:text-base ${
                  selectedFilter === filter ? "bg-green-500" : "bg-blue-800"
                } text-white`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Subcategory Filter */}
        {selectedFilter !== "all" && (
          <div className="filter flex flex-wrap justify-center gap-2 mb-6">
            {getSubcategories().map((sub) => (
              <button
                key={sub}
                value={sub.toLowerCase()}
                onClick={handleSelectedSubFilterChange}
                className={`px-3 py-2 rounded-lg font-semibold text-sm sm:text-base ${
                  selectedSubFilter === sub.toLowerCase()
                    ? "bg-green-500"
                    : "bg-blue-800"
                } text-white`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {currentProducts?.map(({ _id, productName, price, image }) => (
            <div className="item bg-white shadow-md p-4 rounded-lg" key={_id}>
              <img
                src={image}
                alt={productName}
                className="w-full h-64 object-cover rounded-t-lg cursor-pointer"
                onClick={() => navigate(`/productDetails/${_id}`)}
              />
              <div className="p-2">
                <h4 className="text-lg font-semibold text-gray-800">
                  {productName}
                </h4>
                <p className="text-gray-600">$ {price}</p>
                <button
                  onClick={() => addOneToCart(_id, productName, price, image)}
                  className="mt-2 w-full bg-green-500 text-white py-2 rounded-lg"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        {/* Pagination controls */}
        <div className="pagination flex flex-wrap justify-center items-center gap-2 mt-6">
          {/* Previous button */}
          <button
            className="px-3 py-2 bg-blue-800 text-white rounded-lg text-sm sm:text-base"
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page numbers */}
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              className={`px-3 py-2 rounded-lg font-semibold text-sm sm:text-base ${
                currentPage === number + 1 ? "bg-green-500" : "bg-blue-800"
              } text-white`}
              onClick={() => handlePageChange(number + 1)}
            >
              {number + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            className="px-3 py-2 bg-blue-800 text-white rounded-lg text-sm sm:text-base"
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
};

export default Products;
