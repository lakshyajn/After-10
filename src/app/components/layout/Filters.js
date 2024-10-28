import Link from "next/link";

export default function Filters(){
    return(
        <div className="flex flex-wrap overflow-x-auto mb-4 font-sans transition-all">
          <nav className="flex whitespace-nowrap gap-4 text-gray-500 font-semibold justify-evenly pt-6">
            <Link href="/#maggi_n_noodles" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Maggi & Noodles</Link>
            <Link href="/#sandwiches" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Sandwiches</Link>
            <Link href="/#burgers" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2 ">Burgers</Link>
            <Link href="/#momos" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Momos</Link>
            <Link href="/#breads" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Breads</Link>
            <Link href="/#chakhna" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Chakhna Party</Link>
            <Link href="/#fries" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">French Fries</Link>
            <Link href="/#paratha" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Paratha</Link>
            <Link href="/#pasta" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Pasta & Garlic Bread</Link>
            <Link href="/#rice" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Rice/Biryani</Link>
            <Link href="/#soyachaap" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Soya Chaap</Link>
            <Link href="/#starters" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Starters</Link>
            <Link href="/#wraps" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Wraps</Link>
            <Link href="/#addons" className="hover:text-[#37DD00] hover:border-[#37DD00] border rounded-md p-2">Add Ons</Link>
            </nav>  
        </div>
    ); 
}