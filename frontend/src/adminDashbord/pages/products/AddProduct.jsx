import { useState } from "react";
import useProductStore from "../../../store/productStore";
import toast from "react-hot-toast";
//import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { addProduct } = useProductStore();

  const [productName, setProductName] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, SetCategory] = useState("");

  const [message, setMessage] = useState("");

 // const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("quantity", quantity);
    formData.append("category", category);

    try {
      //function to add a product
      await addProduct(formData);
      setMessage("Product added successfully!");
      toast.success("Product added successfully!");
      setProductName("");
      setImage(null);
      setDescription("");
      setPrice("");
      setQuantity("");
      SetCategory("");
     /* setTimeout(() => {
        navigate("/dashboard/products");
      }, 2000);*/
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[100%]">
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-2 text-center">Add New Product</h2>

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
              name="productName"
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
              onChange={(e) => setDescription(e.target.value)}
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
            <select
              type="text"
              id="category"
              name="category"
              onChange={(e) => SetCategory(e.target.value)}
              value={category}
              className="mt-1 block w-full p-2 border border-gray-300
              rounded-md"
              placeholder="Enter category"
              required
            >
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
