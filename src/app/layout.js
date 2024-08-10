import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/layout/cart-context";
import { faNavicon } from "@fortawesome/free-solid-svg-icons";

const roboto = Roboto({ subsets: ["latin"], weight: ['400','500','700'] });

export const metadata = {
  title: "After 10",
  description: "Delicious Food anytime you want",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CartProvider><main className="max-w-4xl mx-auto p-4">{children}</main></CartProvider>
        </body>
    </html>
  );
}
