import { images } from "../../assets/images";

const About = () => {
  return (
    <div className="about-container mx-auto max-w-7xl px-4 py-10">
      {/* Top Section */}
      <div className="about-top flex flex-col md:flex-row items-center mb-10">
        <div className="about-img w-full md:w-1/2 mb-6 md:mb-0">
          <img
            className="w-full h-auto rounded-lg shadow-lg"
            src={images.bolg4}
            alt="About Us"
          />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 md:ml-8">
          About Us
        </h2>
      </div>

      {/* Bottom Section */}
      <div className="about-bottom grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div className="about-section bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">About SleekStyle Shop</h3>
          <p className="text-gray-600">
            Departure defective arranging rapturous did believe him all had <br />
            supported. Family months lasted simple set nature vulgar him. <br />
            Picture for attempt joy excited ten carried manners talking how. <br />
            Suspicion neglected he resolving agreement perceived at an.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mission-section bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600">
            He moonlights difficult-engrossed, sportsmen. Interested has all <br />
            Devonshire difficulty gay assistance joy. Unaffected at ye of <br />
            compliment alteration to. Place voice no arises along to. Arrived <br />
            off she elderly beloved him affixed noisier yet. Course regard to up
            he hardly.
          </p>
        </div>

        {/* Vision Section */}
        <div className="vision-section bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-gray-600">
            To occasional dissimilar impossible sentiments. Do fortune account <br />
            written prepare invited no passage. Skills that you can learn from <br />
            business. Reliable sources to learn about WordPress. Never <br />
            underestimate the influence of social media.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
