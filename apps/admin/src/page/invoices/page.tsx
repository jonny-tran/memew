import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  Search,
  Loader2,
  AlertCircle,
  Package,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useOrderStore } from "@/store/orderStore";
import type { OrderStatus, Order } from "@/store/orderStore";
import { DashboardLayout } from "@/layouts/dashboard-layout";

function getStatusBadge(status: OrderStatus) {
  const statusMap: Record<OrderStatus, { text: string; className: string }> = {
    Pending: {
      text: "Chờ xử lý",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    },
    Processing: {
      text: "Đang xử lý",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    },
    Delivered: {
      text: "Đã giao",
      className: "bg-green-100 text-green-800 hover:bg-green-100",
    },
    Cancelled: {
      text: "Đã hủy",
      className: "bg-red-100 text-red-800 hover:bg-red-100",
    },
    Refunded: {
      text: "Hoàn tiền",
      className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    },
  };

  const config = statusMap[status];
  return (
    <Badge variant="secondary" className={config.className}>
      {config.text}
    </Badge>
  );
}

function getPaymentMethodText(method: string) {
  const methodMap: Record<string, string> = {
    Cash: "Tiền mặt",
    VNPay: "VNPay",
    BankTransfer: "Chuyển khoản",
  };
  return methodMap[method] || method;
}

export default function InvoicesPage() {
  const {
    orders,
    isLoading,
    error,
    fetchOrders,
    updateOrderStatus,
    deleteOrder,
  } = useOrderStore();

  // Local state
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>("Pending");

  // Load data on component mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
      order.customerName
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase()) ||
      order.customerEmail
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Event handlers
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsDetailDialogOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      await updateOrderStatus(selectedOrder.id, newStatus);
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId);
      if (selectedOrder?.id === orderId) {
        setIsDetailDialogOpen(false);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const getTotalItems = (order: Order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Quản lý đơn hàng
            </h1>
            <p className="text-muted-foreground">
              Quản lý danh sách đơn hàng và cập nhật trạng thái
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo ID, tên khách hàng, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value: OrderStatus | "All") =>
              setStatusFilter(value)
            }
          >
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Lọc theo trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Tất cả trạng thái</SelectItem>
              <SelectItem value="Pending">Chờ xử lý</SelectItem>
              <SelectItem value="Processing">Đang xử lý</SelectItem>
              <SelectItem value="Delivered">Đã giao</SelectItem>
              <SelectItem value="Cancelled">Đã hủy</SelectItem>
              <SelectItem value="Refunded">Hoàn tiền</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Main Content Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                Danh sách đơn hàng
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Tổng: {filteredOrders.length} đơn hàng
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Đang tải...</span>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Ngày đặt</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Tùy chọn</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-muted-foreground"
                      >
                        {searchQuery.trim() || statusFilter !== "All"
                          ? "Không tìm thấy đơn hàng nào"
                          : "Chưa có đơn hàng nào"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.customerName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.customerEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            {getTotalItems(order)} sản phẩm
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(order.orderDate).toLocaleDateString(
                            "vi-VN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                            className="flex items-center gap-1"
                          >
                            <Eye className="h-4 w-4" />
                            Xem chi tiết
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Order Detail Dialog */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Chi tiết đơn hàng {selectedOrder?.id}
              </DialogTitle>
            </DialogHeader>

            {selectedOrder && (
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Thông tin khách hàng
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {selectedOrder.customerName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedOrder.customerPhone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Thông tin đơn hàng
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(selectedOrder.orderDate).toLocaleString(
                            "vi-VN"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          Thanh toán:
                        </span>
                        <span className="font-medium">
                          {getPaymentMethodText(selectedOrder.paymentMethod)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          Trạng thái:
                        </span>
                        {getStatusBadge(selectedOrder.status)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Địa chỉ giao hàng
                  </h3>
                  <p className="text-sm bg-gray-50 p-3 rounded-md">
                    {selectedOrder.shippingAddress}
                  </p>
                </div>

                {/* Order Items */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Sản phẩm đã đặt</h3>
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Sản phẩm</TableHead>
                          <TableHead className="text-center">
                            Số lượng
                          </TableHead>
                          <TableHead className="text-right">Đơn giá</TableHead>
                          <TableHead className="text-right">
                            Thành tiền
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              {item.unitPrice.toLocaleString()}đ
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {(
                                item.unitPrice * item.quantity
                              ).toLocaleString()}
                              đ
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex justify-end">
                    <div className="text-right space-y-1">
                      <div className="text-sm text-muted-foreground">
                        Tổng cộng:
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {selectedOrder.total.toLocaleString()}đ
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Ghi chú</h3>
                    <p className="text-sm bg-yellow-50 p-3 rounded-md border border-yellow-200">
                      {selectedOrder.notes}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <div className="flex-1">
                    <Label htmlFor="status-select">Cập nhật trạng thái</Label>
                    <Select
                      value={newStatus}
                      onValueChange={(value: OrderStatus) =>
                        setNewStatus(value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Chờ xử lý</SelectItem>
                        <SelectItem value="Processing">Đang xử lý</SelectItem>
                        <SelectItem value="Delivered">Đã giao</SelectItem>
                        <SelectItem value="Cancelled">Đã hủy</SelectItem>
                        <SelectItem value="Refunded">Hoàn tiền</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpdateStatus}
                      disabled={isLoading || newStatus === selectedOrder.status}
                    >
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Cập nhật
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Hủy đơn</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Xác nhận hủy đơn hàng
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Bạn có chắc chắn muốn hủy đơn hàng{" "}
                            {selectedOrder.id}? Hành động này không thể hoàn
                            tác.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Không</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteOrder(selectedOrder.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Hủy đơn
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDetailDialogOpen(false)}
              >
                Đóng
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
