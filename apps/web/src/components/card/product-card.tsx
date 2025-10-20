"use client";

import { useState } from "react";
import { Star, Heart, Flame, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  isFavorite?: boolean;
  promotion?: string; // Thêm promotion text
  onFavoriteToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void; // Thêm callback cho giỏ hàng
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
  isFavorite = false,
  promotion,
  onFavoriteToggle,
  onAddToCart,
}: ProductCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    onFavoriteToggle?.(id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(id);
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
    <Card className="group relative overflow-hidden bg-background border shadow-sm hover:shadow-lg transition-all duration-300 rounded-lg">
      {/* Product Image Section */}
      <div className="relative bg-muted/30 p-4">
        {/* Badge Section - Trending hoặc Promotion */}
        <div className="absolute top-3 left-3 z-10">
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
        <div className="absolute top-3 right-3 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full bg-background hover:bg-accent shadow-sm"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`w-4 h-4 ${
                favorite
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
            {rating} | <ShoppingBag className="w-3 h-3" />{" "}
            {formatReviewCount(reviewCount)}
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
          <Button onClick={handleAddToCart} className="w-full mt-3">
            <ShoppingBag className="w-4 h-4 mr-2" />
            Thêm vào giỏ hàng
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
