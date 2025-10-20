"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import ProductImageGallery from "@/components/product-detail/product-image-gallery";
import ProductInfo, {
  CartData,
} from "@/components/product-detail/product-info";
import SizeChart from "@/components/product-detail/size-chart";
import ProductCard from "@/components/card/product-card";

// Mock data - trong thực tế sẽ fetch từ API
const mockProduct = {
  id: "0000001-00",
  name: "ÁO THUN VỚI HỌA TIẾT LOGO MEMEW",
  price: 200000,
  originalPrice: 250000,
  discount: 20,
  rating: 4.8,
  reviewCount: 19,
  soldCount: 19,
  status: "CÒN HÀNG",
  colors: [
    { name: "Trắng", value: "white", hex: "#FFFFFF" },
    { name: "Đen", value: "black", hex: "#000000" },
    { name: "Xám", value: "gray", hex: "#808080" },
    { name: "Be", value: "beige", hex: "#F5F5DC" },
  ],
  sizes: ["S", "M", "L", "XL"],
  images: [
    "/api/placeholder/400/500",
    "/api/placeholder/400/500",
    "/api/placeholder/400/500",
    "/api/placeholder/400/500",
  ],
  description:
    "4 Màu: Đen - Trắng - Be - Xám. Màu Sắc Vải/Sản Phẩm Có Thể Chênh Lệch 2-5% So Với Thực Tế, Do Ảnh Hường Về Độ Lệch Màu Và Ánh Sáng Góc Chụp, Tuy Nhiên Vẫn Đảm Bảo Chất Lượng.",
  details: {
    design: "Đơn Giản",
    sizeType: "Thường",
    style: "Tối Giản",
    pattern: "Trơn",
    collar: "Cổ Tròng",
    material: "Cotton",
    sleeveLength: "Tay Ngắn",
    care: "Có Thể Giặt Tay Và Máy",
  },
  sizeChart: {
    S: { length: 66, width: 48, weight: "dưới 50Kg" },
    M: { length: 69, width: 50, weight: "50Kg-55Kg" },
    L: { length: 72, width: 52, weight: "56Kg-60Kg" },
    XL: { length: 75, width: 54, weight: "60Kg-65Kg" },
  },
  returnPolicy: [
    "Hàng Vẫn Còn Mới, Chưa Qua Sử Dụng, Giặt Tẩy, Còn Nguyên Tem Mác",
    "Hàng Không Đúng Size, Không Đủ Số Lượng, Hàng Hóa Bị Hư Do Vận Chuyển Hoặc Bị Lỗi Do Người Bán, Hàng Không Đúng Mã, Không Còn Nguyên Tem Mác.",
  ],
};

// Mock data cho similar products
const similarProducts = [
  {
    id: "0000002-00",
    title: "ÁO THUN NAM CỔ TRÒN",
    description: "Áo thun nam chất liệu cotton mềm mại, thoáng mát",
    image: "/api/placeholder/200/200",
    currentPrice: 180000,
    originalPrice: 220000,
    discount: 18,
    rating: 4.5,
    reviewCount: 25,
    isTrending: false,
    isFavorite: false,
  },
  {
    id: "0000003-00",
    title: "ÁO THUN NỮ BASIC",
    description: "Áo thun nữ thiết kế đơn giản, dễ phối đồ",
    image: "/api/placeholder/200/200",
    currentPrice: 160000,
    originalPrice: 200000,
    discount: 20,
    rating: 4.7,
    reviewCount: 18,
    isTrending: true,
    isFavorite: false,
  },
  {
    id: "0000004-00",
    title: "ÁO THUN UNISEX",
    description: "Áo thun unisex phù hợp cho cả nam và nữ",
    image: "/api/placeholder/200/200",
    currentPrice: 190000,
    originalPrice: 240000,
    discount: 21,
    rating: 4.6,
    reviewCount: 32,
    isTrending: false,
    isFavorite: true,
  },
  {
    id: "0000005-00",
    title: "ÁO THUN CỔ BẺ",
    description: "Áo thun cổ bẻ thanh lịch, phù hợp công sở",
    image: "/api/placeholder/200/200",
    currentPrice: 210000,
    originalPrice: 260000,
    discount: 19,
    rating: 4.4,
    reviewCount: 15,
    isTrending: false,
    isFavorite: false,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const handleBuyNow = (data: CartData) => {
    // Tạo item cho checkout
    const cartItem = {
      id: productId,
      name: mockProduct.name,
      color:
        mockProduct.colors.find((c) => c.value === data.selectedColor)?.name ||
        data.selectedColor,
      size: data.selectedSize,
      price: mockProduct.price,
      originalPrice: mockProduct.originalPrice,
      quantity: data.quantity,
      image: mockProduct.images[0],
    };

    // Chuyển hướng đến trang checkout với URL parameters
    const encodedItem = encodeURIComponent(JSON.stringify(cartItem));
    router.push(`/checkout?source=product&item=${encodedItem}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Product Images - Left Section */}
          <div className="lg:col-span-2">
            <ProductImageGallery
              images={mockProduct.images}
              productName={mockProduct.name}
              status={mockProduct.status}
            />
          </div>

          {/* Product Info - Right Section */}
          <div className="lg:col-span-1">
            <ProductInfo
              id={mockProduct.id}
              name={mockProduct.name}
              price={mockProduct.price}
              originalPrice={mockProduct.originalPrice}
              colors={mockProduct.colors}
              sizes={mockProduct.sizes}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* Size Chart */}
        <SizeChart sizeChart={mockProduct.sizeChart} />

        {/* Product Details and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Details */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                GIỚI THIỆU VỀ SẢN PHẨM NÀY
              </h3>
              <h4 className="text-md font-semibold text-gray-800 mb-4">
                CHI TIẾT
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thiết Kế:</span>
                  <span className="font-medium">
                    {mockProduct.details.design}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size Type:</span>
                  <span className="font-medium">
                    {mockProduct.details.sizeType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phong Cách:</span>
                  <span className="font-medium">
                    {mockProduct.details.style}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mẫu:</span>
                  <span className="font-medium">
                    {mockProduct.details.pattern}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đường Viên Có Áo:</span>
                  <span className="font-medium">
                    {mockProduct.details.collar}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chất Liệu:</span>
                  <span className="font-medium">
                    {mockProduct.details.material}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chiều Dài Tay Áo:</span>
                  <span className="font-medium">
                    {mockProduct.details.sleeveLength}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bảo Quản:</span>
                  <span className="font-medium">
                    {mockProduct.details.care}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">MÔ TẢ</h3>
              <div className="space-y-4">
                <p className="text-gray-700">{mockProduct.description}</p>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Cách Đổi Trả
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {mockProduct.returnPolicy.map((policy, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span>--</span>
                        <span>{policy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Similar Products */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              SẢN PHẨM CÙNG LOẠI
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {similarProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  currentPrice={product.currentPrice}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  isTrending={product.isTrending}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
