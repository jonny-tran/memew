"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface CartToastProps {
  isVisible: boolean;
  onClose: () => void;
  productName: string;
}

export function CartToast({ isVisible, onClose, productName }: CartToastProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-[220px] right-4 z-50 max-w-sm">
      <Card
        className={`transform transition-all duration-300 ${
          isAnimating
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground">
                Đã thêm vào giỏ hàng
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {productName}
              </p>

              <div className="flex gap-2 mt-3">
                <Link href="/cart">
                  <Button size="sm" className="text-xs">
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Xem giỏ hàng
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-xs"
                >
                  Tiếp tục mua sắm
                </Button>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex-shrink-0 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
