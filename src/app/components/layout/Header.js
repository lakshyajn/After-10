'use client';
import { useContext, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown, faChevronCircleUp, faRotate } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../public/assets/Untitled-1-copy-1.png"
import search from "../../../../public/assets/search_24dp_FILL0_wght400_GRAD0_opsz24.svg"
import { CartContext } from './cart-context';
import { useRouter } from 'next/navigation';
import checkout from '@/app/checkout/page';
import {useHref} from 'next/navigation';

export default function Header({}) {
   
  const [smallCart, setsmallCart] = useState(false);
  function subtotal(){setsmallCart(!smallCart);}
 
  const {cartLength, cartTotal} = useContext(CartContext);

   const router= useRouter();
  const handleCheckout=()=>{router.push('/checkout');};
   
    return(
        <div className="justify-center">
        <div className="justify-center items-center m-auto relative w-50"><Image src={logo} alt="After 10"></Image></div>
        <div className="justify-center items-center text-center px-0 py-8 m-auto justify-items-center text-nowrap bg-[#F5F5F5] text-xl text-[#333333] font-sans">Order Online</div>
        <div className="border-1px border-b-2 rounded-md p-2 mt-4 flex justify-between">
          <input type="text" placeholder="Search dishes..." className="border-none w-80"></input>
          <Image src={search} className="w-5 cursor-pointer"></Image>
        </div>

        <div className="fixed w-full bg-white bottom-0 h-16 left-0">
          <div className="z-99">
          <div className="" onClick={subtotal}><FontAwesomeIcon icon={faChevronCircleUp} className="text-2xl text-[#37DD00] absolute left-6 bottom-5" ></FontAwesomeIcon></div>
          <div className="flex bottom-5 right-24 text-xl absolute">
            <div>Total: </div>
            <span className="text-[#37DD00] font-semibold mr-2">₹ {cartTotal.toFixed(2)}</span>
            <div onClick={handleCheckout}>Cart({cartLength})</div>
          </div>
          </div>
        </div>

        {smallCart && (
          <div className='fixed bg-white w-full h-2/5 left-0 bottom-[64px]'>
          <div className='flex justify-between m-4 font-sans transition-all 0.4s'>
            <div className='text-2xl'>Order Details</div>
            <div className='text-xl text-[#f1f1f1] pl-2 pr-2 rounded-sm bg-[#37DD00]' onClick={subtotal}>x</div>
          </div>
         <div className='object-cover items-center justify-center'><Image src="https://blueviolet-beaver-417420.hostingersite.com/wp-content/plugi
          ns/food-store/assets/images/empty-cart.svg" width={240} height={100} className='mx-auto mt-12'></Image>
             <div>Your Cart is Empty</div></div>
        </div>
        )}
         </div>  
    );
}