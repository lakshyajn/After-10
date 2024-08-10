"use client"
import React from 'react';
import Image from 'next/image';
import Header from '../components/layout/Header';
import Head from 'next/head';
import { CartContext } from '../components/layout/cart-context';
import { useContext,useState } from 'react';
import logo from "../../../public/assets/Untitled-1-copy-1.png"

export default function Checkout(){
  const {cart, cartTotal}= useContext(CartContext);
  const [billingAddress, setBillingAddress] = useState(false);
  const [shippingOption, setShippingOption] = useState('Free Shipping');
  const [paymentOption, setPaymentOption] = useState('WhatsApp Order');
  const [note, setNote] = useState('');

  const handleBillingAddressChange = () => {
    setBillingAddress(!billingAddress);
  };

  const handleShippingOptionChange = (option) => {
    setShippingOption(option);
  };

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };
  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    console.log('Order placed!');
    console.log('Billing address:', billingAddress);
    console.log('Shipping option:', shippingOption);
    console.log('Payment option:', paymentOption);
    console.log('Note:', note);
  };

  return (
    
    <div>
    <div className="justify-center items-center m-auto relative w-50"><Image src={logo} alt="After 10"></Image></div>
        <div className="justify-center items-center text-center px-0 py-8 m-auto justify-items-center text-nowrap bg-[#F5F5F5] text-xl text-[#333333] font-sans">Checkout</div>
      <Head><title>Checkout</title></Head>

      <div className="mb-4 mx-auto py-4 container">
  <h2 className="text-xl font-bold mb-2">Order Summary</h2>
  <div className="flex flex-wrap mx-4">
          {cart.length > 0 ? (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ₹ {item.price * item.quantity}</span>
                  {item.checkboxes.cheese && <span>+ Cheese: ₹20</span>}
                  {item.checkboxes.veges && <span>+ Veggies: ₹30</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </div>

  <div className="mb-4 flex justify-between items-baseline m-2 border-b">
    <h2 className="text-md mb-2">Subtotal</h2>
    <p>₹ {cart && Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2) : '0.00'}</p>
  </div>

  <div className="mb-4 flex justify-between items-baseline m-2 border-b">
    <h2 className="text-lg font-bold mb-2">Total</h2>
    <p>₹ {cart && Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2) : '0.00'}</p>
  </div>
</div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Contact Information</h2>
        <div className="bg-[#F5F5F5] p-4 rounded-md">
          <div className="mb-2 mt-1">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email Address
            </label>
            <input 
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              
            />
          </div>
          <div className="mb-2 mt-4">
            <input
              type="checkbox"
              id="subscribe"
              className="mr-2"
      
            />
            <label htmlFor="subscribe" className="text-gray-700 font-bold">
              I would like to receive exclusive emails with discounts and product
              information
            </label>
          </div>

          <div className="bg-gray-100 mt-4 rounded-md">
  <div className="text-xl font-bold mb-2">Shipping Address</div>
  <div className="mb-2">
    <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
      Country/Region
    </label>
    <select
      id="country"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="India">India</option>
      {/* Add more country options here */}
    </select>
  </div>
  <div className="mb-2">
    <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
      First Name
    </label>
    <input
      type="text"
      id="firstName"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-2">
    <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">
      Last Name
    </label>
    <input
      type="text"
      id="lastName"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    </div>
  <div className="mb-2">
    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
      Address
    </label>
    <input
      type="text"
      id="address"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-2">
    <label htmlFor="apartment" className="block text-gray-700 font-bold mb-2">
      Apartment, Suite, etc.
    </label>
    <input
      type="text"
      id="apartment"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    </div>
  <div className="mb-2">
    <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
      City
    </label>
    <input
      type="text"
      id="city"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-2">
    <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
      State
    </label>
    <select
      id="state"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    >
      <option value="Rajasthan">Rajasthan</option>
      {/* Add more state options here */}
    </select>
  </div>
  <div className="mb-2">
    <label htmlFor="pinCode" className="block text-gray-700 font-bold mb-2">
      PIN Code
    </label>
    <input
      type="text"
      id="pinCode"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="mb-2">
    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
      Phone (optional)
    </label>
    <input
      type="tel"
      id="phone"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
</div>
<div className="mb-4 flex place-items-baseline mt-4">
        <input
          type="checkbox"
          id="billing-address"
          checked={billingAddress}
          onChange={handleBillingAddressChange}
          className="mr-2"
        />
        <label htmlFor="billing-address" className="block text-gray-700 font-bold mb-2">
          Use same address for billing
        </label>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Shipping options</h2>
        <div className="flex items-center">
          <input
            type="radio"
            id="free-shipping"
            name="shipping-option"
            value="Free Shipping"
            checked={shippingOption === 'Free Shipping'}
            onChange={() => handleShippingOptionChange('Free Shipping')}
            className="mr-2"
          />
          <label htmlFor="free-shipping" className="text-gray-700">Free shipping</label>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Payment options</h2>
        <div className="flex items-center">
          <input
            type="radio"
            id="whatsapp-order"
            name="payment-option"
            value="WhatsApp Order"
            checked={paymentOption === 'WhatsApp Order'}
            onChange={() => handlePaymentOptionChange('WhatsApp Order')}
            className="mr-2"
          />
          <label htmlFor="whatsapp-order" className="text-gray-700">WhatsApp Order</label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="order-note" className="block text-gray-700 font-bold mb-2">
          Add a note to your order
        </label>
        <textarea
          id="order-note"
          rows="4"
          value={note}
          onChange={handleNoteChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="text-center">
        <button onClick={handlePlaceOrder} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Place Order
        </button>
      </div>
      <p className="mt-4 text-gray-600 text-sm mx-auto">
        By proceeding with your purchase you agree to our <a href="#" className="text-blue-500">Terms and Conditions</a> and <a href="#" className="text-blue-500">Privacy Policy</a>
      </p>
    </div>
    </div>
   </div>
  );
};
