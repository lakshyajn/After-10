"use client"
import React from 'react';
import Image from 'next/image';
import Header from '../components/layout/Header';
import Head from 'next/head';
import { CartContext } from '../components/layout/cart-context';
import { useContext, useState, useEffect } from 'react';
import logo from "../../../public/assets/Untitled-1-copy-1.png"

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const [billingAddress, setBillingAddress] = useState(false);
  const [shippingOption, setShippingOption] = useState('Free Shipping');
  const [paymentOption, setPaymentOption] = useState('WhatsApp Order');
  const [note, setNote] = useState('');
  const [localCart, setLocalCart] = useState([]);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Rajasthan',
    pinCode: '',
  });

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

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const generateWhatsAppMessage = (orderDetails) => {
    const { userName, items, address, totalAmount, orderId } = orderDetails;

    // Construct the order details message
    const message = `
Hello ${userName}, Your order details:

# After10-OID: ${orderId}

Order details: 
${items.map(item => `*${item.name} x ${item.quantity} => ₹ ${item.total}`).join('\n')}

---------------------------------
💰 Total Amount: ₹ ${totalAmount} INR
---------------------------------
Address:
${address.name}
${address.contactNo}
${address.line1}
${address.line2}
    `.trim();

    // URL encode the message
    return encodeURIComponent(message);
  };

  const generateWhatsAppLink = (phoneNumber, message) => {
  
    const formattedPhoneNumber = `91${phoneNumber}`;
    return `https://wa.me/${formattedPhoneNumber}?text=${message}`;
  };

  const handlePlaceOrder = () => {
    const orderId = new Date().getTime(); // Example order ID, use a more robust ID in production
    const totalAmount = localCart.reduce((acc, item) => {
      let itemTotal = item.price * item.quantity;
      if (item.checkboxes) {
        if (item.checkboxes.cheese) itemTotal += 20 * item.quantity;
        if (item.checkboxes.veges) itemTotal += 30 * item.quantity;
      }
      return acc + itemTotal;
    }, 0).toFixed(2);

    const orderDetails = {
      userName: `${formValues.firstName} ${formValues.lastName}`,
      items: localCart.map(item => ({
        name: item.id,
        quantity: item.quantity,
        total: (item.price * item.quantity).toFixed(2)
      })),
      address: {
        name: `${formValues.firstName} ${formValues.lastName}`,
        contactNo: formValues.phone,
        line1: formValues.address,
        line2: formValues.apartment,
      },
      totalAmount: totalAmount,
      orderId: orderId
    };

    const message = generateWhatsAppMessage(orderDetails);
    const phoneNumber = formValues.phone;
    const whatsappLink = generateWhatsAppLink(phoneNumber, message);

    window.location.href = whatsappLink; // Redirect to WhatsApp
  };

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setLocalCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart:', error);
      }
    }
  }, []);

  return (
    <>
      <div>
        <div className="justify-center items-center m-auto relative w-50">
          <Image src={logo} alt="After 10" />
        </div>
        <div className="justify-center items-center text-center px-0 py-8 m-auto justify-items-center text-nowrap bg-[#F5F5F5] text-xl text-[#333333] font-sans">Checkout</div>
        <Head><title>Checkout</title></Head>

        <div className="mb-4 mx-auto py-4 container">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>

          <div className="flex flex-wrap w-full justify-center">
            {!localCart || localCart.length === 0 ? (
              <p className="text-center">Your cart is empty.</p>
            ) : (
              <ul>
                {localCart.map((item, index) => (
                  <li key={index} className="mb-2 border-2 rounded-sm p-2 w-full justify-center">
                    <div className="flex justify-between gap-2 items-center">
                      <span className="font-bold text-green-500 text-lg">{item.id}</span>
                      <span className="ml-2">Quantity: {item.quantity}</span>
                      <span className="ml-2">
                        Price: ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                      {item.checkboxes?.cheese && (
                        <span className="ml-2">+ Cheese: ₹20</span>
                      )}
                      {item.checkboxes?.veges && (
                        <span className="ml-2">+ Veggies: ₹30</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4 flex justify-between items-baseline m-2 border-b">
            <h2 className="text-md mb-2">Subtotal</h2>
            <p>
              ₹{" "}
              {localCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
            </p>
          </div>

          <div className="mb-4 flex justify-between items-baseline m-2 border-b">
            <h2 className="text-lg font-bold mb-2">Total</h2>
            <p>
              ₹{" "}
              {localCart.reduce((acc, item) => {
                let itemTotal = item.price * item.quantity;
                if (item.checkboxes) {
                  if (item.checkboxes.cheese) itemTotal += 20 * item.quantity;
                  if (item.checkboxes.veges) itemTotal += 30 * item.quantity;
                }
                return acc + itemTotal;
              }, 0).toFixed(2)}
            </p>
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-2 mt-4">
              <input
                type="checkbox"
                id="subscribe"
                className="mr-2" />
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
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
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
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  value={formValues.phone}
                  onChange={handleInputChange}
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
                  value={formValues.address}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="apartment" className="block text-gray-700 font-bold mb-2">
                  Apartment/Suite (Optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  value={formValues.apartment}
                  onChange={handleInputChange}
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
                  value={formValues.city}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={formValues.state}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="pinCode" className="block text-gray-700 font-bold mb-2">
                  PIN Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  value={formValues.pinCode}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}