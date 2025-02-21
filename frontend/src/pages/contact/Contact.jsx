import { images } from "../../assets/images";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaClock } from "react-icons/fa";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_hr64wgw", "template_ezrie6k", form.current, {
        publicKey: "nDlGAVa1AnbUOZHoQ",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("your message has been sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="contact-container mx-auto max-w-7xl px-4 py-10">
      {/* Top Section with Image */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5 text-center ">
        Contact Us
      </h2>

      <div className="contact-img mb-10 text-center">
        <img
          src={images.bolg1}
          alt="Contact Us"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Contact Section */}
      <div className="contact-section grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="left bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-600 mb-4">
            We are also active on social media. You can find us at the addresses
            below:
          </p>

          {/* Contact Information */}
          <div className="items mb-4 flex items-start hover:text-blue-500">
            <FaLocationDot className="text-2xl text-gray-600 mr-3" />
            <a
              href="https://www.google.com/maps?q=HS+B26,+Horton+Ford+Rd,+Eidson,+TN,+37731"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>
                HS B26, Horton Ford Rd, <br />
                Eidson, TN, 37731
              </p>
            </a>
          </div>

          <div className="items mb-4 flex items-start hover:text-blue-500">
            <FaPhone className="text-2xl text-gray-600 mr-3" />
            <div>
              <p>Call Us</p>
              <a href="tel:+33782371177" className="text-gray-600 hover:text-blue-500">
                +33 7 82 37 11 77
              </a>
            </div>
          </div>

          <div className="items mb-4 flex items-start hover:text-blue-500">
            <MdEmail className="text-2xl text-gray-600 mr-3" />
            <div>
              <p>E-mail Us</p>
              <a href="mailto:aocholayoul9@gmail.com" className="text-gray-600 hover:text-blue-500">
                aocholayoul9@gmail.com
              </a>
            </div>
          </div>

          <div className="items mb-4 flex items-start hover:text-blue-500">
            <FaClock className="text-2xl text-gray-600 mr-3" />
            <div>
              <p>Opening Hours</p>
              <p className="text-gray-600 hover:text-blue-500">
                8:00 AM – 10:00 PM (Monday - Sunday)
              </p>
            </div>
          </div>
        </div>

        {/* Right Section (Contact Form) */}
        <div className="right bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Send a Message
          </h3>
          <form
            ref={form}
            onSubmit={sendEmail}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
          >
            <p className="text-gray-600 mb-2">
              Do you have anything in mind to tell us?
            </p>
            <p className="text-gray-600 mb-4">
              Please don’t hesitate to get in touch via our contact form.
            </p>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="user_name"
                placeholder="Enter your name"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">E-mail</label>
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                placeholder="Enter your message"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="google-map mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481569!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e52963ac45bbcb%3A0xf05e8d125e82af10!2sDos%20Mas!5e0!3m2!1sen!2sus!4v1671220374408!5m2!1sen!2sus"
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
