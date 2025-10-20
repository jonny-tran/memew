"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export function OrderSummary({
  subtotal,
  shipping,
  total,
  itemCount,
}: OrderSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Card className="sticky top-[220px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Tóm tắt đơn hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Tạm tính ({itemCount} sản phẩm):
            </span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Phí vận chuyển:</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600">Miễn phí</span>
              ) : (
                formatPrice(shipping)
              )}
            </span>
          </div>

          {shipping > 0 && (
            <div className="text-sm text-muted-foreground">
              Miễn phí ship từ {formatPrice(500000)}
            </div>
          )}

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Tổng cộng:</span>
            <span className="text-accent">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          <Link href="/checkout?source=cart" className="block">
            <Button className="w-full" size="lg">
              Thanh toán
            </Button>
          </Link>

          <Link href="/">
            <Button variant="outline" className="w-full">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>

        {/* Security Badge */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Thanh toán an toàn & bảo mật</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
