import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css";
import { homeSlideData } from "../../constant/data";
import { FaShippingFast } from "react-icons/fa";
import { MdSecurity, MdBookOnline } from "react-icons/md";
import { BsShieldFillCheck } from "react-icons/bs";
import ChiffreSection from "../../features/ChiffreSection";
import Products from "../../features/Prodcuts";
const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Slider Section */}
      <section className="home-slider py-10 bg-gray-100">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          loop={true}
          pagination={{ clickable: true }}
        >
          {homeSlideData.map(
            ({ id, title, description, imageRight, imgageLeft }) => (
              <SwiperSlide key={id}>
                <div className="slider flex flex-col md:flex-row items-center justify-center px-4 py-8 bg-white shadow-md rounded-lg">
                  {/* Left Image */}
                  <div className="left w-full md:w-1/4 flex justify-center mb-6 md:mb-0">
                    <img
                      className="w-3/4 md:w-full h-80 md:h-[500px] rounded-lg object-cover"
                      src={imgageLeft}
                      alt="left image"
                    />
                  </div>

                  {/* Middle Text Content */}
                  <div className="middle w-full md:w-2/4 text-center px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                      {title}
                    </h2>
                    <p className="text-lg text-gray-600">{description}</p>
                  </div>

                  {/* Right Image */}
                  <div className="right hidden w-full md:w-1/4 md:flex justify-center mt-6 md:mt-0">
                    <img
                      className="w-3/4 md:w-full h-80 md:h-[500px] rounded-lg object-cover"
                      src={imageRight}
                      alt="right image"
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="features flex flex-wrap justify-center py-8 bg-white gap-4">
        <div className="features-item flex flex-col items-center">
          <FaShippingFast className="icon text-4xl text-red-500" />
          <p className="mt-2 text-gray-700">Free Shipping</p>
        </div>
        <div className="features-item flex flex-col items-center">
          <MdSecurity className="icon text-4xl text-green-500" />
          <p className="mt-2 text-gray-700">Secure Checkout</p>
        </div>
        <div className="features-item flex flex-col items-center">
          <MdBookOnline className="icon text-4xl text-blue-500" />
          <p className="mt-2 text-gray-700">Online Checkout</p>
        </div>
        <div className="features-item flex flex-col items-center">
          <BsShieldFillCheck className="icon text-4xl text-yellow-500" />
          <p className="mt-2 text-gray-700">Great Quality</p>
        </div>
      </section>

      {/* Products Section */}
      <Products />

      {/* Milestone Section */}
      <ChiffreSection />
    </div>
  );
};

export default Home;
