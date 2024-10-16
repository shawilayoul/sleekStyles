import { useEffect, useState } from "react";
import { blogPost } from "../../constant/data";
import { images } from "../../assets/images";

const Blog = () => {
  const [showFullBlog, setShowFullBlog] = useState(false);
  const [descText, setDescText] = useState([]);

  useEffect(() => {
    blogPost.map(({ description }) => {
      if (!showFullBlog) {
        setDescText(description.substring(0, 200) + "....");
      }
    });
  }, [showFullBlog]);

  return (
    <div className="blog-container px-4 py-10">
      {/* Blog Header */}
      <div className="blog-top text-center mb-10">
        <div className="w-full max-w-4xl mx-auto">
          <img
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            src={images.bolg2}
            alt="Blog Banner"
          />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mt-6">Our Blogs</h2>
      </div>

      {/* Blog Content */}
      <div className="blog-bottom grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog Posts Section */}
        <div className="blog-left md:col-span-2 space-y-8">
          {blogPost.map(({ id, image, title, author, date, description }) => (
            <div
              key={id}
              className="blog-item bg-white p-6 rounded-lg shadow-lg"
            >
              <img
                className="w-full h-60 object-cover rounded-lg"
                src={image}
                alt={title}
              />

              <p className="text-gray-500 mt-4">{date}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{title}</h3>
              <h4 className="text-lg text-gray-600 mt-1">By {author}</h4>
              <p className="text-gray-700 mt-4">
                {showFullBlog ? description : descText}
              </p>

              {/* Show More / Show Less Button */}
              <button
                className="mt-4 text-blue-600 hover:underline"
                onClick={() => setShowFullBlog(!showFullBlog)}
              >
                {showFullBlog ? "See less" : "See more"}
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar Section */}
        <div className="blog-right hidden md:block md:col-span-1 bg-white p-6 rounded-lg shadow-lg">
          {/* Example Sidebar Content */}
          <h3 className="text-xl font-semibold text-gray-800">Popular Blogs</h3>
          <ul className="mt-4 space-y-2">
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
              Blog Title 1
            </li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
              Blog Title 2
            </li>
            <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
              Blog Title 3
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
