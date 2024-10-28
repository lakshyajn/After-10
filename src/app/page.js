"use client";
import Header from "./components/layout/Header";
import Filters from "./components/layout/Filters";
import Card1 from "./components/layout/Card1";
import { CartProvider } from "./components/layout/cart-context";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [itemsByCategory, setItemsByCategory] = useState({});

  // Fetch items grouped by category
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("./api/categories");
        setItemsByCategory(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <CartProvider>
        <Header />
        <Filters />

        {/* Render items category by category */}
        {Object.keys(itemsByCategory).map((category) => (
          <Card1 key={category} categoryName={category} items={itemsByCategory[category]} />
        ))}
      </CartProvider>
    </div>
  );
}
