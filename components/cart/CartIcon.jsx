'use client'
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CartIcon() {
    const [itemCount, setItemCount] = useState(0)
    const cartItems = useSelector((state) => state.cart.items);
    

    useEffect(() => {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
        setItemCount(totalItems)
    }, [cartItems])

    return (
        <>
            <div
                className="relative top-0 p-2 text-green-500 rounded-full bg-white hover:text-green-600 transition-colors"
                aria-label={`Cart (${itemCount} items)`}>
                <ShoppingCart size={30} />
                {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {itemCount}
                    </span>
                )}
            </div>
        </>
    )
}