"use client";

import { useState } from "react";
import { TrendingUp, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/card/product-card";

// Dữ liệu mẫu cho sản phẩm bán chạy - Memew Mèo
const bestsellerProducts = [
  {
    id: "1",
    title: "Áo Thun Memew Mèo Cute",
    description:
      "Áo thun in hình mèo memew siêu cute, chất liệu cotton mềm mại, thiết kế độc đáo thu hút mọi ánh nhìn",
    image: "/api/placeholder/300/300",
    currentPrice: 199000,
    originalPrice: 299000,
    discount: 33,
    rating: 4.8,
    reviewCount: 1250,
    isTrending: true,
    isFavorite: false,
  },
  {
    id: "2",
    title: "Móc Khóa Memew Mèo 3D",
    description:
      "Móc khóa mèo memew 3D siêu đáng yêu, chất liệu cao cấp, hoàn hảo để trang trí túi xách hoặc chìa khóa",
    image: "/api/placeholder/300/300",
    currentPrice: 45000,
    originalPrice: 60000,
    discount: 25,
    rating: 4.9,
    reviewCount: 890,
    isTrending: true,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Sticker Memew Mèo Bộ 50 Cái",
    description:
      "Bộ sticker mèo memew 50 cái với nhiều biểu cảm khác nhau, chất lượng in sắc nét, dán được mọi bề mặt",
    image: "/api/placeholder/300/300",
    currentPrice: 65000,
    originalPrice: 85000,
    discount: 24,
    rating: 4.7,
    reviewCount: 2100,
    isTrending: true,
    isFavorite: false,
  },
  {
    id: "4",
    title: "Túi Tote Memew Mèo Canvas",
    description:
      "Túi tote canvas in hình mèo memew, kích thước lớn, chất liệu bền đẹp, phù hợp đi chợ hoặc đi học",
    image: "/api/placeholder/300/300",
    currentPrice: 180000,
    originalPrice: 250000,
    discount: 28,
    rating: 4.6,
    reviewCount: 756,
    isTrending: true,
    isFavorite: false,
  },
  {
    id: "5",
    title: "Gối Ôm Memew Mèo Siêu Mềm",
    description:
      "Gối ôm hình mèo memew siêu mềm mại, kích thước 40x40cm, chất liệu an toàn, hoàn hảo để ôm khi ngủ",
    image: "/api/placeholder/300/300",
    currentPrice: 320000,
    originalPrice: 400000,
    discount: 20,
    rating: 4.8,
    reviewCount: 432,
    isTrending: true,
    isFavorite: false,
  },
  {
    id: "6",
    title: "Cốc Sứ Memew Mèo 350ml",
    description:
      "Cốc sứ in hình mèo memew dung tích 350ml, thiết kế đáng yêu, an toàn cho sức khỏe, dễ vệ sinh",
    image: "/api/placeholder/300/300",
    currentPrice: 120000,
    originalPrice: 150000,
    discount: 20,
    rating: 4.9,
    reviewCount: 1680,
    isTrending: true,
    isFavorite: false,
  },
];

export default function ProductBestseller() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (id: string) => {
    // Xử lý thêm vào giỏ hàng
    console.log("Thêm sản phẩm vào giỏ hàng:", id);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <TrendingUp className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            Sản Phẩm Bán Chạy Nhất
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Khám phá những sản phẩm được yêu thích nhất với chất lượng tuyệt vời
          và giá cả hợp lý
        </p>
      </div>

      {/* Stats Section */}
      <Card className="mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">
                Sản phẩm đã bán
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">4.8</div>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">
                  Đánh giá trung bình
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">
                Khách hàng hài lòng
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bestsellerProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            isFavorite={favorites.includes(product.id)}
            onFavoriteToggle={handleFavoriteToggle}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
