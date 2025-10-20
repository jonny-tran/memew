"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/card/product-card";

// Interface cho sản phẩm tìm kiếm
interface SearchProduct {
  ProductID: string;
  Name: string;
  Description: string;
  Images: string[];
  CurrentPrice: number;
  OriginalPrice: number;
  Discount: number;
  Rating: number;
  ReviewCount: number;
  IsTrending: boolean;
  Promotion?: string;
  Type: string;
}

// Dummy data cho tìm kiếm (6 sản phẩm)
const searchProducts: SearchProduct[] = [
  {
    ProductID: "search-1",
    Name: "Áo thun Vintage Retro",
    Description:
      "Áo thun vintage với thiết kế retro, chất liệu cotton 100% mềm mại.",
    Images: ["https://placehold.co/300x300/8b4513/ffffff?text=Vintage+Retro"],
    CurrentPrice: 180000,
    OriginalPrice: 220000,
    Discount: 18,
    Rating: 4.8,
    ReviewCount: 156,
    IsTrending: true,
    Promotion: "HOT",
    Type: "Áo thun",
  },
  {
    ProductID: "search-2",
    Name: "Sticker Gaming Collection",
    Description:
      "Sticker gaming collection với các icon game nổi tiếng, chất lượng cao.",
    Images: ["https://placehold.co/300x300/00ff00/000000?text=Gaming+Stickers"],
    CurrentPrice: 25000,
    OriginalPrice: 35000,
    Discount: 29,
    Rating: 4.6,
    ReviewCount: 89,
    IsTrending: false,
    Promotion: "SALE",
    Type: "Sticker",
  },
  {
    ProductID: "search-3",
    Name: "Móc khóa Anime 3D",
    Description: "Móc khóa anime với thiết kế 3D, chất liệu PVC cao cấp.",
    Images: ["https://placehold.co/300x300/ff69b4/ffffff?text=Anime+3D"],
    CurrentPrice: 65000,
    OriginalPrice: 85000,
    Discount: 24,
    Rating: 4.9,
    ReviewCount: 234,
    IsTrending: true,
    Promotion: "NEW",
    Type: "Móc khóa",
  },
  {
    ProductID: "search-4",
    Name: "Áo thun Graphic Street",
    Description:
      "Áo thun graphic với họa tiết độc đáo, phong cách streetwear hiện đại.",
    Images: ["https://placehold.co/300x300/000000/ffffff?text=Graphic+Street"],
    CurrentPrice: 200000,
    OriginalPrice: 250000,
    Discount: 20,
    Rating: 4.7,
    ReviewCount: 178,
    IsTrending: false,
    Promotion: "LIMITED",
    Type: "Áo thun",
  },
  {
    ProductID: "search-5",
    Name: "Sticker Kawaii Set",
    Description: "Sticker kawaii với các nhân vật đáng yêu, màu sắc tươi sáng.",
    Images: ["https://placehold.co/300x300/ffc0cb/000000?text=Kawaii+Set"],
    CurrentPrice: 30000,
    OriginalPrice: 40000,
    Discount: 25,
    Rating: 4.5,
    ReviewCount: 67,
    IsTrending: false,
    Promotion: "CUTE",
    Type: "Sticker",
  },
  {
    ProductID: "search-6",
    Name: "Hoodie Winter Warm",
    Description:
      "Áo hoodie ấm áp cho mùa đông, chất liệu fleece mềm mại với túi kangaroo.",
    Images: ["https://placehold.co/300x300/4169e1/ffffff?text=Hoodie+Winter"],
    CurrentPrice: 280000,
    OriginalPrice: 350000,
    Discount: 20,
    Rating: 4.7,
    ReviewCount: 203,
    IsTrending: true,
    Promotion: "WINTER",
    Type: "Áo thun",
  },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // Lọc sản phẩm dựa trên tìm kiếm
  const filteredProducts = useMemo(() => {
    let products = searchProducts;

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (product) =>
          product.Name.toLowerCase().includes(query) ||
          product.Description.toLowerCase().includes(query) ||
          product.Type.toLowerCase().includes(query)
      );
    }

    // Lọc theo danh mục
    if (selectedCategory !== "all") {
      products = products.filter(
        (product) => product.Type === selectedCategory
      );
    }

    // Sắp xếp
    switch (sortBy) {
      case "price-low":
        products = [...products].sort(
          (a, b) => (a.CurrentPrice || 0) - (b.CurrentPrice || 0)
        );
        break;
      case "price-high":
        products = [...products].sort(
          (a, b) => (b.CurrentPrice || 0) - (a.CurrentPrice || 0)
        );
        break;
      case "rating":
        products = [...products].sort(
          (a, b) => (b.Rating || 0) - (a.Rating || 0)
        );
        break;
      case "newest":
        products = [...products].reverse();
        break;
      default:
        // relevance - giữ nguyên thứ tự
        break;
    }

    return products;
  }, [searchQuery, selectedCategory, sortBy]);

  // Sản phẩm tương tự (lấy 4 sản phẩm trending khác)
  const similarProducts = useMemo(() => {
    return searchProducts
      .filter(
        (product) =>
          product.IsTrending &&
          product.ProductID !== filteredProducts[0]?.ProductID
      )
      .slice(0, 4);
  }, [filteredProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Có thể thêm logic redirect với query params
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSortBy("relevance");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {searchQuery
                ? `Kết quả tìm kiếm cho "${searchQuery}"`
                : "Tìm kiếm sản phẩm"}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} sản phẩm được tìm thấy
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-6">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 text-base"
                    />
                  </div>

                  {/* Filter Controls */}
                  <div className="flex flex-wrap items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      Bộ lọc
                    </Button>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sắp xếp theo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">
                          Liên quan nhất
                        </SelectItem>
                        <SelectItem value="price-low">
                          Giá thấp đến cao
                        </SelectItem>
                        <SelectItem value="price-high">
                          Giá cao đến thấp
                        </SelectItem>
                        <SelectItem value="rating">
                          Đánh giá cao nhất
                        </SelectItem>
                        <SelectItem value="newest">Mới nhất</SelectItem>
                      </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2 ml-auto">
                      <Button
                        type="button"
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setViewMode("grid")}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </Button>
                      <Button
                        type="button"
                        variant={viewMode === "list" ? "default" : "outline"}
                        size="icon"
                        onClick={() => setViewMode("list")}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Advanced Filters */}
                  {showFilters && (
                    <div className="pt-4 border-t space-y-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Danh mục" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tất cả danh mục</SelectItem>
                            <SelectItem value="Áo thun">Áo thun</SelectItem>
                            <SelectItem value="Sticker">Sticker</SelectItem>
                            <SelectItem value="Móc khóa">Móc khóa</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={clearFilters}
                        >
                          Xóa bộ lọc
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          {filteredProducts.length > 0 ? (
            <div className="space-y-8">
              {/* Search Results */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Kết quả tìm kiếm
                  </h2>
                  <Badge variant="secondary" className="text-sm">
                    {filteredProducts.length} sản phẩm
                  </Badge>
                </div>

                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.ProductID}
                      id={product.ProductID}
                      title={product.Name}
                      description={product.Description}
                      image={product.Images[0]}
                      currentPrice={product.CurrentPrice || 0}
                      originalPrice={product.OriginalPrice || 0}
                      discount={product.Discount || 0}
                      rating={product.Rating || 0}
                      reviewCount={product.ReviewCount || 0}
                      isTrending={product.IsTrending}
                      promotion={product.Promotion}
                    />
                  ))}
                </div>
              </div>

              {/* Similar Products */}
              {similarProducts.length > 0 && (
                <div>
                  <Separator className="my-8" />
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      Sản phẩm tương tự
                    </h2>
                    <p className="text-muted-foreground">
                      Có thể bạn cũng quan tâm đến những sản phẩm này
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {similarProducts.map((product) => (
                      <ProductCard
                        key={product.ProductID}
                        id={product.ProductID}
                        title={product.Name}
                        description={product.Description}
                        image={product.Images[0]}
                        currentPrice={product.CurrentPrice || 0}
                        originalPrice={product.OriginalPrice || 0}
                        discount={product.Discount || 0}
                        rating={product.Rating || 0}
                        reviewCount={product.ReviewCount || 0}
                        isTrending={product.IsTrending}
                        promotion={product.Promotion}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* No Results */
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-muted-foreground mb-6">
                  Không có sản phẩm nào phù hợp với từ khóa &quot;{searchQuery}
                  &quot;. Hãy thử tìm kiếm với từ khóa khác.
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Xóa tìm kiếm
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tìm kiếm sản phẩm
            </h1>
            <p className="text-muted-foreground">
              Đang tải kết quả tìm kiếm...
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
