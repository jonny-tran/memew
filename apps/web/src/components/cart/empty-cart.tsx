"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="min-h-screen bg-background pt-[200px] pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Giỏ hàng trống
            </h1>
            <p className="text-muted-foreground text-lg">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
