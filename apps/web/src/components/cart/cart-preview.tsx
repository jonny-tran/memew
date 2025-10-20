"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { EmptyCart } from "./empty-cart";

export function CartPreview() {
  const { items, itemCount, total } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (itemCount === 0) {
    return <EmptyCart />;
  }

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Giỏ hàng ({itemCount})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-64 overflow-y-auto">
          {items.slice(0, 3).map((item) => (
            <div
              key={item.CartItemID}
              className="flex gap-3 p-4 border-b last:border-b-0"
            >
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={item.Product.Images[0] || "/placeholder-product.jpg"}
                  alt={item.Product.Name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">
                  {item.Product.Name}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {item.Size} • {item.Color}
                </p>
                <p className="text-sm font-medium">
                  {item.Quantity} × {formatPrice(item.UnitPrice)}
                </p>
              </div>
            </div>
          ))}
          {items.length > 3 && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              +{items.length - 3} sản phẩm khác
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium">Tổng cộng:</span>
            <span className="font-bold text-lg">{formatPrice(total)}</span>
          </div>

          <div className="space-y-2">
            <Link href="/cart" className="block">
              <Button className="w-full">
                Xem giỏ hàng
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/checkout" className="block">
              <Button variant="outline" className="w-full">
                Thanh toán
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
