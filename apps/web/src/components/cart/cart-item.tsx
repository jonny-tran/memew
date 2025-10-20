"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  item: {
    CartItemID: string;
    ProductID: string;
    Product: {
      ProductID: string;
      Name: string;
      Images: string[];
      Type: string;
      Status: string;
      Description: string;
    };
    Quantity: number;
    UnitPrice: number;
    Size: string;
    Color: string;
  };
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={item.Product.Images[0] || "/placeholder-product.jpg"}
              alt={item.Product.Name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  {item.Product.Name}
                </h3>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {item.Size}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.Color}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveItem(item.CartItemID)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onUpdateQuantity(item.CartItemID, item.Quantity - 1)
                  }
                  disabled={item.Quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">
                  {item.Quantity}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onUpdateQuantity(item.CartItemID, item.Quantity + 1)
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="font-bold text-lg text-foreground">
                  {formatPrice(item.UnitPrice * item.Quantity)}
                </div>
                {item.Quantity > 1 && (
                  <div className="text-sm text-muted-foreground">
                    {formatPrice(item.UnitPrice)} × {item.Quantity}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
