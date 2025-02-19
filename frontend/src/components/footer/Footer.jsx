import {
  FaFacebook,
  FaInstagramSquare,
  FaYoutube,
  FaTwitter,
  FaCcMastercard,
  FaCcVisa,
  FaCcPaypal,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Footer Top */}
      <div className="footer-top py-10 px-4 md:px-10 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div className="left space-y-4">
          <h3 className="text-xl font-semibold">About SleekStyle</h3>
          <p className="text-gray-400">
            At SleekStyle, we believe fashion should be as effortless as it is
            bold. Our curated collection of modern, minimalist clothing is
            designed to help you express your unique style with confidence. From
            everyday essentials to statement pieces, SleekStyle is your go-to
            destination for clothing that’s sleek, stylish, and versatile.
          </p>
          <div className="social-icons flex space-x-4 text-2xl">
            <FaFacebook className="hover:text-blue-600" />
            <FaInstagramSquare className="hover:text-pink-500" />
            <FaTwitter className="hover:text-blue-400" />
            <FaYoutube className="hover:text-red-500" />
          </div>
        </div>

        {/* Newsletter */}
        <div className="middle space-y-4">
          <h3 className="text-xl font-semibold">Stay in the Loop</h3>
          <p className="text-gray-400">
            Sign up for our newsletter to get the latest trends, exclusive
            offers, and style tips directly to your inbox. Never miss out on new
            arrivals and promotions from SleekStyle!
          </p>
          <div className="new-input flex space-x-2">
            <input
              type="email"
              placeholder="Enter your E-mail"
              className="w-full px-4 py-2 text-black rounded-md"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Subscribe
            </button>
          </div>
          <div className="vias-icon flex space-x-4 text-2xl pt-4">
            <FaCcMastercard className="hover:text-red-600" />
            <FaCcVisa className="hover:text-blue-600" />
            <FaCcPaypal className="hover:text-blue-500" />
          </div>
        </div>

        {/* Information */}
        <div className="right space-y-4">
          <h3 className="text-xl font-semibold">Customer Service</h3>
          <p className="hover:underline cursor-pointer">Delivery Information</p>
          <p className="hover:underline cursor-pointer">Contact Us</p>
          <p className="hover:underline cursor-pointer">Returns & Exchanges</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom bg-gray-900 py-4 px-4 md:px-10 lg:px-20 flex flex-col md:flex-row justify-between text-sm text-gray-400">
        <p>@2024 SleekStyle. All rights reserved.</p>
        <div className="flex space-x-6">
          <p className="hover:underline cursor-pointer">
            General Conditions of Sale
          </p>
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">Terms and Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
