import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import { shopSlideDAta } from "../../constant/data";
import { useContext, useState } from "react";
import { ProductsContext } from "../../context/ProductContext.jsx";
import ChiffreSection from "../../features/ChiffreSection.jsx";
import Products from "../../features/Prodcuts.jsx";

const Shop = () => {
  const [priceRate, setPriceRate] = useState(0);
  const { setFilterValue, filterValue } = useContext(ProductsContext);

  return (
    <div className="shop-container py-8">
      <section className="shop-top flex flex-col md:flex-row gap-8 px-4">
        {/* Left Section - Slider */}
        <div className="shop-right w-full md:w-3/4">
          <section className="shop-slider mb-8 h-[600px] md:h-[800px]">
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={true}
              loop={true}
              pagination={{ clickable: true }}
            >
              {shopSlideDAta.map(({ id, title, description, image }) => (
                <SwiperSlide key={id}>
                  <div className="slider flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 h-full">
                    {/* Left Image */}
                    <div className="left w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                      <img
                        className="w-full h-[350px] md:h-[500px] object-cover rounded-lg"
                        src={image}
                        alt={title}
                      />
                    </div>

                    {/* Middle Content */}
                    <div className="middle w-full md:w-1/3 text-center px-4">
                      <h2 className="text-xl md:text-3xl font-bold mb-4">
                        {title}
                      </h2>
                      <p className="text-gray-600">{description}</p>
                      <div className="shop-btn mt-4">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                          Shop Now
                        </button>
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="right w-full md:w-1/3  mt-6 md:mt-0 hidden md:block">
                      <img
                        className="w-full h-[350px] md:h-[500px] object-cover rounded-lg"
                        src={image}
                        alt={title}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>

        {/* Right Section - Filters */}
        <div className="shop-left w-full md:w-1/4 bg-white shadow-lg rounded-lg p-6">
          {/* Categories */}
          <h3 className="text-2xl font-semibold mb-4">Categories</h3>
          <div className="select-section space-y-4">
            {["Men", "Women", "Kids", "Top Sellers"].map((category) => (
              <div className="select-item" key={category}>
                <label
                  className="block mb-1 font-medium text-gray-700"
                  htmlFor={category.toLowerCase()}
                >
                  {category}
                </label>
                <select className="w-full border-gray-300 rounded-lg p-2">
                  <option value="">Sweaters & Knits</option>
                  <option value="">Jackets & Coats</option>
                  <option value="">Shorts</option>
                </select>
              </div>
            ))}
          </div>

          {/* Colors */}
          <div className="color mt-8">
            <h3 className="text-2xl font-semibold mb-4">Colors</h3>
            <div className="color-items flex gap-2">
              {[ "red", "orange", "blue", "green"].map(
                (color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full bg-${color}-500 border`}
                  ></button>
                )
              )}
            </div>
          </div>

          {/* Price Filter */}
          <div className="price-filter mt-8">
            <h3 className="text-2xl font-semibold mb-4">
              Filter by Price: ${priceRate}
            </h3>
            <input
              type="range"
              step={10}
              value={filterValue}
              onChange={(e) => {
                setFilterValue(e.target.value);
                setPriceRate(e.target.value);
              }}
              className="w-full"
            />
          </div>
        </div>
      </section>
      <Products />
      <ChiffreSection />
    </div>
  );
};

export default Shop;
