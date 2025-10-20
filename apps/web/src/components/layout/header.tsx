"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { ShoppingCart, Search, User, Heart, Menu, X } from "lucide-react";
import Image from "next/image";
import { CartBadge } from "@/components/cart";
import { useCart } from "@/hooks/use-cart";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn] = useState(true); // State để quản lý trạng thái đăng nhập - sẽ được sử dụng khi tích hợp authentication
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount: cartItemCount, isLoading: cartLoading } = useCart();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { name: "NEW", href: "/products?category=New" },
    { name: "ÁO THUN", href: "/products?category=Shirt" },
    { name: "STICKER", href: "/products?category=Sticker" },
    { name: "LY, CỐC", href: "/products?category=Cup" },
    { name: "ỐP LƯNG", href: "/products?category=PhoneCase" },
    { name: "MÓC KHÓA", href: "/products?category=Keyring" },
  ];

  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="relative min-h-[120px] md:min-h-[200px] bg-primary">
          <div className="absolute inset-0 bg-primary/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex items-center justify-between pt-4 pb-2 md:pt-6 md:pb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-foreground rounded-lg"></div>
              </div>
              <div className="flex-1 max-w-md md:max-w-2xl mx-4 md:mx-8">
                <div className="h-10 md:h-12 bg-secondary rounded-xl"></div>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                {isLoggedIn ? (
                  <>
                    <div className="h-8 w-8 md:h-10 md:w-20 bg-secondary rounded-xl"></div>
                    <div className="h-8 w-8 md:h-10 md:w-32 bg-secondary rounded-xl"></div>
                    <div className="h-8 w-8 md:h-10 md:w-24 bg-secondary rounded-xl"></div>
                  </>
                ) : (
                  <>
                    <div className="h-8 w-8 md:h-10 md:w-24 bg-secondary rounded-xl"></div>
                    <div className="h-8 w-8 md:h-10 md:w-20 bg-accent rounded-xl"></div>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center space-x-4 pb-6">
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
        className="relative min-h-[120px] md:min-h-[200px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/banner.svg')",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-primary/20"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Top Section */}
          <div className="flex items-center justify-between pt-4 pb-2 md:pt-6 md:pb-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex flex-col items-center">
                <div className="relative w-12 h-12 md:w-16 md:h-16">
                  <Image
                    src="/logo-memew-white.svg"
                    alt="Memew Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            </div>

            {/* Search Bar - Hidden on mobile, shown on tablet+ */}
            <div className="hidden md:flex flex-1 max-w-md lg:max-w-2xl mx-4 lg:mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-secondary border-border text-foreground placeholder-muted-foreground rounded-xl focus:ring-2 focus:ring-accent"
                />
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {isLoggedIn ? (
                <>
                  {/* Favorites - Icon only on mobile */}
                  <Link href="/wishlist">
                    <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-2 md:px-4 py-2 relative">
                      <Heart className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Yêu thích</span>
                    </Button>
                  </Link>

                  {/* Cart - Icon only on mobile */}
                  <Link href="/cart">
                    <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-2 md:px-4 py-2 relative">
                      <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Giỏ hàng</span>
                      {isMounted && !cartLoading && (
                        <CartBadge count={cartItemCount} />
                      )}
                    </Button>
                  </Link>

                  {/* User Account - Simplified on mobile */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-2 md:px-4 py-2">
                        <div className="flex items-center space-x-1 md:space-x-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-accent rounded-full flex items-center justify-center">
                            <span className="text-accent-foreground font-bold text-xs md:text-sm">
                              NV
                            </span>
                          </div>
                          <div className="hidden lg:block text-left">
                            <div className="text-sm font-medium">
                              Nguyễn Văn A
                            </div>
                          </div>
                          <User className="h-3 w-3 md:h-4 md:w-4" />
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
                        <Link href="/orders-history" className="w-full">
                          Đơn hàng
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  {/* Login Button - Icon only on mobile */}
                  <Link
                    href="/login"
                    className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-2 md:px-4 py-2 flex items-center"
                  >
                    <User className="h-4 w-4 md:hidden" />
                    <span className="hidden md:inline">Đăng nhập</span>
                  </Link>

                  {/* Register Button - Simplified on mobile */}
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent rounded-xl px-3 md:px-6 py-2 font-semibold shadow-lg">
                    <span className="hidden sm:inline">Đăng ký</span>
                    <span className="sm:hidden text-xs">ĐK</span>
                  </Button>
                </>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-xl px-2 py-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Category Navigation - Hidden on mobile, shown on tablet+ */}
          <div className="hidden md:flex items-center justify-center space-x-2 lg:space-x-4 pb-4 lg:pb-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold px-3 lg:px-6 py-2 rounded-xl transition-colors text-xs lg:text-sm border border-border"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary/95 border-t border-border backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-secondary border-border text-foreground placeholder-muted-foreground rounded-lg"
                />
              </form>
            </div>

            {/* Mobile Categories */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold px-4 py-3 rounded-lg text-center transition-colors text-sm border border-border"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Mobile User Actions */}
            {!isLoggedIn && (
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Link
                  href="/login"
                  className="bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border rounded-lg px-4 py-3 text-center transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/signup"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground border-accent rounded-lg px-4 py-3 text-center transition-colors font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
