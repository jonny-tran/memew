"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Package, Eye } from "lucide-react";

// Mock data cho danh sách đơn hàng
const mockOrders = [
  {
    id: "ORD-1703123456-ABC12",
    orderDate: "20/12/2024",
    status: "delivered",
    statusText: "Đã giao hàng",
    total: 560000,
    itemCount: 3,
    paymentMethod: "vnpay",
    items: [
      {
        id: "0000001-00",
        name: "ÁO THUN VỚI HỌA TIẾT LOGO MEMEW",
        color: "Trắng",
        size: "M",
        price: 200000,
        quantity: 1,
        image: "/api/placeholder/60/72",
      },
      {
        id: "0000002-00",
        name: "ÁO THUN NAM CỔ TRÒN",
        color: "Đen",
        size: "L",
        price: 180000,
        quantity: 2,
        image: "/api/placeholder/60/72",
      },
    ],
  },
  {
    id: "ORD-1703123455-DEF34",
    orderDate: "18/12/2024",
    status: "shipping",
    statusText: "Đang giao hàng",
    total: 320000,
    itemCount: 2,
    paymentMethod: "cod",
    items: [
      {
        id: "0000003-00",
        name: "MÓC KHÓA MÈO DỄ THƯƠNG",
        color: "Hồng",
        size: "One Size",
        price: 50000,
        quantity: 2,
        image: "/api/placeholder/60/72",
      },
      {
        id: "0000004-00",
        name: "STICKER MÈO MEME",
        color: "Nhiều màu",
        size: "One Size",
        price: 220000,
        quantity: 1,
        image: "/api/placeholder/60/72",
      },
    ],
  },
  {
    id: "ORD-1703123454-GHI56",
    orderDate: "15/12/2024",
    status: "preparing",
    statusText: "Đang chuẩn bị",
    total: 450000,
    itemCount: 1,
    paymentMethod: "vnpay",
    items: [
      {
        id: "0000005-00",
        name: "ÁO HOODIE MÈO MEME",
        color: "Xám",
        size: "XL",
        price: 450000,
        quantity: 1,
        image: "/api/placeholder/60/72",
      },
    ],
  },
  {
    id: "ORD-1703123453-JKL78",
    orderDate: "12/12/2024",
    status: "confirmed",
    statusText: "Đã xác nhận",
    total: 180000,
    itemCount: 2,
    paymentMethod: "cod",
    items: [
      {
        id: "0000006-00",
        name: "LY SỨ MÈO DỄ THƯƠNG",
        color: "Trắng",
        size: "One Size",
        price: 120000,
        quantity: 1,
        image: "/api/placeholder/60/72",
      },
      {
        id: "0000007-00",
        name: "ỐP LƯNG ĐIỆN THOẠI MÈO",
        color: "Đen",
        size: "iPhone 15",
        price: 60000,
        quantity: 1,
        image: "/api/placeholder/60/72",
      },
    ],
  },
  {
    id: "ORD-1703123452-MNO90",
    orderDate: "10/12/2024",
    status: "delivered",
    statusText: "Đã giao hàng",
    total: 280000,
    itemCount: 1,
    paymentMethod: "vnpay",
    items: [
      {
        id: "0000008-00",
        name: "TÚI VẢI MÈO MEME",
        color: "Be",
        size: "One Size",
        price: 280000,
        quantity: 1,
        image: "/api/placeholder/60/72",
      },
    ],
  },
];

export default function OrdersHistoryPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (orderId: string) => {
    router.push(`/order-detail?orderId=${orderId}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-foreground/5 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Lịch sử đơn hàng
              </h1>
              <p className="text-muted-foreground mt-1">
                Quản lý và theo dõi các đơn hàng của bạn
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo mã đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                title="Lọc theo trạng thái đơn hàng"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="preparing">Đang chuẩn bị</option>
                <option value="shipping">Đang giao hàng</option>
                <option value="delivered">Đã giao hàng</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {filteredOrders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Không tìm thấy đơn hàng
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || statusFilter !== "all"
                ? "Không có đơn hàng nào phù hợp với bộ lọc của bạn"
                : "Bạn chưa có đơn hàng nào"}
            </p>
            <Link href="/products">
              <Button>Bắt đầu mua sắm</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Orders List */}
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg">
                        Đơn hàng #{order.id}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Đặt ngày: {order.orderDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(order.status)}>
                        {order.statusText}
                      </Badge>
                      <div className="text-right">
                        <p className="font-semibold text-lg">
                          {formatCurrency(order.total)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.itemCount} sản phẩm
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Order Items Preview */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">
                      Sản phẩm trong đơn hàng:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 border rounded-lg"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={60}
                            height={72}
                            className="w-15 h-18 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm truncate">
                              {item.name}
                            </h5>
                            <p className="text-xs text-muted-foreground">
                              {item.color} | {item.size}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              SL: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => handleViewOrder(order.id)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Xem chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Quay về
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Tiếp theo
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
