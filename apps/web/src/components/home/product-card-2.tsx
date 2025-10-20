"use client";

import ProductCard from "../card/product-card";

type Product = {
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
  promotion?: string;
};

const products: Product[] = [
  {
    id: "1",
    title: "Áo Thun Memew Cat Cute",
    description: "Chất liệu cotton mềm mại, in hình mèo memew đáng yêu",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=60&w=600&auto=format&fit=crop",
    currentPrice: 199000,
    originalPrice: 299000,
    discount: 33,
    rating: 4.8,
    reviewCount: 1240,
    isTrending: true,
    isFavorite: false,
    promotion: "HOT",
  },
  {
    id: "2",
    title: "Móc Khóa Memew Cat",
    description: "Móc khóa hình mèo memew siêu cute, chất liệu cao cấp",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=60&w=600&auto=format&fit=crop",
    currentPrice: 45000,
    originalPrice: 65000,
    discount: 31,
    rating: 4.6,
    reviewCount: 856,
    isTrending: false,
    isFavorite: true,
  },
  {
    id: "3",
    title: "Bộ Combo Memew Cat Pack",
    description: "Gói combo tiết kiệm: áo thun + móc khóa + sticker",
    image:
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=60&w=600&auto=format&fit=crop",
    currentPrice: 299000,
    originalPrice: 399000,
    discount: 25,
    rating: 4.9,
    reviewCount: 2100,
    isTrending: false,
    isFavorite: false,
    promotion: "COMBO",
  },
];

const ProductCard2 = () => {
  const handleFavoriteToggle = (id: string) => {
    console.log(`Toggle favorite for product ${id}`);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-balance sm:text-4xl">
          Sản Phẩm Nổi Bật
        </h2>
        <p className="text-muted-foreground max-w-[60ch] text-balance">
          Những sản phẩm được yêu thích nhất bởi khách hàng với thiết kế độc đáo
          và chất lượng vượt trội
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCard2;
