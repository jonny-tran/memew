"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

// Dummy data cho search suggestions
const extendedMockProducts: SearchProduct[] = [
  {
    ProductID: "suggest-1",
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
    ProductID: "suggest-2",
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
    ProductID: "suggest-3",
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
    ProductID: "suggest-4",
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
    ProductID: "suggest-5",
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
    ProductID: "suggest-6",
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
  {
    ProductID: "suggest-7",
    Name: "Áo thun Oversize K-Style",
    Description:
      "Áo thun oversize phong cách Hàn Quốc, chất liệu cotton mềm mại.",
    Images: ["https://placehold.co/300x300/ff6b6b/ffffff?text=K-Style"],
    CurrentPrice: 220000,
    OriginalPrice: 280000,
    Discount: 21,
    Rating: 4.9,
    ReviewCount: 312,
    IsTrending: true,
    Promotion: "TRENDING",
    Type: "Áo thun",
  },
  {
    ProductID: "suggest-8",
    Name: "Sticker Minimalist Pack",
    Description:
      "Sticker minimalist với thiết kế tối giản, phù hợp trang trí văn phòng.",
    Images: ["https://placehold.co/300x300/2c3e50/ffffff?text=Minimalist"],
    CurrentPrice: 20000,
    OriginalPrice: 30000,
    Discount: 33,
    Rating: 4.4,
    ReviewCount: 45,
    IsTrending: false,
    Promotion: "OFFICE",
    Type: "Sticker",
  },
];

interface SearchSuggestionsProps {
  query: string;
  isVisible: boolean;
  onSelect: (query: string) => void;
  onClose: () => void;
}

// Mock recent searches
const recentSearches = [
  "áo thun",
  "sticker anime",
  "móc khóa",
  "hoodie",
  "vintage",
];

// Mock trending searches
const trendingSearches = [
  "áo thun graphic",
  "sticker gaming",
  "móc khóa 3D",
  "hoodie winter",
  "sticker kawaii",
];

export default function SearchSuggestions({
  query,
  isVisible,
  onSelect,
  onClose,
}: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<SearchProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = extendedMockProducts
        .filter(
          (product) =>
            product.Name.toLowerCase().includes(query.toLowerCase()) ||
            product.Description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);

      setSuggestions(filtered);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, isVisible]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <Card
      ref={containerRef}
      className="absolute top-full left-0 right-0 z-50 mt-2 shadow-lg border"
    >
      <CardContent className="p-0">
        {query.trim() ? (
          // Show search results
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                Đang tìm kiếm...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="p-2">
                <div className="text-xs font-medium text-muted-foreground px-3 py-2 border-b">
                  Kết quả tìm kiếm
                </div>
                {suggestions.map((product) => (
                  <Button
                    key={product.ProductID}
                    variant="ghost"
                    className="w-full justify-start p-3 h-auto"
                    onClick={() => onSelect(product.Name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Search className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">
                          {product.Name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {product.Description.substring(0, 50)}...
                        </div>
                      </div>
                      {product.IsTrending && (
                        <Badge variant="secondary" className="text-xs">
                          Trending
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Không tìm thấy sản phẩm nào
              </div>
            )}
          </div>
        ) : (
          // Show recent and trending searches
          <div className="p-4">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Tìm kiếm gần đây
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => onSelect(search)}
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Tìm kiếm phổ biến
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => onSelect(search)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
