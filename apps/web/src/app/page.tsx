import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Chào mừng đến với Memew</h1>
        <p className="text-xl text-muted-foreground">
          Nền tảng thương mại điện tử cho meme mèo mew
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Kiểm tra Button</CardTitle>
            <CardDescription>
              Thử nghiệm các loại button từ shadcn/ui
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button>Button mặc định</Button>
            <Button variant="secondary">Button phụ</Button>
            <Button variant="destructive">Button xóa</Button>
            <Button variant="outline">Button viền</Button>
            <Button variant="ghost">Button trong suốt</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kiểm tra Badge</CardTitle>
            <CardDescription>
              Thử nghiệm các loại badge từ shadcn/ui
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Mặc định</Badge>
              <Badge variant="secondary">Phụ</Badge>
              <Badge variant="destructive">Xóa</Badge>
              <Badge variant="outline">Viền</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kiểm tra Form</CardTitle>
            <CardDescription>
              Thử nghiệm input và label từ shadcn/ui
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Nhập email của bạn" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <Button className="w-full">Đăng nhập</Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Nếu bạn thấy các component hiển thị đúng, shadcn/ui đã được cài đặt
          thành công! 🎉
        </p>
      </div>
    </div>
  );
}
