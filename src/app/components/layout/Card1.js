'use client';
import '../../../app/globals.css';
import Image from "next/image";
import React,{ useContext } from "react";
import { CartContext } from './cart-context';
import Card from './Card1_s'
import i1 from "../../../../public/assets/1-masala_maggi.jpeg";
import i2 from "../../../../public/assets/2-hakka.jpg"

export default function Card1(){

    return(
        <div className="card1">
         <div>
            <div id="maggi_n_noodles" className="text-[#37DD00] text-2xl font-sans">Maggi & Noodles</div>
            </div>

         <Card id="Masala Maggi"  pic={i1} price={80.00}/>   
         <Card id="Hakka Noodles" pic={i2} price={130.00}/>
         <Card id="Crispy Noodles" pic={i1} price={100.00}/>
        </div>
    );
}