import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "NEW",
    description: "Sản phẩm mới nhất với thiết kế độc đáo",
    itemCount: 156,
    image: "/api/placeholder/500/400",
    trending: true,
  },
  {
    id: 2,
    name: "ÁO THUN",
    description: "Áo thun in hình mèo memew siêu cute",
    itemCount: 324,
    image: "/api/placeholder/500/400",
    trending: true,
  },
  {
    id: 3,
    name: "STICKER",
    description: "Bộ sticker mèo memew với nhiều biểu cảm",
    itemCount: 89,
    image: "/api/placeholder/500/400",
    trending: false,
  },
  {
    id: 4,
    name: "LY, CỐC",
    description: "Ly cốc in hình mèo memew đáng yêu",
    itemCount: 67,
    image: "/api/placeholder/500/400",
    trending: true,
  },
  {
    id: 5,
    name: "ỐP LƯNG",
    description: "Ốp lưng điện thoại mèo memew độc đáo",
    itemCount: 143,
    image: "/api/placeholder/500/400",
    trending: false,
  },
  {
    id: 6,
    name: "MÓC KHÓA",
    description: "Móc khóa mèo memew 3D siêu đáng yêu",
    itemCount: 278,
    image: "/api/placeholder/500/400",
    trending: true,
  },
];

export default function ProductCategory() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance">
            Mua Sắm Theo Danh Mục
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Khám phá sản phẩm qua các danh mục phổ biến nhất của chúng tôi
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer overflow-hidden py-0 transition-all duration-500 hover:shadow-lg"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={500}
                  height={500}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Trending Badge */}
                {category.trending && (
                  <Badge className="absolute top-4 left-4">Hot</Badge>
                )}

                {/* Category Info Overlay */}
                <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                  <h3 className="mb-1 text-xl font-bold">{category.name}</h3>
                  <p className="mb-3 text-sm text-white/90">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {category.itemCount.toLocaleString()} sản phẩm
                    </span>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="cursor-pointer border-white/30 bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                    >
                      Xem ngay
                      <ArrowRight className="ms-2 size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
