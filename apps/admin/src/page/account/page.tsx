import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAccountStore } from "@/store/accountStore";
import { Upload } from "@/components/ui/upload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Loader2,
  LogOut,
  User,
  Store,
  Globe,
  Share2,
  Search,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * AccountPage - quản lý thông tin tài khoản và nội dung website
 */
export default function AccountPage() {
  const { account, isLoading, error, fetchAccount, updateAccount, logout } =
    useAccountStore();
  const [form, setForm] = useState(account);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    setForm(account);
  }, [account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAccount(form);
  };

  const handleReset = () => {
    setForm(account);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Tài khoản & Website</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý thông tin tài khoản và nội dung website khách hàng
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Tài khoản
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              Thông tin shop
            </TabsTrigger>
            <TabsTrigger value="website" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Nội dung website
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              SEO & Mạng xã hội
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader className="text-center">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    {form.avatarUrl ? (
                      <img
                        src={form.avatarUrl}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <CardTitle className="text-xl">{form.adminName}</CardTitle>
                  <p className="text-sm text-muted-foreground">{form.email}</p>
                </CardHeader>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Thông tin tài khoản
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Cập nhật thông tin cá nhân và cài đặt tài khoản
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Tên quản trị <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={form.adminName || ""}
                          onChange={(e) =>
                            setForm({ ...form, adminName: e.target.value })
                          }
                          placeholder="Nhập tên quản trị"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          value={form.email || ""}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="admin@example.com"
                          required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="block text-sm font-medium">
                          Ảnh đại diện
                        </label>
                        <Upload
                          value={form.avatarUrl}
                          onChange={(url: string | null) =>
                            setForm({ ...form, avatarUrl: url })
                          }
                          maxSize={5}
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    <div className="flex gap-3 justify-between items-center">
                      <div className="flex gap-3">
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

                      <Dialog
                        open={showLogoutDialog}
                        onOpenChange={setShowLogoutDialog}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="destructive"
                            className="flex items-center gap-2"
                          >
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Xác nhận đăng xuất</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-sm text-muted-foreground">
                              Bạn có chắc chắn muốn đăng xuất khỏi phiên làm
                              việc?
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                              Tất cả các thay đổi chưa lưu sẽ bị mất.
                            </p>
                          </div>
                          <DialogFooter className="flex justify-end gap-2">
                            <Button
                              variant="secondary"
                              onClick={() => setShowLogoutDialog(false)}
                            >
                              Hủy
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={handleLogout}
                              className="flex items-center gap-2"
                            >
                              <LogOut className="w-4 h-4" />
                              Đăng xuất
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Shop Information Tab */}
          <TabsContent value="shop">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Store className="w-6 h-6" />
                  Thông tin cửa hàng
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Cấu hình thông tin hiển thị trên website khách hàng
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Tên cửa hàng <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={form.shopName || ""}
                        onChange={(e) =>
                          setForm({ ...form, shopName: e.target.value })
                        }
                        placeholder="Nhập tên cửa hàng"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Email liên hệ <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        value={form.contactEmail || ""}
                        onChange={(e) =>
                          setForm({ ...form, contactEmail: e.target.value })
                        }
                        placeholder="contact@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Số điện thoại
                      </label>
                      <Input
                        value={form.phoneNumber || ""}
                        onChange={(e) =>
                          setForm({ ...form, phoneNumber: e.target.value })
                        }
                        placeholder="0123 456 789"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Địa chỉ
                      </label>
                      <Input
                        value={form.address || ""}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        placeholder="123 Đường ABC, Quận 1, TP.HCM"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-medium">
                        Mô tả cửa hàng
                      </label>
                      <Textarea
                        value={form.shopDescription || ""}
                        onChange={(e) =>
                          setForm({ ...form, shopDescription: e.target.value })
                        }
                        placeholder="Nhập mô tả về cửa hàng..."
                        rows={4}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="block text-sm font-medium">
                        Logo cửa hàng
                      </label>
                      <Upload
                        value={form.shopLogoUrl}
                        onChange={(url: string | null) =>
                          setForm({ ...form, shopLogoUrl: url })
                        }
                        maxSize={5}
                      />
                    </div>
                  </div>

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
          </TabsContent>

          {/* Website Content Tab */}
          <TabsContent value="website">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Trang chủ
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Nội dung hiển thị trên trang chủ
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Hero Text
                      </label>
                      <Textarea
                        value={form.homepageHeroText || ""}
                        onChange={(e) =>
                          setForm({ ...form, homepageHeroText: e.target.value })
                        }
                        placeholder="Nhập nội dung chính hiển thị trên trang chủ..."
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Hero Image
                      </label>
                      <Upload
                        value={form.homepageHeroImage}
                        onChange={(url: string | null) =>
                          setForm({ ...form, homepageHeroImage: url })
                        }
                        maxSize={5}
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Trang giới thiệu
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Nội dung trang About Us
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Tiêu đề trang
                      </label>
                      <Input
                        value={form.aboutPageTitle || ""}
                        onChange={(e) =>
                          setForm({ ...form, aboutPageTitle: e.target.value })
                        }
                        placeholder="Về chúng tôi"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Nội dung
                      </label>
                      <Textarea
                        value={form.aboutPageContent || ""}
                        onChange={(e) =>
                          setForm({ ...form, aboutPageContent: e.target.value })
                        }
                        placeholder="Nhập nội dung giới thiệu..."
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Hình ảnh
                      </label>
                      <Upload
                        value={form.aboutPageImage}
                        onChange={(url: string | null) =>
                          setForm({ ...form, aboutPageImage: url })
                        }
                        maxSize={5}
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
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
          </TabsContent>

          {/* SEO & Social Media Tab */}
          <TabsContent value="seo">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    SEO
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Cài đặt SEO cho website
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Meta Title
                      </label>
                      <Input
                        value={form.metaTitle || ""}
                        onChange={(e) =>
                          setForm({ ...form, metaTitle: e.target.value })
                        }
                        placeholder="Tiêu đề SEO"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Meta Description
                      </label>
                      <Textarea
                        value={form.metaDescription || ""}
                        onChange={(e) =>
                          setForm({ ...form, metaDescription: e.target.value })
                        }
                        placeholder="Mô tả SEO..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Meta Keywords
                      </label>
                      <Input
                        value={form.metaKeywords.join(", ")}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            metaKeywords: e.target.value
                              .split(",")
                              .map((s) => s.trim()),
                          })
                        }
                        placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
                      />
                      <p className="text-xs text-muted-foreground">
                        Phân cách các từ khóa bằng dấu phẩy
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Mạng xã hội
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Liên kết mạng xã hội
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Facebook
                      </label>
                      <Input
                        value={form.facebookUrl || ""}
                        onChange={(e) =>
                          setForm({ ...form, facebookUrl: e.target.value })
                        }
                        placeholder="https://facebook.com/yourpage"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Instagram
                      </label>
                      <Input
                        value={form.instagramUrl || ""}
                        onChange={(e) =>
                          setForm({ ...form, instagramUrl: e.target.value })
                        }
                        placeholder="https://instagram.com/yourpage"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Twitter
                      </label>
                      <Input
                        value={form.twitterUrl || ""}
                        onChange={(e) =>
                          setForm({ ...form, twitterUrl: e.target.value })
                        }
                        placeholder="https://twitter.com/yourpage"
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex justify-end">
              <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
