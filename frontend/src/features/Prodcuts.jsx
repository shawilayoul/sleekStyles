import { useContext, useState } from "react";
import { ProductsContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { filterProducts, setFilterValue, addOneToCart } =
    useContext(ProductsContext);

  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  const handelSelectedFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setFilterValue(e.target.value);
  };

  return (
    <>
      <h3 className="title text-2xl md:text-3xl font-bold text-center my-6 text-gray-800">
        Our Products
      </h3>
      <section className="products">
        <div className="filter flex justify-center space-x-4 mb-6">
          {["all", "men", "women", "kids"].map((filter) => (
            <button
              key={filter}
              value={filter}
              onClick={handelSelectedFilterChange}
              className={`px-4 py-2 rounded-lg font-semibold ${
                selectedFilter === filter ? "bg-green-500" : "bg-blue-800"
              } text-white`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filterProducts?.map(({ _id, productName, price, image }) => (
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
      </section>
    </>
  );
};

export default Products;
