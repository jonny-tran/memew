"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  ArrowRight,
  Star,
  TrendingUp,
  ShoppingBag,
  Flame,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  trending: boolean;
  discount: string;
  tag: string;
}

const storeData = {
  title: "Khám Phá Thế Giới Memew",
  subtitle:
    "Khám phá bộ sưu tập đáng yêu các sản phẩm memew mèo của chúng tôi. Mỗi sản phẩm đều được thiết kế với tình yêu dành cho những người yêu mèo và phong cách dễ thương.",
  featuredProducts: [
    {
      id: 1,
      name: "Áo Thun Memew Cat Cute",
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&dpr=2&q=40",
      price: 199000,
      rating: 4.9,
      reviews: 1240,
      trending: true,
      tag: "Bán Chạy Nhất",
    },
    {
      id: 2,
      name: "Gối Ôm Memew Cat",
      image:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&q=40",
      price: 299000,
      rating: 4.8,
      reviews: 856,
      trending: true,
      discount: "Miễn Phí Vận Chuyển",
      tag: "Hàng Mới Về",
    },
    {
      id: 3,
      name: "Cốc Sứ Memew Cat",
      image:
        "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=500&dpr=2&q=40",
      price: 89000,
      rating: 4.7,
      reviews: 432,
      trending: true,
      discount: "Số Lượng Có Hạn",
      tag: "Cao Cấp",
    },
    {
      id: 4,
      name: "Bộ Combo Memew Cat Pack",
      image:
        "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&dpr=2&q=40",
      price: 399000,
      rating: 4.9,
      reviews: 2100,
      trending: true,
      discount: "Ưu Đãi Sớm",
      tag: "Nổi Bật",
    },
  ] as Product[],
};

export default function StorefrontHero2() {
  const [searchQuery, setSearchQuery] = useState("");
  const [api, setApi] = useState<{
    selectedScrollSnap: () => number;
    scrollTo: (index: number) => void;
  }>();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % storeData.featuredProducts.length;
      api.scrollTo(nextSlide);
      setCurrentSlide(nextSlide);
    }, 5000);

    return () => clearInterval(interval);
  }, [api, currentSlide]);

  return (
    <section className="from-background to-accent/20 relative bg-linear-to-b">
      <div className="relative container mx-auto px-4 py-16 md:px-8 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <header className="space-y-8">
            <Badge variant="outline" className="rounded-full px-4 py-2">
              <TrendingUp className="me-1 !size-4" />
              Memew Cat Collection 2025
            </Badge>

            <h1 className="text-5xl leading-tight font-bold text-balance md:text-6xl lg:text-7xl">
              {storeData.title}
            </h1>

            <p className="text-muted-foreground max-w-lg text-xl text-balance">
              {storeData.subtitle}
            </p>

            <div className="relative max-w-md">
              <Input
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 rounded-full pe-4 pl-12 text-lg"
                aria-label="Tìm kiếm sản phẩm"
              />
              <Search className="text-muted-foreground absolute start-4 top-1/2 size-5 -translate-y-1/2" />
              <Button
                size="lg"
                className="absolute end-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full px-6"
              >
                Tìm Kiếm
              </Button>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="cursor-pointer gap-2 rounded-full px-8"
              >
                Mua Ngay
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer gap-2 rounded-full px-8"
              >
                <ShoppingBag className="size-4" />
                Xem Danh Mục
              </Button>
            </div>
          </header>

          <div className="flex flex-col gap-4">
            <div className="relative h-[500px] w-full border-0">
              <Carousel
                className="group size-full"
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                  duration: 20,
                  skipSnaps: true,
                }}
                onSelect={() => {
                  if (api) {
                    setCurrentSlide(api.selectedScrollSnap());
                  }
                }}
              >
                <CarouselContent className="h-full">
                  {storeData.featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className="h-full">
                      <Card className="relative size-full overflow-hidden py-4">
                        <CardContent className="px-4">
                          <div className="relative size-full overflow-hidden rounded-md">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={500}
                              height={500}
                              className="h-[500px] w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="from-background/90 via-background/30 absolute inset-0 bg-linear-to-t to-transparent" />

                          <div className="text-background-foreground absolute inset-0 flex flex-col justify-end p-8">
                            <div className="relative z-10 max-w-md space-y-4">
                              <Badge className="w-fit rounded-full">
                                {product.tag}
                              </Badge>
                              <h2 className="text-4xl font-bold">
                                {product.name}
                              </h2>
                              <p className="text-background-foreground/80 text-lg">
                                Khám phá những sản phẩm memew mèo đáng yêu nhất
                                với thiết kế độc đáo và chất lượng cao cấp dành
                                cho những người yêu mèo.
                              </p>
                              <div className="flex items-center gap-4 pt-2">
                                <Button
                                  size="lg"
                                  className="cursor-pointer rounded-full"
                                >
                                  Mua Ngay
                                </Button>
                                <div className="text-foreground flex items-center gap-1">
                                  <Star className="fill-foreground size-5" />
                                  <span className="font-medium">
                                    {product.rating}
                                  </span>
                                  <span className="text-foreground/80">
                                    ({product.reviews} đánh giá)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {product.trending && (
                            <div className="text-background-foreground bg-foreground/10 dark:bg-background/20 absolute end-8 top-8 flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-xs">
                              <Flame className="size-4" /> Thịnh Hành
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Dots Navigation - Enhanced */}
            <div className="relative mt-8 flex justify-center gap-3">
              {storeData.featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    api?.scrollTo(index);
                    setCurrentSlide(index);
                  }}
                  className={`relative size-3 rounded-full transition-all ${currentSlide === index ? "bg-primary" : "bg-foreground/20 hover:bg-foreground/40"}`}
                  aria-label={`Chuyển đến slide ${index + 1}`}
                  aria-current={currentSlide === index ? "step" : undefined}
                >
                  {currentSlide === index && (
                    <span className="absolute inset-0 m-auto rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
