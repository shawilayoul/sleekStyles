import { images } from "../../assets/images";

const About = () => {
  return (
    <div className="about-container mx-auto max-w-7xl px-4 py-10">
      {/* Top Section */}
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-5 text-center ">
          About Us
        </h2>

        <div className="contact-img mb-10 text-center">
          <img
            src={images.bolg4}
            alt="Contact Us"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

      {/* Bottom Section */}
      <div className="about-bottom grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="about-section bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            About SleekStyle Shop
          </h3>
          <p className="text-gray-600">
            At SleekStyle, we are passionate about offering the latest fashion
            trends with a modern twist. Our shop brings you a curated collection
            of high-quality clothing, designed to fit your unique style. Whether
            you are looking for casual wear or something a bit more refined, we
            offer something for every occasion.
            <br />
            With a focus on comfort, style, and versatility, our pieces are made
            to elevate your wardrobe and boost your confidence.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mission-section bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-600">
            Our mission at SleekStyle is to empower individuals to express
            themselves through fashion. We aim to provide timeless, stylish, and
            comfortable clothing that makes you feel confident and chic, no
            matter where life takes you.
            <br />
            We strive to create a positive shopping experience by offering
            excellent customer service, fast shipping, and a diverse range of
            stylish options.
          </p>
        </div>

        {/* Vision Section */}
        <div className="vision-section bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600">
            Our vision is to become a leading fashion destination, known for our
            innovative designs, quality products, and exceptional customer
            service. We aim to create a community where fashion meets
            individuality and style knows no boundaries.
            <br />
            Through continuous improvement and a commitment to sustainability,
            we plan to inspire confidence and promote self-expression through
            the art of fashion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
