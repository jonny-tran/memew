import type { Product, ProductSize } from "../types";
import { ProductType, ProductStatus } from "../types";

// Mock data cho ProductSize
export const mockProductSizes: ProductSize[] = [
  {
    ProductSizeID: "size-1",
    Colors: "Trắng",
    ProductSizeName: "S",
    UnitPrice: 150000,
    Quantity: 50,
  },
  {
    ProductSizeID: "size-2",
    Colors: "Trắng",
    ProductSizeName: "M",
    UnitPrice: 150000,
    Quantity: 30,
  },
  {
    ProductSizeID: "size-3",
    Colors: "Đen",
    ProductSizeName: "L",
    UnitPrice: 150000,
    Quantity: 25,
  },
  {
    ProductSizeID: "size-4",
    Colors: "Xanh",
    ProductSizeName: "XL",
    UnitPrice: 160000,
    Quantity: 20,
  },
  {
    ProductSizeID: "size-5",
    Colors: "Hồng",
    ProductSizeName: "Free Size",
    UnitPrice: 80000,
    Quantity: 100,
  },
  {
    ProductSizeID: "size-6",
    Colors: "Vàng",
    ProductSizeName: "One Size",
    UnitPrice: 45000,
    Quantity: 80,
  },
];

// Mock data cho Products
export const mockProducts: Product[] = [
  {
    ProductID: "product-1",
    ProductSizeID: ["size-1", "size-2", "size-3", "size-4"],
    Type: ProductType.Shirt,
    Description:
      "Áo thun chất liệu cotton cao cấp, thoáng mát và bền đẹp. Thiết kế đơn giản, dễ phối đồ.",
    Name: "Áo thun Basic",
    Status: ProductStatus.Active,
    Images: [
      "https://placehold.co/300x300/ffffff/000000?text=Áo+thun+Basic",
      "https://placehold.co/300x300/f0f0f0/000000?text=Áo+thun+Basic+2",
    ],
  },
  {
    ProductID: "product-2",
    ProductSizeID: ["size-5"],
    Type: ProductType.Sticker,
    Description:
      "Sticker vinyl chất lượng cao, bền màu và dính chắc. Phù hợp để trang trí laptop, điện thoại, sổ tay.",
    Name: "Sticker Meme Collection",
    Status: ProductStatus.Active,
    Images: [
      "https://placehold.co/300x300/ff69b4/ffffff?text=Sticker+Meme",
      "https://placehold.co/300x300/00ff00/000000?text=Sticker+2",
    ],
  },
  {
    ProductID: "product-3",
    ProductSizeID: ["size-6"],
    Type: ProductType.Keyring,
    Description:
      "Móc khóa kim loại mạ vàng, thiết kế độc đáo. Làm quà tặng ý nghĩa hoặc trang trí túi xách.",
    Name: "Móc khóa Metal Art",
    Status: ProductStatus.Active,
    Images: ["https://placehold.co/300x300/ffd700/000000?text=Móc+khóa+Metal"],
  },
  {
    ProductID: "product-4",
    ProductSizeID: ["size-1", "size-2"],
    Type: ProductType.Shirt,
    Description:
      "Áo hoodie ấm áp cho mùa đông, chất liệu fleece mềm mại. Có túi kangaroo tiện lợi.",
    Name: "Hoodie Winter",
    Status: ProductStatus.Active,
    Images: ["https://placehold.co/300x300/4169e1/ffffff?text=Hoodie+Winter"],
  },
  {
    ProductID: "product-5",
    ProductSizeID: ["size-5"],
    Type: ProductType.Sticker,
    Description:
      "Sticker anime collection, thiết kế đáng yêu với nhiều nhân vật nổi tiếng.",
    Name: "Sticker Anime Set",
    Status: ProductStatus.Inactive,
    Images: ["https://placehold.co/300x300/ff1493/ffffff?text=Anime+Stickers"],
  },
];

// Helper function để lấy product sizes theo product
export const getProductSizesByProduct = (product: Product): ProductSize[] => {
  if (!product.ProductSizeID) return [];
  return mockProductSizes.filter((size) =>
    product.ProductSizeID?.includes(size.ProductSizeID)
  );
};

// Helper function để tính tổng quantity của product
export const getTotalQuantity = (product: Product): number => {
  const sizes = getProductSizesByProduct(product);
  return sizes.reduce((total, size) => total + size.Quantity, 0);
};
