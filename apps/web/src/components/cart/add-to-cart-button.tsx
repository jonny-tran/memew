"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: {
    ProductID: string;
    Name: string;
    Images: string[];
    Type: string;
    Status: string;
    Description: string;
  };
  size: string;
  color: string;
  price: number;
  className?: string;
  quantity?: number; // Thêm prop quantity
}

export function AddToCartButton({
  product,
  size,
  color,
  price,
  className,
  quantity = 1,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    // Thêm sản phẩm với số lượng đã chọn
    for (let i = 0; i < quantity; i++) {
      addItem({
        ProductID: product.ProductID,
        Product: product,
        UnitPrice: price,
        Size: size,
        Color: color,
      });
    }

    toast.success(`Đã thêm ${quantity} sản phẩm ${product.Name} vào giỏ hàng`);
  };

  return (
    <Button onClick={handleAddToCart} className={className} size="lg">
      <ShoppingCart className="h-5 w-5 mr-2" />
      Thêm vào giỏ hàng
    </Button>
  );
}
