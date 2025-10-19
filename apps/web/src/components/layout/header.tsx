"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Search, User, Heart } from "lucide-react";
import Image from "next/image";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn] = useState(true); // State để quản lý trạng thái đăng nhập - sẽ được sử dụng khi tích hợp authentication

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { name: "NEW", href: "/new" },
    { name: "ÁO THUN", href: "/ao-thun" },
    { name: "STICKER", href: "/sticker" },
    { name: "LY, CỐC", href: "/ly-coc" },
    { name: "ỐP LƯNG", href: "/op-lung" },
    { name: "MÓC KHÓA", href: "/moc-khoa" },
  ];

  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative min-h-[200px] bg-primary">
          <div className="absolute inset-0 bg-primary/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between pt-6 pb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary-foreground rounded-lg mb-2"></div>
              </div>
              <div className="flex-1 max-w-2xl mx-8">
                <div className="h-12 bg-secondary rounded-xl"></div>
              </div>
              <div className="flex items-center space-x-3">
                {isLoggedIn ? (
                  <>
                    <div className="h-10 w-20 bg-secondary rounded-xl"></div>
                    <div className="h-10 w-32 bg-secondary rounded-xl"></div>
                    <div className="h-10 w-24 bg-secondary rounded-xl"></div>
                  </>
                ) : (
                  <>
                    <div className="h-10 w-24 bg-secondary rounded-xl"></div>
                    <div className="h-10 w-20 bg-accent rounded-xl"></div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 pb-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-8 w-16 bg-secondary rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Banner Background */}
      <div
        className="relative min-h-[200px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/banner.svg')",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-primary/20"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Top Section */}
          <div className="flex items-center justify-between pt-6 pb-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex flex-col items-center">
                <div className="relative w-16 h-16 mb-2">
                  <Image
                    src="/logo-memew-white.svg"
                    alt="Memew Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pl-12 pr-4 py-3 text-lg bg-secondary border-border text-foreground placeholder-muted-foreground rounded-xl focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  {/* Favorites */}
                  <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-4 py-2">
                    <Heart className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Yêu thích</span>
                  </Button>

                  {/* Cart */}
                  <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-4 py-2">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Giỏ hàng của bạn</span>
                  </Button>

                  {/* User Account */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-4 py-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-accent-foreground font-bold text-sm">
                              NV
                            </span>
                          </div>
                          <div className="hidden lg:block text-left">
                            <div className="text-sm font-medium">
                              Nguyễn Văn A
                            </div>
                          </div>
                          <User className="h-4 w-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/profile" className="w-full">
                          Thông tin cá nhân
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/orders" className="w-full">
                          Đơn hàng
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/wishlist" className="w-full">
                          Danh sách yêu thích
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Link href="/settings" className="w-full">
                          Cài đặt
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Login Button */}
                  <Link
                    href="/login"
                    className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-4 py-2"
                  >
                    <span className="hidden sm:inline">Đăng nhập</span>
                  </Link>

                  {/* Register Button - Nổi bật hơn */}
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent rounded-xl px-6 py-2 font-semibold shadow-lg">
                    <span className="hidden sm:inline">Đăng ký</span>
                    <span className="sm:hidden">Đăng ký</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex items-center justify-center space-x-4 pb-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold px-6 py-2 rounded-xl transition-colors text-sm border border-border"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary/90 border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold px-4 py-2 rounded-lg text-center transition-colors text-sm border border-border"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
