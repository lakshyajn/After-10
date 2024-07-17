'use client'
import { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  const addToCart = (item) => {
    const { id, pic, price, quantity, checkboxes } = item;
    const existingItem = cart.find((i) => i.id === id);
    if (existingItem) {
        setCart(
            cart.map((cartItem) =>
              cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem
            )
          );
    } else {
        setCart([...cart, { ...item,quantity}]);
        setCartLength(cart.length + quantity);
    }
    
    
    let checkboxTotal = 0;
  if (checkboxes.cheese && checkboxes.veges) {
    checkboxTotal = 50 * quantity;
  } else if (checkboxes.cheese) {
    checkboxTotal = 20 * quantity;
  } else if (checkboxes.veges) {
    checkboxTotal = 30 * quantity;
  }
  setCartTotal(cartTotal + price*quantity + checkboxTotal);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i.id !== id));
    updateCartTotal();
  };

  const clearCart = () => {
    setCart([]);
    setCartTotal(0);
    setCartLength(0);
  };

  const updateCartTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setCartTotal(total);
    setCartLength(cart.length);
  };

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