"use client"
import React from 'react';
import Header from '../layout/Header';
import Head from 'next/head';

export default function checkout(){
  return (
    <div>
      <Header />
      <Head><title>Checkout</title></Head>
      <h1>Order Summary</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Addons</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {/* {cart.map((item) => (
            <tr key={item.id}>
              <td><img src={item.pic} alt={item.id} /></td>
              <td>{item.id}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                {item.checkboxes.cheese && <span>Cheese: {20 * item.quantity}</span>}
                {item.checkboxes.veges && <span>Veges: {30 * item.quantity}</span>}
                {(item.checkboxes.cheese && item.checkboxes.veges) && <span>Both: {50 * item.quantity}</span>}
              </td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
      {/* <h2>Shipping Fee: ${shippingFee}</h2>
      <h2>Subtotal: ${subtotal}</h2>
      <h2>Grand Total: ${grandTotal}</h2> */}
    </div>
  );
};