"use client";
import Header from "./components/layout/Header";
import Filters from "./components/layout/Filters";
import Card1 from "./components/layout/Card1"; 
import { CartProvider } from "./components/layout/cart-context";

export default function Home() {

  return (
    <div>
      <CartProvider>
        <div><div>
          <Header/>
          <Filters />
            <Card1 />
            </div>
        </div>
      </CartProvider>
    </div>

  );
}
