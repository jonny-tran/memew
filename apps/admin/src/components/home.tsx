import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  CheckCircle,
  AlertCircle,
  Settings,
  Palette,
  LogIn,
} from "lucide-react";

export function Home() {
  const [count, setCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div
      className={`min-h-screen bg-background text-foreground p-8 ${darkMode ? "dark" : ""}`}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">
            Kiểm tra cài đặt Shadcn/UI với Vite + TypeScript
          </h1>
          <p className="text-muted-foreground text-lg">
            Ứng dụng demo để kiểm tra các thành phần UI đã được cài đặt thành
            công
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link to="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Đăng nhập
              </Link>
            </Button>
          </div>
        </div>

        {/* Status Alert */}
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Trạng thái cài đặt</AlertTitle>
          <AlertDescription>
            Shadcn/UI đã được cài đặt và cấu hình thành công với Vite +
            TypeScript!
          </AlertDescription>
        </Alert>

        {/* Main Content Tabs */}
        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="components">Thành phần UI</TabsTrigger>
            <TabsTrigger value="forms">Biểu mẫu</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Button Examples */}
              <Card>
                <CardHeader>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Các loại nút khác nhau</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button>Mặc định</Button>
                    <Button variant="secondary">Phụ</Button>
                    <Button variant="destructive">Xóa</Button>
                    <Button variant="outline">Viền</Button>
                    <Button variant="ghost">Trong suốt</Button>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Nhỏ</Button>
                    <Button size="default">Vừa</Button>
                    <Button size="lg">Lớn</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Counter Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Bộ đếm tương tác</CardTitle>
                  <CardDescription>Kiểm tra state và sự kiện</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-4">{count}</div>
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => setCount(count - 1)}
                        variant="outline"
                      >
                        Giảm
                      </Button>
                      <Button onClick={() => setCount(0)} variant="secondary">
                        Reset
                      </Button>
                      <Button onClick={() => setCount(count + 1)}>Tăng</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Nhãn và trạng thái</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Mặc định</Badge>
                    <Badge variant="secondary">Phụ</Badge>
                    <Badge variant="destructive">Lỗi</Badge>
                    <Badge variant="outline">Viền</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Alert Examples */}
              <Card>
                <CardHeader>
                  <CardTitle>Alerts</CardTitle>
                  <CardDescription>Thông báo và cảnh báo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Thông tin</AlertTitle>
                    <AlertDescription>
                      Đây là thông báo thông tin cơ bản.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Biểu mẫu mẫu</CardTitle>
                <CardDescription>Kiểm tra các thành phần form</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên</Label>
                    <Input
                      id="name"
                      placeholder="Nhập tên của bạn"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Giá trị nhập:{" "}
                    <span className="font-mono">{inputValue || "Trống"}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Cài đặt ứng dụng
                </CardTitle>
                <CardDescription>
                  Tùy chỉnh giao diện và hành vi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Chế độ tối</Label>
                    <p className="text-sm text-muted-foreground">
                      Bật/tắt giao diện tối
                    </p>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="h-4 w-4" />
                    <span className="font-medium">Thông tin theme</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Chế độ hiện tại:
                      </span>
                      <Badge variant="outline" className="ml-2">
                        {darkMode ? "Tối" : "Sáng"}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        CSS Variables:
                      </span>
                      <Badge variant="secondary" className="ml-2">
                        Hoạt động
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground border-t pt-8">
          <p>
            Ứng dụng demo Shadcn/UI với Vite + TypeScript • Tất cả thành phần
            đang hoạt động bình thường ✅
          </p>
        </div>
      </div>
    </div>
  );
}
