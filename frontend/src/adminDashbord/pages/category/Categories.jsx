import { useState } from "react";

const Categories = () => {
  // Sample categories (this could be fetched from an API)
  const [categories, setCategories] = useState([
    { id: 1, name: "Kids" },
    { id: 2, name: "Women" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Men" },
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Handle the creation of a new category
  const handleAddCategory = () => {
    if (newCategory) {
      setCategories([
        ...categories,
        { id: categories.length + 1, name: newCategory },
      ]);
      setNewCategory(""); // Clear input field
      setIsAdding(false); // Close the add category form
    }
  };

  // Handle delete category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>

      {/* Add Category Button */}
      <div className="mb-4 text-center">
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-500 text-white py-2 px-6 rounded-lg"
        >
          Add New Category
        </button>
      </div>

      {/* Add Category Form (conditional rendering) */}
      {isAdding && (
        <div className="mb-4 text-center">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg mr-4"
            placeholder="Enter category name"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg"
          >
            Add Category
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg ml-4"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Categories List */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Category Name</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="py-3 px-6">{category.name}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
