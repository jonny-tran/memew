"use client";

import { useRouter } from "next/navigation";
import { Star, Heart, Flame, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { toast } from "sonner";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  isTrending?: boolean;
  promotion?: string; // Thêm promotion text
  onAddToCart?: (id: string) => void; // Giữ lại để tương thích ngược
}

export default function ProductCard({
  id,
  title,
  description,
  image,
  currentPrice,
  originalPrice,
  discount,
  rating,
  reviewCount,
  isTrending = false,
  promotion,
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const handleFavoriteClick = () => {
    const wishlistItem = {
      FavoriteProductID: `fav-${id}`,
      CustomerID: "customer-1", // Sẽ được thay thế bằng customer ID thực tế
      ProductID: id,
      Product: {
        ProductID: id,
        Name: title,
        Images: [image],
        Type: "PRODUCT",
        Status: "ACTIVE",
        Description: description,
        CurrentPrice: currentPrice,
        OriginalPrice: originalPrice,
        Discount: discount,
        Rating: rating,
        ReviewCount: reviewCount,
        IsTrending: isTrending,
        Promotion: promotion,
      },
    };

    const isCurrentlyInWishlist = isInWishlist(id);
    toggleItem(wishlistItem);

    if (isCurrentlyInWishlist) {
      toast.success(`Đã xóa ${title} khỏi danh sách yêu thích`);
    } else {
      toast.success(`Đã thêm ${title} vào danh sách yêu thích`);
    }
  };

  const handleAddToCart = () => {
    // Nếu có callback từ parent, gọi nó
    if (onAddToCart) {
      onAddToCart(id);
      return;
    }

    // Nếu không có callback, sử dụng cart hook trực tiếp
    addItem({
      ProductID: id,
      Product: {
        ProductID: id,
        Name: title,
        Images: [image],
        Type: "PRODUCT",
        Status: "ACTIVE",
        Description: description,
      },
      UnitPrice: currentPrice,
      Size: "M",
      Color: "Đen",
    });

    toast.success(`Đã thêm ${title} vào giỏ hàng`);
  };

  const handleCardClick = () => {
    router.push(`/products/${id}`);
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("vi-VN")}đ`;
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <Card
      className="group relative overflow-hidden bg-background border shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image Section */}
      <div className="relative bg-muted/30 p-4">
        {/* Badge Section - Trending hoặc Promotion */}
        <div className="absolute left-3 z-10">
          {isTrending && (
            <Badge className="bg-primary text-primary-foreground rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1">
              <Flame className="w-3 h-3" />
              Trending
            </Badge>
          )}
          {promotion && !isTrending && (
            <Badge className="bg-destructive text-destructive-foreground rounded-md px-2 py-1 text-xs font-medium">
              {promotion}
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <div className="absolute right-3 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full bg-background hover:bg-accent shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick();
            }}
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist(id)
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>

        {/* Product Image */}
        <div className="relative w-full h-48 flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            width={200}
            height={200}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-background/90 text-foreground rounded-md px-2 py-1 text-xs font-medium flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {rating} | {formatReviewCount(reviewCount)} đánh giá
          </Badge>
        </div>
      </div>

      {/* Product Details Section */}
      <CardContent className="p-4 bg-background">
        <div className="space-y-2">
          {/* Product Title */}
          <h3 className="font-bold text-lg text-foreground leading-tight">
            {title}
          </h3>

          {/* Product Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xl font-bold text-foreground">
              {formatPrice(currentPrice)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({discount}% OFF)
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="w-full mt-3"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Thêm vào giỏ hàng
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
