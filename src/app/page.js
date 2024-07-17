"use client";
import Header from "./components/layout/Header";
import Filters from "./components/layout/Filters";
import Card1 from "./components/layout/Card1"; 
import { CartProvider } from "./components/layout/cart-context";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/checkout');
  };

  return (
    <div>
      <CartProvider>
        <div>
          <div>
            <Header />
            <Filters />
            <button onClick={handleClick}>Go to Checkout</button>
            <Card1 />
          </div>
        </div>
      </CartProvider>
    </div>
  );
}