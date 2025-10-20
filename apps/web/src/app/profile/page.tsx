"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User, Camera } from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    username: "A Nguyễn",
    name: "Nguyễn Văn A",
    email: "ng***********@gmail.com",
    phone: "*********01",
    gender: "male",
    birthDate: "**/**/****",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving profile data:", formData);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-foreground/5 border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Hồ sơ của tôi</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card">
              <div className="flex flex-col items-center space-y-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-accent rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-accent-foreground" />
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-muted hover:bg-muted/80"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Chọn Ảnh
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Profile Information Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card">
              <div className="space-y-6">
                {/* Username */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label
                    htmlFor="username"
                    className="text-foreground font-medium"
                  >
                    Tên đăng nhập
                  </Label>
                  <div className="md:col-span-2">
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Tên
                  </Label>
                  <div className="md:col-span-2">
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label
                    htmlFor="email"
                    className="text-foreground font-medium"
                  >
                    Email
                  </Label>
                  <div className="md:col-span-2">
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label
                    htmlFor="phone"
                    className="text-foreground font-medium"
                  >
                    Số điện thoại
                  </Label>
                  <div className="md:col-span-2">
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label className="text-foreground font-medium">
                    Giới tính
                  </Label>
                  <div className="md:col-span-2">
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                      className="flex flex-row gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="text-foreground">
                          Nam
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="text-foreground">
                          Nữ
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="text-foreground">
                          Khác
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Birth Date */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label
                    htmlFor="birthDate"
                    className="text-foreground font-medium"
                  >
                    Ngày sinh
                  </Label>
                  <div className="md:col-span-2">
                    <Input
                      id="birthDate"
                      value={formData.birthDate}
                      onChange={(e) =>
                        handleInputChange("birthDate", e.target.value)
                      }
                      className="border-0 border-b border-border rounded-none bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-6">
                  <Button
                    onClick={handleSave}
                    className="bg-destructive hover:bg-destructive/90 text-white px-8 py-2"
                  >
                    Lưu
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
