import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function AdminMetrics() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tỷ Lệ Chuyển Đổi</CardTitle>
          <CardDescription>Khách truy cập thành đơn hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Hiện tại</span>
              <span className="font-medium">3.2%</span>
            </div>
            <Progress value={32} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mục tiêu: 4.0%</span>
              <span>+0.5% so với tháng trước</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Đánh Giá Trung Bình</CardTitle>
          <CardDescription>Sản phẩm được đánh giá</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">4.6</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Dựa trên 1,247 đánh giá
            </div>
            <Badge variant="outline" className="text-green-600">
              +0.2 so với tháng trước
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tồn Kho Cảnh Báo</CardTitle>
          <CardDescription>Sản phẩm sắp hết hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Sắp hết hàng (&lt;20)</span>
              <Badge variant="destructive">8 sản phẩm</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Hết hàng</span>
              <Badge variant="outline">3 sản phẩm</Badge>
            </div>
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">
                Cần nhập hàng gấp: Quần Jeans Nữ, Váy Đầm Hè, Giày Boots
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Đơn Hàng Chờ Xử Lý</CardTitle>
          <CardDescription>Trạng thái đơn hàng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Chờ xác nhận</span>
              <Badge variant="outline">12 đơn</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Đang giao hàng</span>
              <Badge variant="secondary">28 đơn</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Hoàn thành</span>
              <Badge variant="default">1,807 đơn</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Sản Phẩm Bán Chạy</CardTitle>
          <CardDescription>Tháng này</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">1. Áo Thun Nam Basic</span>
              <span className="text-sm font-medium">45 bán</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">2. Áo Ba Lỗ</span>
              <span className="text-sm font-medium">42 bán</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">3. Váy Đầm Hè</span>
              <span className="text-sm font-medium">52 bán</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Khách Hàng Hoạt Động</CardTitle>
          <CardDescription>Trong 24h qua</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Đang online</span>
              <Badge variant="default">247 người</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Đã đăng ký</span>
              <span className="text-sm font-medium">18 người</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Đã mua hàng</span>
              <span className="text-sm font-medium">32 người</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
