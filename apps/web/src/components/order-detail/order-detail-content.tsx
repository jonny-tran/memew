"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle,
  Circle,
  Phone,
  Mail,
} from "lucide-react";

// Dummy data cho trang order detail
const dummyOrderDetail = {
  orderId: "ORD-1703123456-ABC12",
  status: "confirmed", // confirmed, preparing, shipping, delivered
  statusText: "Đã xác nhận",
  orderDate: "20 tháng 12, 2024",
  estimatedDelivery: "23 tháng 12, 2024",
  paymentMethod: "cod",
  paymentStatus: "pending",
  shippingAddress: {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  },
  items: [
    {
      id: "0000001-00",
      name: "ÁO THUN VỚI HỌA TIẾT LOGO MEMEW",
      color: "Trắng",
      size: "M",
      price: 200000,
      originalPrice: 250000,
      quantity: 1,
      image: "/api/placeholder/100/120",
    },
    {
      id: "0000002-00",
      name: "ÁO THUN NAM CỔ TRÒN",
      color: "Đen",
      size: "L",
      price: 180000,
      originalPrice: 220000,
      quantity: 2,
      image: "/api/placeholder/100/120",
    },
  ],
  pricing: {
    subtotal: 560000,
    shipping: 0,
    discount: 90000,
    total: 560000,
  },
  timeline: [
    {
      status: "confirmed",
      title: "Đơn hàng đã được xác nhận",
      description: "Chúng tôi đã nhận được đơn hàng của bạn",
      date: "20/12/2024 14:30",
      completed: true,
    },
    {
      status: "preparing",
      title: "Đang chuẩn bị hàng",
      description: "Đơn hàng đang được chuẩn bị và đóng gói",
      date: "21/12/2024 09:00",
      completed: true,
    },
    {
      status: "shipping",
      title: "Đang giao hàng",
      description: "Đơn hàng đang trên đường đến bạn",
      date: "22/12/2024 08:00",
      completed: false,
    },
    {
      status: "delivered",
      title: "Giao hàng thành công",
      description: "Đơn hàng đã được giao thành công",
      date: "Dự kiến: 23/12/2024",
      completed: false,
    },
  ],
};

export function OrderDetailContent() {
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "shipping":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Chi tiết đơn hàng
              </h1>
              <p className="text-gray-600">
                Mã đơn hàng: {dummyOrderDetail.orderId}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Package className="h-5 w-5" />
                    Trạng thái đơn hàng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getStatusColor(dummyOrderDetail.status)}>
                      {dummyOrderDetail.statusText}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      Đặt ngày: {dummyOrderDetail.orderDate}
                    </span>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-4">
                    {dummyOrderDetail.timeline.map((step, index) => (
                      <div key={step.status} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300" />
                          )}
                          {index < dummyOrderDetail.timeline.length - 1 && (
                            <div className="w-px h-8 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{step.title}</h4>
                          <p className="text-xs text-gray-600 mb-1">
                            {step.description}
                          </p>
                          <p className="text-xs text-gray-500">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Sản phẩm đã đặt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dummyOrderDetail.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border rounded-lg"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={96}
                        className="w-20 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Màu: {item.color} | Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                        {item.originalPrice > item.price && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(item.originalPrice * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    Địa chỉ giao hàng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">
                      {dummyOrderDetail.shippingAddress.name}
                    </p>
                    <p className="text-gray-600">
                      {dummyOrderDetail.shippingAddress.address}
                    </p>
                    <p className="text-gray-600">
                      {dummyOrderDetail.shippingAddress.phone}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Mã đơn hàng</p>
                        <p className="text-xs text-gray-600">
                          {dummyOrderDetail.orderId}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Dự kiến giao hàng</p>
                        <p className="text-xs text-gray-600">
                          {dummyOrderDetail.estimatedDelivery}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Thanh toán</p>
                        <p className="text-xs text-gray-600">
                          {dummyOrderDetail.paymentMethod === "cod"
                            ? "COD - Chưa thanh toán"
                            : "VNPay - Đã thanh toán"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tạm tính:</span>
                      <span>
                        {formatCurrency(dummyOrderDetail.pricing.subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Giảm giá:</span>
                      <span>
                        -{formatCurrency(dummyOrderDetail.pricing.discount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Phí vận chuyển:</span>
                      <span className="text-green-600">Miễn phí</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span>
                      {formatCurrency(dummyOrderDetail.pricing.total)}
                    </span>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleContinueShopping}
                      className="w-full bg-black text-white hover:bg-gray-800"
                    >
                      Tiếp tục mua sắm
                    </Button>
                  </div>

                  {/* Contact Support */}
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium mb-2">Cần hỗ trợ?</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a
                          href="tel:0123456789"
                          className="text-blue-600 hover:underline"
                        >
                          0123 456 789
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a
                          href="mailto:support@memew.com"
                          className="text-blue-600 hover:underline"
                        >
                          support@memew.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
