"use client";

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

interface BuyNowButtonProps {
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
  quantity?: number;
}

export function BuyNowButton({
  product,
  size,
  color,
  price,
  className,
  quantity = 1,
}: BuyNowButtonProps) {
  const router = useRouter();

  const handleBuyNow = () => {
    // Tạo item cho checkout
    const checkoutItem = {
      id: `buy-now-${product.ProductID}-${Date.now()}`,
      name: product.Name,
      color: color,
      size: size,
      price: price,
      originalPrice: price, // Có thể thêm logic tính originalPrice sau
      quantity: quantity,
      image: product.Images[0] || "/api/placeholder/100/120",
    };

    // Chuyển đến checkout với item này
    const encodedItem = encodeURIComponent(JSON.stringify(checkoutItem));
    router.push(`/checkout?source=product&item=${encodedItem}`);
  };

  return (
    <Button
      onClick={handleBuyNow}
      className={className}
      size="lg"
      variant="default"
    >
      <CreditCard className="h-5 w-5 mr-2" />
      Mua ngay
    </Button>
  );
}
