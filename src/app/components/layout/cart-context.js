"use client" 
import { createContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart)); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((item) => {
    const { id, pic, price, quantity, checkboxes } = item;
    const existingItem = cart.find((i) => i.id === id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity }]);
      setCartLength(cartLength + 1);
    }
    let checkboxTotal = 0;
    if (checkboxes.cheese && checkboxes.veges) {
      checkboxTotal = 50 * quantity;
    } else if (checkboxes.cheese) {
      checkboxTotal = 20 * quantity;
    } else if (checkboxes.veges) {
      checkboxTotal = 30 * quantity;
    }
    setCartTotal(cartTotal + price * quantity + checkboxTotal);
  }, [cart, setCart, cartLength, setCartLength, cartTotal, setCartTotal]);

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
    updateCartTotal();
  };

  const clearCart = () => {
    setCart([]);
    setCartTotal(0);
    setCartLength(0);
    localStorage.removeItem('cart');
  };

  const updateCartTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(total);
    setCartLength(cart.length);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    console.log('Stored cart:', storedCart);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);
  
  useEffect(() => {
    console.log('Saving cart:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    console.log('CartProvider - Stored cart:', storedCart);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
        console.log('CartProvider - Parsed cart:', parsedCart);
      } catch (error) {
        console.error('CartProvider - Error parsing cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('CartProvider - Saving cart:', cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartTotal,
        cartLength,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };