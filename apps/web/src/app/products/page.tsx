"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/card/product-card";
import { ProductType } from "@packages/types";

// Dummy data cho sản phẩm
const extendedMockProducts = [
  {
    ProductID: "product-1",
    ProductSizeID: ["size-1", "size-2", "size-3", "size-4"],
    Type: ProductType.Shirt,
    Description:
      "Áo thun chất liệu cotton cao cấp, thoáng mát và bền đẹp. Thiết kế đơn giản, dễ phối đồ.",
    Name: "Áo thun Basic",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ffffff/000000?text=Áo+thun+Basic"],
    CurrentPrice: 150000,
    OriginalPrice: 180000,
    Discount: 17,
    Rating: 4.5,
    ReviewCount: 128,
    IsTrending: false,
    Promotion: "SALE",
  },
  {
    ProductID: "product-2",
    ProductSizeID: ["size-5"],
    Type: ProductType.Sticker,
    Description:
      "Sticker vinyl chất lượng cao, bền màu và dính chắc. Phù hợp để trang trí laptop, điện thoại, sổ tay.",
    Name: "Sticker Meme Collection",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ff69b4/ffffff?text=Sticker+Meme"],
    CurrentPrice: 25000,
    OriginalPrice: 35000,
    Discount: 29,
    Rating: 4.6,
    ReviewCount: 89,
    IsTrending: true,
    Promotion: "HOT",
  },
  {
    ProductID: "product-3",
    ProductSizeID: ["size-6"],
    Type: ProductType.Keyring,
    Description:
      "Móc khóa kim loại mạ vàng, thiết kế độc đáo. Làm quà tặng ý nghĩa hoặc trang trí túi xách.",
    Name: "Móc khóa Metal Art",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ffd700/000000?text=Móc+khóa+Metal"],
    CurrentPrice: 45000,
    OriginalPrice: 60000,
    Discount: 25,
    Rating: 4.8,
    ReviewCount: 156,
    IsTrending: false,
    Promotion: "LIMITED",
  },
  {
    ProductID: "product-4",
    ProductSizeID: ["size-1", "size-2"],
    Type: ProductType.Shirt,
    Description:
      "Áo hoodie ấm áp cho mùa đông, chất liệu fleece mềm mại. Có túi kangaroo tiện lợi.",
    Name: "Hoodie Winter",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/4169e1/ffffff?text=Hoodie+Winter"],
    CurrentPrice: 280000,
    OriginalPrice: 350000,
    Discount: 20,
    Rating: 4.7,
    ReviewCount: 203,
    IsTrending: true,
    Promotion: "NEW",
  },
  {
    ProductID: "product-6",
    ProductSizeID: ["size-1", "size-2", "size-3"],
    Type: ProductType.Shirt,
    Description:
      "Áo thun vintage với thiết kế retro, chất liệu cotton 100% mềm mại.",
    Name: "Áo thun Vintage Retro",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/8b4513/ffffff?text=Vintage+Retro"],
    CurrentPrice: 180000,
    OriginalPrice: 220000,
    Discount: 18,
    Rating: 4.8,
    ReviewCount: 156,
    IsTrending: true,
    Promotion: "HOT",
  },
  {
    ProductID: "product-7",
    ProductSizeID: ["size-5"],
    Type: ProductType.Sticker,
    Description:
      "Sticker gaming collection với các icon game nổi tiếng, chất lượng cao.",
    Name: "Sticker Gaming Collection",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/00ff00/000000?text=Gaming+Stickers"],
    CurrentPrice: 25000,
    OriginalPrice: 35000,
    Discount: 29,
    Rating: 4.6,
    ReviewCount: 89,
    IsTrending: false,
    Promotion: "SALE",
  },
  {
    ProductID: "product-8",
    ProductSizeID: ["size-6"],
    Type: ProductType.Keyring,
    Description: "Móc khóa anime với thiết kế 3D, chất liệu PVC cao cấp.",
    Name: "Móc khóa Anime 3D",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ff69b4/ffffff?text=Anime+3D"],
    CurrentPrice: 65000,
    OriginalPrice: 85000,
    Discount: 24,
    Rating: 4.9,
    ReviewCount: 234,
    IsTrending: true,
    Promotion: "NEW",
  },
  {
    ProductID: "product-9",
    ProductSizeID: ["size-1", "size-2", "size-3", "size-4"],
    Type: ProductType.Shirt,
    Description:
      "Áo thun graphic với họa tiết độc đáo, phong cách streetwear hiện đại.",
    Name: "Áo thun Graphic Street",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/000000/ffffff?text=Graphic+Street"],
    CurrentPrice: 200000,
    OriginalPrice: 250000,
    Discount: 20,
    Rating: 4.7,
    ReviewCount: 178,
    IsTrending: false,
    Promotion: "LIMITED",
  },
  {
    ProductID: "product-10",
    ProductSizeID: ["size-5"],
    Type: ProductType.Sticker,
    Description: "Sticker kawaii với các nhân vật đáng yêu, màu sắc tươi sáng.",
    Name: "Sticker Kawaii Set",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ffc0cb/000000?text=Kawaii+Set"],
    CurrentPrice: 30000,
    OriginalPrice: 40000,
    Discount: 25,
    Rating: 4.5,
    ReviewCount: 67,
    IsTrending: false,
    Promotion: "CUTE",
  },
  {
    ProductID: "product-11",
    ProductSizeID: ["size-1", "size-2", "size-3"],
    Type: ProductType.Shirt,
    Description:
      "Áo thun oversize phong cách Hàn Quốc, chất liệu cotton mềm mại.",
    Name: "Áo thun Oversize K-Style",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ff6b6b/ffffff?text=K-Style"],
    CurrentPrice: 220000,
    OriginalPrice: 280000,
    Discount: 21,
    Rating: 4.9,
    ReviewCount: 312,
    IsTrending: true,
    Promotion: "TRENDING",
  },
  {
    ProductID: "product-12",
    ProductSizeID: ["size-5"],
    Type: ProductType.Sticker,
    Description:
      "Sticker minimalist với thiết kế tối giản, phù hợp trang trí văn phòng.",
    Name: "Sticker Minimalist Pack",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/2c3e50/ffffff?text=Minimalist"],
    CurrentPrice: 20000,
    OriginalPrice: 30000,
    Discount: 33,
    Rating: 4.4,
    ReviewCount: 45,
    IsTrending: false,
    Promotion: "OFFICE",
  },
  {
    ProductID: "product-13",
    ProductSizeID: ["size-1", "size-2", "size-3"],
    Type: ProductType.New,
    Description:
      "Sản phẩm mới nhất với thiết kế độc đáo, chất liệu cao cấp và công nghệ hiện đại.",
    Name: "Áo thun New Collection 2024",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ff1493/ffffff?text=New+2024"],
    CurrentPrice: 250000,
    OriginalPrice: 300000,
    Discount: 17,
    Rating: 4.9,
    ReviewCount: 89,
    IsTrending: true,
    Promotion: "NEW",
  },
  {
    ProductID: "product-14",
    ProductSizeID: ["size-5"],
    Type: ProductType.Cup,
    Description:
      "Ly sứ cao cấp với thiết kế đẹp mắt, giữ nhiệt tốt và an toàn cho sức khỏe.",
    Name: "Ly sứ Premium Ceramic",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ffffff/000000?text=Ceramic+Cup"],
    CurrentPrice: 120000,
    OriginalPrice: 150000,
    Discount: 20,
    Rating: 4.7,
    ReviewCount: 156,
    IsTrending: false,
    Promotion: "PREMIUM",
  },
  {
    ProductID: "product-15",
    ProductSizeID: ["size-5"],
    Type: ProductType.PhoneCase,
    Description:
      "Ốp lưng điện thoại chống sốc, bảo vệ toàn diện với thiết kế thời trang.",
    Name: "Ốp lưng iPhone 15 Pro Max",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/000000/ffffff?text=Phone+Case"],
    CurrentPrice: 180000,
    OriginalPrice: 220000,
    Discount: 18,
    Rating: 4.6,
    ReviewCount: 203,
    IsTrending: true,
    Promotion: "PROTECT",
  },
  {
    ProductID: "product-16",
    ProductSizeID: ["size-1", "size-2", "size-3", "size-4"],
    Type: ProductType.Shirt,
    Description:
      "Áo thun polo nam nữ với chất liệu cotton pha, thoáng mát và bền đẹp.",
    Name: "Áo Polo Classic",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/0066cc/ffffff?text=Polo+Classic"],
    CurrentPrice: 190000,
    OriginalPrice: 240000,
    Discount: 21,
    Rating: 4.5,
    ReviewCount: 134,
    IsTrending: false,
    Promotion: "CLASSIC",
  },
  {
    ProductID: "product-17",
    ProductSizeID: ["size-5"],
    Type: ProductType.Cup,
    Description:
      "Cốc giữ nhiệt inox 304, giữ nóng 6h và lạnh 12h, thiết kế sang trọng.",
    Name: "Cốc giữ nhiệt Inox 500ml",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/c0c0c0/000000?text=Thermos+Cup"],
    CurrentPrice: 280000,
    OriginalPrice: 350000,
    Discount: 20,
    Rating: 4.8,
    ReviewCount: 267,
    IsTrending: true,
    Promotion: "THERMOS",
  },
  {
    ProductID: "product-18",
    ProductSizeID: ["size-5"],
    Type: ProductType.PhoneCase,
    Description:
      "Ốp lưng Samsung Galaxy S24 Ultra với khả năng chống nước và chống sốc cao.",
    Name: "Ốp lưng Galaxy S24 Ultra",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/800080/ffffff?text=Galaxy+Case"],
    CurrentPrice: 160000,
    OriginalPrice: 200000,
    Discount: 20,
    Rating: 4.7,
    ReviewCount: 189,
    IsTrending: false,
    Promotion: "GALAXY",
  },
  {
    ProductID: "product-19",
    ProductSizeID: ["size-5"],
    Type: ProductType.Sticker,
    Description:
      "Sticker anime collection với các nhân vật nổi tiếng, chất lượng cao và bền màu.",
    Name: "Sticker Anime Collection Pro",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ff69b4/ffffff?text=Anime+Pro"],
    CurrentPrice: 35000,
    OriginalPrice: 45000,
    Discount: 22,
    Rating: 4.9,
    ReviewCount: 312,
    IsTrending: true,
    Promotion: "ANIME",
  },
  {
    ProductID: "product-20",
    ProductSizeID: ["size-6"],
    Type: ProductType.Keyring,
    Description:
      "Móc khóa LED với đèn chiếu sáng, thiết kế hiện đại và tiện lợi cho ban đêm.",
    Name: "Móc khóa LED Smart",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/00ff00/000000?text=LED+Keyring"],
    CurrentPrice: 85000,
    OriginalPrice: 120000,
    Discount: 29,
    Rating: 4.6,
    ReviewCount: 178,
    IsTrending: false,
    Promotion: "LED",
  },
  {
    ProductID: "product-21",
    ProductSizeID: ["size-1", "size-2", "size-3"],
    Type: ProductType.New,
    Description:
      "Bộ sưu tập mới nhất với thiết kế độc đáo, phong cách streetwear hiện đại.",
    Name: "Áo thun Streetwear New",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/ff4500/ffffff?text=Streetwear+New"],
    CurrentPrice: 220000,
    OriginalPrice: 280000,
    Discount: 21,
    Rating: 4.8,
    ReviewCount: 145,
    IsTrending: true,
    Promotion: "STREET",
  },
  {
    ProductID: "product-22",
    ProductSizeID: ["size-5"],
    Type: ProductType.Cup,
    Description:
      "Ly cà phê espresso với thiết kế Ý cổ điển, chất liệu sứ cao cấp.",
    Name: "Ly Espresso Italian Style",
    Status: "ACTIVE" as const,
    Images: ["https://placehold.co/300x300/8b4513/ffffff?text=Espresso+Cup"],
    CurrentPrice: 95000,
    OriginalPrice: 120000,
    Discount: 21,
    Rating: 4.5,
    ReviewCount: 98,
    IsTrending: false,
    Promotion: "ITALIAN",
  },
];

// Interface cho filter state
interface FilterState {
  types: ProductType[];
  priceRange: [number, number];
  minRating: number;
  showTrendingOnly: boolean;
  showOnSaleOnly: boolean;
  colors: string[];
  sortBy: "name" | "price-asc" | "price-desc" | "rating" | "newest";
}

// Màu sắc có sẵn
const availableColors = [
  { name: "Trắng", value: "white", hex: "#FFFFFF" },
  { name: "Đen", value: "black", hex: "#000000" },
  { name: "Xám", value: "gray", hex: "#808080" },
  { name: "Xanh", value: "blue", hex: "#4169e1" },
  { name: "Hồng", value: "pink", hex: "#ff69b4" },
  { name: "Vàng", value: "yellow", hex: "#ffd700" },
  { name: "Nâu", value: "brown", hex: "#8b4513" },
  { name: "Xanh lá", value: "green", hex: "#00ff00" },
];

// Giá trị mặc định cho filter
const defaultFilters: FilterState = {
  types: [],
  priceRange: [0, 500000],
  minRating: 0,
  showTrendingOnly: false,
  showOnSaleOnly: false,
  colors: [],
  sortBy: "name",
};

// Function để lấy tên hiển thị của ProductType
const getProductTypeDisplayName = (type: ProductType): string => {
  switch (type) {
    case ProductType.Shirt:
      return "Áo thun";
    case ProductType.Sticker:
      return "Sticker";
    case ProductType.Keyring:
      return "Móc khóa";
    case ProductType.New:
      return "New";
    case ProductType.Cup:
      return "Ly, cốc";
    case ProductType.PhoneCase:
      return "Ốp lưng";
    default:
      return type;
  }
};

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Lọc sản phẩm dựa trên filter
  const filteredProducts = useMemo(() => {
    let filtered = [...extendedMockProducts];

    // Lọc theo loại sản phẩm
    if (filters.types.length > 0) {
      filtered = filtered.filter((product) =>
        filters.types.includes(product.Type)
      );
    }

    // Lọc theo khoảng giá
    filtered = filtered.filter(
      (product) =>
        product.CurrentPrice >= filters.priceRange[0] &&
        product.CurrentPrice <= filters.priceRange[1]
    );

    // Lọc theo đánh giá tối thiểu
    if (filters.minRating > 0) {
      filtered = filtered.filter(
        (product) => product.Rating >= filters.minRating
      );
    }

    // Lọc sản phẩm trending
    if (filters.showTrendingOnly) {
      filtered = filtered.filter((product) => product.IsTrending);
    }

    // Lọc sản phẩm đang sale
    if (filters.showOnSaleOnly) {
      filtered = filtered.filter((product) => product.Discount > 0);
    }

    // Sắp xếp
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.CurrentPrice - b.CurrentPrice;
        case "price-desc":
          return b.CurrentPrice - a.CurrentPrice;
        case "rating":
          return b.Rating - a.Rating;
        case "newest":
          return b.ProductID.localeCompare(a.ProductID);
        default:
          return a.Name.localeCompare(b.Name);
      }
    });

    return filtered;
  }, [filters]);

  // Cập nhật filter
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // Cuộn lên đầu trang khi filter thay đổi
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset filter
  const resetFilters = () => {
    setFilters(defaultFilters);
    // Cuộn lên đầu trang khi reset filter
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Đếm số sản phẩm sau khi lọc
  const productCount = filteredProducts.length;

  // Tính toán pagination
  const totalPages = Math.ceil(productCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Load filters từ URL params khi component mount
  useEffect(() => {
    const urlFilters: Partial<FilterState> = {};

    // Load category (single category từ header)
    const categoryParam = searchParams.get("category");
    if (
      categoryParam &&
      Object.values(ProductType).includes(categoryParam as ProductType)
    ) {
      urlFilters.types = [categoryParam as ProductType];
    } else {
      // Load types (multiple types từ filter)
      const typesParam = searchParams.get("types");
      if (typesParam) {
        urlFilters.types = typesParam
          .split(",")
          .filter((type) =>
            Object.values(ProductType).includes(type as ProductType)
          ) as ProductType[];
      }
    }

    // Load price range
    const priceParam = searchParams.get("price");
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        urlFilters.priceRange = [min, max];
      }
    }

    // Load min rating
    const ratingParam = searchParams.get("rating");
    if (ratingParam) {
      const rating = parseInt(ratingParam);
      if (!isNaN(rating)) {
        urlFilters.minRating = rating;
      }
    }

    // Load trending
    const trendingParam = searchParams.get("trending");
    if (trendingParam === "true") {
      urlFilters.showTrendingOnly = true;
    }

    // Load sale
    const saleParam = searchParams.get("sale");
    if (saleParam === "true") {
      urlFilters.showOnSaleOnly = true;
    }

    // Load colors
    const colorsParam = searchParams.get("colors");
    if (colorsParam) {
      urlFilters.colors = colorsParam.split(",");
    }

    // Load sort
    const sortParam = searchParams.get("sort");
    if (
      sortParam &&
      ["name", "price-asc", "price-desc", "rating", "newest"].includes(
        sortParam
      )
    ) {
      urlFilters.sortBy = sortParam as FilterState["sortBy"];
    }

    // Load page
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const page = parseInt(pageParam);
      if (!isNaN(page) && page > 0) {
        setCurrentPage(page);
      }
    }

    // Apply loaded filters
    if (Object.keys(urlFilters).length > 0) {
      setFilters((prev) => ({ ...prev, ...urlFilters }));
    }
  }, [searchParams]);

  // Update URL params khi filters thay đổi
  useEffect(() => {
    const params = new URLSearchParams();

    // Add category hoặc types
    const categoryParam = searchParams.get("category");
    if (
      categoryParam &&
      Object.values(ProductType).includes(categoryParam as ProductType)
    ) {
      // Nếu có category từ header, ưu tiên sử dụng category
      if (filters.types.length > 0) {
        params.set("category", filters.types[0]);
      }
    } else {
      // Nếu không có category, sử dụng types như bình thường
      if (filters.types.length > 0) {
        params.set("types", filters.types.join(","));
      }
    }

    // Add price range (chỉ add nếu không phải default)
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 500000) {
      params.set("price", `${filters.priceRange[0]}-${filters.priceRange[1]}`);
    }

    // Add min rating
    if (filters.minRating > 0) {
      params.set("rating", filters.minRating.toString());
    }

    // Add trending
    if (filters.showTrendingOnly) {
      params.set("trending", "true");
    }

    // Add sale
    if (filters.showOnSaleOnly) {
      params.set("sale", "true");
    }

    // Add colors
    if (filters.colors.length > 0) {
      params.set("colors", filters.colors.join(","));
    }

    // Add sort (chỉ add nếu không phải default)
    if (filters.sortBy !== "name") {
      params.set("sort", filters.sortBy);
    }

    // Add page (chỉ add nếu không phải trang 1)
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    // Update URL
    const newUrl = params.toString() ? `?${params.toString()}` : "";
    router.replace(`/products${newUrl}`, { scroll: false });
  }, [filters, currentPage, router, searchParams]);

  // Reset về trang 1 khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Cuộn lên đầu trang khi chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Component Filter Sidebar
  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bộ lọc</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="text-xs"
        >
          Xóa tất cả
        </Button>
      </div>

      {/* Loại sản phẩm */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Loại sản phẩm</h4>
        <div className="space-y-2">
          {Object.values(ProductType).map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.types.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("types", [...filters.types, type]);
                  } else {
                    updateFilter(
                      "types",
                      filters.types.filter((t) => t !== type)
                    );
                  }
                }}
              />
              <label
                htmlFor={`type-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {getProductTypeDisplayName(type)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Khoảng giá */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Khoảng giá</h4>
        <div className="space-y-3">
          <Select
            value={`${filters.priceRange[0]}-${filters.priceRange[1]}`}
            onValueChange={(value) => {
              const [min, max] = value.split("-").map(Number);
              updateFilter("priceRange", [min, max]);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn khoảng giá" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-500000">Tất cả giá</SelectItem>
              <SelectItem value="0-50000">Dưới 50,000đ</SelectItem>
              <SelectItem value="50000-100000">50,000đ - 100,000đ</SelectItem>
              <SelectItem value="100000-150000">100,000đ - 150,000đ</SelectItem>
              <SelectItem value="150000-200000">150,000đ - 200,000đ</SelectItem>
              <SelectItem value="200000-250000">200,000đ - 250,000đ</SelectItem>
              <SelectItem value="250000-300000">250,000đ - 300,000đ</SelectItem>
              <SelectItem value="300000-500000">Trên 300,000đ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Đánh giá tối thiểu */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Đánh giá tối thiểu</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) => {
                  updateFilter("minRating", checked ? rating : 0);
                }}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1"
              >
                <span className="text-yellow-400">★</span>
                {rating}+ sao
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Trạng thái đặc biệt */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Trạng thái</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="trending"
              checked={filters.showTrendingOnly}
              onCheckedChange={(checked) =>
                updateFilter("showTrendingOnly", !!checked)
              }
            />
            <label
              htmlFor="trending"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Sản phẩm trending
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sale"
              checked={filters.showOnSaleOnly}
              onCheckedChange={(checked) =>
                updateFilter("showOnSaleOnly", !!checked)
              }
            />
            <label
              htmlFor="sale"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Đang giảm giá
            </label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Màu sắc */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Màu sắc</h4>
        <div className="grid grid-cols-2 gap-2">
          {availableColors.map((color) => (
            <div key={color.value} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color.value}`}
                checked={filters.colors.includes(color.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFilter("colors", [...filters.colors, color.value]);
                  } else {
                    updateFilter(
                      "colors",
                      filters.colors.filter((c) => c !== color.value)
                    );
                  }
                }}
              />
              <label
                htmlFor={`color-${color.value}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
              >
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Lấy category từ URL để hiển thị title phù hợp
  const categoryParam = searchParams.get("category");
  const currentCategory =
    categoryParam &&
    Object.values(ProductType).includes(categoryParam as ProductType)
      ? (categoryParam as ProductType)
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {currentCategory
            ? getProductTypeDisplayName(currentCategory)
            : "Tất cả sản phẩm"}
        </h1>
        <p className="text-muted-foreground">
          {currentCategory
            ? `Khám phá bộ sưu tập ${getProductTypeDisplayName(currentCategory).toLowerCase()} của chúng tôi`
            : "Khám phá bộ sưu tập sản phẩm đa dạng của chúng tôi"}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-4">
            <Card>
              <CardContent className="p-6">
                <FilterSidebar />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Mobile Filter Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Bộ lọc
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <div className="flex items-center gap-4 ml-auto">
              <Select
                value={filters.sortBy}
                onValueChange={(value: FilterState["sortBy"]) =>
                  updateFilter("sortBy", value)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Tên A-Z</SelectItem>
                  <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
                  <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
                  <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Hiển thị {startIndex + 1}-{Math.min(endIndex, productCount)}{" "}
                trong {productCount} sản phẩm
              </span>
              {(filters.types.length > 0 ||
                filters.minRating > 0 ||
                filters.showTrendingOnly ||
                filters.showOnSaleOnly ||
                filters.colors.length > 0) && (
                <Badge variant="secondary" className="text-xs">
                  Đã lọc
                </Badge>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.ProductID}
                    id={product.ProductID}
                    title={product.Name}
                    description={product.Description}
                    image={product.Images[0]}
                    currentPrice={product.CurrentPrice}
                    originalPrice={product.OriginalPrice}
                    discount={product.Discount}
                    rating={product.Rating}
                    reviewCount={product.ReviewCount}
                    isTrending={product.IsTrending}
                    promotion={product.Promotion}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <SlidersHorizontal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">
                  Không tìm thấy sản phẩm nào
                </h3>
                <p className="text-sm">
                  Thử điều chỉnh bộ lọc để tìm thấy sản phẩm phù hợp
                </p>
              </div>
              <Button variant="outline" onClick={resetFilters}>
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tất cả sản phẩm</h1>
        <p className="text-muted-foreground">
          Khám phá bộ sưu tập sản phẩm đa dạng của chúng tôi
        </p>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
}
