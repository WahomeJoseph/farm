"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addItem } from "@/lib/features/cart/Cartslice";

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(
      addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        weight: product.weight,
        quantity: 1,
        image: product.image,
      })
    );
    toast.success(`${product.name} added to cart`, {
      position: "top-right",
      duration: 3000,
    });
  };

  return (
    <Card className="group relative flex flex-col overflow-hidden bg-white shadow-sm transition-all hover:shadow-xl border border-gray-100 rounded-xl">
      <CardHeader className="p-0">
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={true}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-grow p-4">
        <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </CardTitle>
        <span className="mt-1 text-sm text-gray-500">{product.weight}</span>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <p className="mt-3 text-lg font-bold text-green-600">KES {product.price.toLocaleString()}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 transition-colors duration-200"
          onClick={handleCart}
          aria-label={`Add ${product.name} to cart`}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};