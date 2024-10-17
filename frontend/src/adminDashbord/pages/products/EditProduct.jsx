import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { productId } = useParams();

  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, SetCategory] = useState("");

  const [existingImage, setExistingImage] = useState(null); // For displaying existing image
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  // Load the product data when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://sleekbackendexpress.onrender.com/api/products/${productId}`
        );
        const product = response.data;
        setProductName(product.productName);
        setDescription(product.description);
        setPrice(product.price);
        setQuantity(product.quantity);
        SetCategory(product.category)
        // image: null;// No need to set an image here
        setExistingImage(product.image); // Store the existing image for display
      } catch (error) {
        setError("Error loading product data.");
        console.log(error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send to the backend
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("category", category);

    // Send updated product data to the backend
    try {
      // Send updated product data to the backend
      const response = await axios.put(
        `https://sleekbackendexpress.onrender.com/uploads/${productId}`,
        formData
      );
      if (response.status === 200) {
        setMessage("Product updated successfully!");
        toast.success("Product has been updated successfully");
        setProductName("");
        setImage(null);
        setDescription("");
        setPrice("");
        setQuantity("");
        SetCategory("");
        setError("");
        setTimeout(() => {
          navigate("/dashboard/products");
        }, 2000);
      } else {
        setError("Error updating product.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100%]">
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Edit Product</h2>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {message && (
          <p className="text-center text-green-500 mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.description)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter product description"
              rows="4"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter price"
              step="0.01"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => SetCategory(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter category"
              required
            />
          </div>

          {/* Show existing image */}
          {existingImage && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Existing Product Image
              </label>
              <img
                src={existingImage}
                alt="Current Product"
                className="mt-2 w-32 h-32 object-cover"
              />
            </div>
          )}

          {/* Image upload field */}
          <div className="mb-2">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Upload New Product Image (optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
