"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Clock, MapPin } from "lucide-react";

// Dummy data cho trang order success
const dummyOrderData = {
  orderId: "ORD-1703123456-ABC12",
  items: [
    {
      id: "0000001-00",
      name: "ÁO THUN VỚI HỌA TIẾT LOGO MEMEW",
      color: "Trắng",
      size: "M",
      price: 200000,
      quantity: 1,
      image: "/api/placeholder/100/120",
    },
    {
      id: "0000002-00",
      name: "ÁO THUN NAM CỔ TRÒN",
      color: "Đen",
      size: "L",
      price: 180000,
      quantity: 2,
      image: "/api/placeholder/100/120",
    },
  ],
  total: 560000,
  paymentMethod: "cod",
  estimatedDelivery: "Thứ Hai, 23 tháng 12, 2024",
};

export function OrderSuccessContent() {
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleViewOrder = () => {
    router.push("/order-detail");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-600">
              Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
            </p>
          </div>

          {/* Order Information */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Mã đơn hàng</p>
                    <p className="text-gray-600">{dummyOrderData.orderId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Dự kiến giao hàng</p>
                    <p className="text-gray-600">
                      {dummyOrderData.estimatedDelivery}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Phương thức thanh toán</p>
                    <p className="text-gray-600">
                      {dummyOrderData.paymentMethod === "cod"
                        ? "Thanh toán khi nhận hàng (COD)"
                        : "VNPay"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Sản phẩm đã đặt</h3>
              <div className="space-y-3">
                {dummyOrderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={56}
                      className="w-12 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-600">
                        Màu: {item.color} | Size: {item.size} | SL:{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tổng cộng:</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(dummyOrderData.total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Bước tiếp theo</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 font-bold text-xs">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Xác nhận đơn hàng</p>
                    <p>
                      Chúng tôi sẽ gửi email xác nhận đến bạn trong vài phút
                      tới.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-orange-600 font-bold text-xs">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Chuẩn bị hàng</p>
                    <p>Đơn hàng của bạn đang được chuẩn bị và đóng gói.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-xs">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Giao hàng</p>
                    <p>Đơn hàng sẽ được giao đến địa chỉ bạn đã cung cấp.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleContinueShopping}
              className="flex-1 bg-black text-white hover:bg-gray-800"
            >
              Tiếp tục mua sắm
            </Button>
            <Button
              onClick={handleViewOrder}
              variant="outline"
              className="flex-1"
            >
              Xem chi tiết đơn hàng
            </Button>
          </div>

          {/* Contact Info */}
          <div className="text-center mt-8 text-sm text-gray-600">
            <p>
              Có câu hỏi? Liên hệ với chúng tôi tại{" "}
              <a
                href="mailto:support@memew.com"
                className="text-blue-600 hover:underline"
              >
                support@memew.com
              </a>{" "}
              hoặc{" "}
              <a
                href="tel:0123456789"
                className="text-blue-600 hover:underline"
              >
                0123 456 789
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
