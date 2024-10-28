"use client";
import React, { useState, useEffect } from "react";
import Card from "../../components/layout/Card1_s"; // Modify if needed

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    id: "",
    pic: null, // Set initially to null for image
    price: "",
    addOnOptions: "",
    category: "", // Default category
  });
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("/api/getItems");
  
        // Check if the response is ok (status 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setItems(data); // Set items to the fetched data
      } catch (error) {
        console.error("Error fetching items:", error);
        // Optionally, handle the error state here, e.g., set an error message
      }
    };
  
    fetchItems();
  }, []);  

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (!file) {
      return; // Exit if no file is selected
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result; // Base64-encoded image
      setNewItem((prev) => ({ ...prev, pic: imageUrl }));
    };
    reader.readAsDataURL(file);
  };

  // Add new item to the list
  const addItem = async () => {
    if (newItem.id && newItem.pic && newItem.price && newItem.category) {
      const itemToAdd = {
        id: newItem.id, // ID or name of the item
        price: parseFloat(newItem.price),
        category: newItem.category,
        imageUrl: newItem.pic,
        inStock: true,
        addOns: newItem.addOnOptions
          .split(",")
          .map((opt) => ({ name: opt.trim(), price: 0 })),
      };

      try {
        const response = await fetch("/api/getItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemToAdd),
        });

        if (!response.ok) {
          throw new Error("Failed to add item to the database");
        }

        const addedItem = await response.json();
        setItems((prevItems) => [...prevItems, addedItem]);

        // Reset the form after adding the item
        setNewItem({
          id: "",
          pic: null,
          price: "",
          addOnOptions: "",
          category: "",
        });
        setShowModal(false); // Hide modal after item is added
      } catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item. Please try again.");
      }
    } else {
      alert("Please fill all the fields, including category.");
    }
  };

  // Remove item from the list
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Hello Admin</h1>
      <div className="admin-section mb-6">
        <h2 className="text-2xl font-semibold mb-2">All Items</h2>
        <div className="items-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="item-card border p-4 rounded shadow-lg">
              <Card
                id={item.id}
                pic={item.imageUrl}
                price={item.price}
                addOnOptions={item.addOnOptions}
                category={item.category}
              />
              <button
                className="remove-btn bg-red-500 text-white py-1 px-3 mt-2 rounded hover:bg-red-600 transition"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-section">
        <button
          className="add-item-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          onClick={() => setShowModal(true)}
        >
          Add Item
        </button>
      </div>

      {/* Modal for adding new item */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            <label className="block mb-2">
              Item ID:
              <input
                type="text"
                name="id"
                value={newItem.id}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </label>
            <label className="block mb-2">
              Upload Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border rounded w-full p-2"
              />
            </label>
            <label className="block mb-2">
              Price:
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </label>
            <label className="block mb-2">
              Category:
              <select
                name="category"
                value={newItem.category}
                onChange={handleChange}
                className="border rounded w-full p-2"
              >
                {/* Add categories */}
                <option value="">Select Category</option>
                <option value="Maggi & Noodles">Maggi & Noodles</option>
                <option value="Sandwiches">Sandwiches</option>
                <option value="Burgers">Burgers</option>
                <option value="Momos">Momos</option>
                <option value="Breads">Breads</option>
                <option value="Chakhna Party">Chakhna Party</option>
                <option value="French Fries">French Fries</option>
                <option value="Paratha">Paratha</option>
                <option value="Pasta & Garlic Bread">Pasta & Garlic Bread</option>
                <option value="Rice/Biryani">Rice/Biryani</option>
                <option value="Soya Chaap">Soya Chaap</option>
                <option value="Starters">Starters</option>
                <option value="Wraps">Wraps</option>
                <option value="Add Ons">Add Ons</option>
              </select>
            </label>
            <label className="block mb-2">
              Add-Ons (comma separated):
              <input
                type="text"
                name="addOnOptions"
                value={newItem.addOnOptions}
                onChange={handleChange}
                className="border rounded w-full p-2"
              />
            </label>
            <div className="flex justify-between mt-4">
              <button
                onClick={addItem}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
              >
                Add Item
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}