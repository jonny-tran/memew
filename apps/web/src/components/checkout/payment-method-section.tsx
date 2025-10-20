import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PaymentMethodSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export default function PaymentMethodSection({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Phương thức thanh toán</CardTitle>
        <p className="text-sm text-gray-600">Chọn cách bạn muốn thanh toán</p>
      </CardHeader>
      <CardContent>
        <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">₫</span>
                </div>
                <div>
                  <div className="font-medium">
                    Thanh toán khi nhận hàng (COD)
                  </div>
                  <div className="text-sm text-gray-600">
                    Thanh toán bằng tiền mặt khi nhận hàng
                  </div>
                </div>
              </div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="vnpay" id="vnpay" />
            <Label htmlFor="vnpay" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">VN</span>
                </div>
                <div>
                  <div className="font-medium">VNPay</div>
                  <div className="text-sm text-gray-600">
                    Thanh toán qua ví điện tử VNPay
                  </div>
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
