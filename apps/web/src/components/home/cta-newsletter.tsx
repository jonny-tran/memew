"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bell, Gift, Star, Heart } from "lucide-react";

export default function CTANewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Xử lý đăng ký email
      console.log("Đăng ký email:", email);
      setIsSubscribed(true);
      setEmail("");
      // Reset sau 3 giây
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="mb-6">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
            <Send className="w-4 h-4 mr-2" />
            Luôn Kết Nối
          </Badge>
        </div>

        {/* Main Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tham Gia Cộng Đồng Mèo Memew
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Nhận những ưu đãi độc quyền, sản phẩm mới nhất và cơ hội sở hữu
            những món đồ mèo memew siêu cute với giá siêu hời!
          </p>
        </div>

        {/* Email Subscription Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-2 border-muted-foreground/20 focus:border-primary transition-colors"
              required
            />
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
              disabled={isSubscribed}
            >
              {isSubscribed ? (
                <>
                  <Heart className="w-4 h-4 mr-2 fill-red-500" />
                  Đã đăng ký!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Đăng ký
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Ưu đãi hàng tuần</h3>
            <p className="text-sm text-muted-foreground text-center">
              Giảm giá đặc biệt và sản phẩm mới
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">
              Quà tặng độc quyền
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Sticker và phụ kiện miễn phí
            </p>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Ưu tiên mua sắm</h3>
            <p className="text-sm text-muted-foreground text-center">
              Mua sản phẩm hot trước khi hết hàng
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
