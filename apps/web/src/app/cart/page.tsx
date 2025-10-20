"use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft } from "lucide-react";
import {
  CartItem,
  OrderSummary,
  EmptyCart,
  CartSkeleton,
} from "@/components/cart";
import { useCart } from "@/hooks/use-cart";
// import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const {
    items: cartItems,
    updateQuantity,
    removeItem,
    subtotal,
    shipping,
    total,
    itemCount,
    isLoading,
  } = useCart();
  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    const item = cartItems.find((item) => item.CartItemID === cartItemId);
    if (item) {
      updateQuantity(cartItemId, newQuantity);
      toast.success(`Đã cập nhật ${item.Product.Name} vào giỏ hàng`);
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    const item = cartItems.find((item) => item.CartItemID === cartItemId);
    if (item) {
      removeItem(cartItemId);
      toast.success(`Đã xóa ${item.Product.Name} khỏi giỏ hàng`);
    }
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mt-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Giỏ hàng của bạn
          </h1>
          <p className="text-muted-foreground mt-2">
            {itemCount} sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.CartItemID}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              itemCount={itemCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
