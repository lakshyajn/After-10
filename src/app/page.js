import Header from "./components/layout/Header";
import Filters from "./components/layout/Filters";
import Card1 from "./components/layout/Card1"; 
import { CartProvider } from "./components/layout/cart-context";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <CartProvider>
        <div><div>
          <Header />
          <Filters />
        </div>
        <Link href="/checkout">Hello</Link>
          <div>
            <Card1 />
          </div>
        </div>
      </CartProvider>
    </div>

  );
}
