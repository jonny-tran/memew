"use client";

import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import ProductCard from "@/components/card/product-card";
import { toast } from "sonner";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlistItems, isLoading, clearWishlist, itemCount } = useWishlist();
  const { addItem } = useCart();

  const handleClearAll = () => {
    clearWishlist();
    toast.success("Đã xóa tất cả sản phẩm khỏi danh sách yêu thích");
  };

  const handleAddToCart = (productId: string) => {
    const wishlistItem = wishlistItems.find(
      (item) => item.ProductID === productId
    );
    if (wishlistItem) {
      addItem({
        ProductID: productId,
        Product: {
          ProductID: productId,
          Name: wishlistItem.Product.Name,
          Images: wishlistItem.Product.Images,
          Type: wishlistItem.Product.Type,
          Status: wishlistItem.Product.Status,
          Description: wishlistItem.Product.Description,
        },
        UnitPrice: wishlistItem.Product.CurrentPrice,
        Size: "M",
        Color: "Đen",
      });
      toast.success(`Đã thêm ${wishlistItem.Product.Name} vào giỏ hàng`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Đang tải danh sách yêu thích...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Danh sách yêu thích
                </h1>
                <p className="text-muted-foreground">
                  {itemCount} sản phẩm trong danh sách yêu thích của bạn
                </p>
              </div>
            </div>

            {itemCount > 0 && (
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
                Xóa tất cả
              </Button>
            )}
          </div>
        </div>

        {/* Content Section */}
        {itemCount === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-muted rounded-full">
                  <Heart className="w-12 h-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Danh sách yêu thích trống
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Bạn chưa có sản phẩm nào trong danh sách yêu thích. Hãy khám
                    phá các sản phẩm và thêm vào danh sách yêu thích của bạn!
                  </p>
                  <Button asChild>
                    <Link href="/products">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Khám phá sản phẩm
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.FavoriteProductID} className="relative">
                  <ProductCard
                    id={item.ProductID}
                    title={item.Product.Name}
                    description={item.Product.Description}
                    image={item.Product.Images[0] || "/api/placeholder/300/300"}
                    currentPrice={item.Product.CurrentPrice}
                    originalPrice={item.Product.OriginalPrice}
                    discount={item.Product.Discount}
                    rating={item.Product.Rating}
                    reviewCount={item.Product.ReviewCount}
                    isTrending={item.Product.IsTrending}
                    promotion={item.Product.Promotion}
                    onAddToCart={() => handleAddToCart(item.ProductID)}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button asChild size="lg" className="flex-1 sm:flex-none">
                <Link href="/products">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Tiếp tục mua sắm
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1 sm:flex-none"
              >
                <Link href="/cart">Xem giỏ hàng</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
