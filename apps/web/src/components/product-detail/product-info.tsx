"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/components/cart";

interface Color {
  name: string;
  value: string;
  hex: string;
}

export interface CartData {
  id: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

interface ProductInfoProps {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  colors: Color[];
  sizes: string[];
  onBuyNow: (data: CartData) => void;
}

export default function ProductInfo({
  id,
  name,
  price,
  originalPrice,
  colors,
  sizes,
  onBuyNow,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]?.value || "");
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("vi-VN")}đ`;
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleBuyNow = () => {
    onBuyNow({ id, selectedColor, selectedSize, quantity });
  };

  return (
    <Card className="bg-white rounded-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Product Title */}
          <h1 className="text-2xl font-bold text-gray-900">{name}</h1>

          {/* Product ID */}
          <p className="text-sm text-gray-600">MÃ SẢN PHẨM: {id}</p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              GIÁ: {formatPrice(price)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              {formatPrice(originalPrice)}
            </span>
          </div>

          {/* Color Selection */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              MÀU SẢN PHẨM:{" "}
              {colors.find((c) => c.value === selectedColor)?.name}
            </p>
            <div className="flex gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.value
                      ? "border-gray-800"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color.value)}
                  title={`Chọn màu ${color.name}`}
                  aria-label={`Chọn màu ${color.name}`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              KÍCH THƯỚC: {selectedSize}
            </p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                    selectedSize === size
                      ? "bg-gray-800 text-white border-gray-800"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => setSelectedSize(size)}
                  title={`Chọn size ${size}`}
                  aria-label={`Chọn size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <p className="text-sm font-medium text-gray-700">SỐ LƯỢNG:</p>
            <div className="flex items-center border rounded-lg">
              <button
                className="px-3 py-2 hover:bg-gray-100"
                onClick={() => handleQuantityChange(-1)}
                title="Giảm số lượng"
                aria-label="Giảm số lượng"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                className="px-3 py-2 hover:bg-gray-100"
                onClick={() => handleQuantityChange(1)}
                title="Tăng số lượng"
                aria-label="Tăng số lượng"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <AddToCartButton
              product={{
                ProductID: id,
                Name: name,
                Images: [], // Sẽ được truyền từ parent component
                Type: "PRODUCT",
                Status: "ACTIVE",
                Description: "",
              }}
              size={selectedSize}
              color={
                colors.find((c) => c.value === selectedColor)?.name ||
                selectedColor
              }
              price={price}
              className="w-full"
              quantity={quantity}
            />
            <Button
              onClick={handleBuyNow}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              THANH TOÁN NGAY
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
