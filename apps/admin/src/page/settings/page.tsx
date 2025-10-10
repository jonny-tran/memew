import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/store/settingsStore";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Settings,
  Shield,
  Bell,
  Database,
  Clock,
  Lock,
} from "lucide-react";

/**
 * SettingsPage - quản lý cài đặt hệ thống
 */
export default function SettingsPage() {
  const { settings, isLoading, error, fetchSettings, updateSettings } =
    useSettingsStore();
  const [form, setForm] = useState(settings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(form);
  };

  const handleReset = () => {
    setForm(settings);
  };

  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Cài đặt hệ thống</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý các cài đặt kỹ thuật và bảo mật của hệ thống
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Settings */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <CardTitle className="text-xl">Cài đặt hệ thống</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Cấu hình các thông số kỹ thuật của hệ thống
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Chế độ bảo trì
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Tạm dừng website để bảo trì
                      </p>
                    </div>
                    <Switch
                      checked={form.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setForm({ ...form, maintenanceMode: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-sm font-medium">
                        Cho phép đăng ký
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Cho phép khách hàng đăng ký tài khoản mới
                      </p>
                    </div>
                    <Switch
                      checked={form.allowRegistration}
                      onCheckedChange={(checked) =>
                        setForm({ ...form, allowRegistration: checked })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Kích thước file tối đa (MB)
                    </label>
                    <Input
                      type="number"
                      value={form.maxFileSize}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          maxFileSize: parseInt(e.target.value),
                        })
                      }
                      min="1"
                      max="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Timeout phiên (phút)
                    </label>
                    <Input
                      type="number"
                      value={form.sessionTimeout}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          sessionTimeout: parseInt(e.target.value),
                        })
                      }
                      min="5"
                      max="480"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Tần suất backup
                    </label>
                    <Select
                      value={form.backupFrequency}
                      onValueChange={(value: "daily" | "weekly" | "monthly") =>
                        setForm({ ...form, backupFrequency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Hàng ngày</SelectItem>
                        <SelectItem value="weekly">Hàng tuần</SelectItem>
                        <SelectItem value="monthly">Hàng tháng</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security & Notifications */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <CardTitle className="text-xl">Bảo mật & Thông báo</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Cài đặt bảo mật và hệ thống thông báo
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Xác thực 2 yếu tố
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Yêu cầu mã xác thực khi đăng nhập
                    </p>
                  </div>
                  <Switch
                    checked={form.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, twoFactorAuth: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Thông báo email
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Gửi thông báo qua email
                    </p>
                  </div>
                  <Switch
                    checked={form.emailNotifications}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Thông báo SMS</label>
                    <p className="text-xs text-muted-foreground">
                      Gửi thông báo qua tin nhắn SMS
                    </p>
                  </div>
                  <Switch
                    checked={form.smsNotifications}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, smsNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Tự động backup
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Tự động sao lưu dữ liệu định kỳ
                    </p>
                  </div>
                  <Switch
                    checked={form.autoBackup}
                    onCheckedChange={(checked) =>
                      setForm({ ...form, autoBackup: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">Cài đặt nâng cao</CardTitle>
            <p className="text-sm text-muted-foreground">
              Các cài đặt chuyên sâu cho hệ thống
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Loại file được phép
                  </label>
                  <Input
                    value={form.allowedFileTypes.join(", ")}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        allowedFileTypes: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    placeholder="jpg, png, pdf, doc"
                  />
                  <p className="text-xs text-muted-foreground">
                    Các loại file được phép upload, phân cách bởi dấu phẩy
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Hủy thay đổi
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
