import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  onApplyPromoCode: () => void;
  onCompleteOrder: () => void;
  formatCurrency: (amount: number) => string;
}

export default function OrderSummary({
  subtotal,
  savings,
  shipping,
  total,
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  onCompleteOrder,
  formatCurrency,
}: OrderSummaryProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Tóm tắt đơn hàng</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo Code */}
        <div className="space-y-2">
          <Label htmlFor="promo">Mã giảm giá</Label>
          <div className="flex gap-2">
            <Input
              id="promo"
              placeholder="Nhập mã"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
            />
            <Button onClick={onApplyPromoCode} variant="outline">
              Áp dụng
            </Button>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Tạm tính:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Tiết kiệm:</span>
              <span>-{formatCurrency(savings)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Phí vận chuyển:</span>
            <span className={shipping === 0 ? "text-green-600" : ""}>
              {shipping === 0 ? "Miễn phí!" : formatCurrency(shipping)}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Tổng cộng:</span>
          <span>{formatCurrency(total)}</span>
        </div>

        <Button
          onClick={onCompleteOrder}
          className="w-full bg-black text-white hover:bg-gray-800"
          size="lg"
        >
          Hoàn tất đơn hàng • {formatCurrency(total)}
        </Button>

        {/* Security Guarantees */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Mã hóa SSL 256-bit</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Bảo hành đổi trả 30 ngày</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Miễn phí vận chuyển đơn hàng trên 200.000₫</span>
          </div>
        </div>

        <Separator />

        <div className="text-sm">
          <p className="font-medium mb-2">
            Phương thức thanh toán được chấp nhận:
          </p>
          <div className="flex gap-2">
            <div className="px-2 py-1 bg-gray-100 rounded text-xs">COD</div>
            <div className="px-2 py-1 bg-gray-100 rounded text-xs">VNPay</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
