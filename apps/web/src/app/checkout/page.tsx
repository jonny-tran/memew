"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  UserInfoSection,
  OrderItemsSection,
  PaymentMethodSection,
  OrderSummary,
  CartItem,
} from "@/components/checkout";
import { useCart, CartItem as CartItemType } from "@/hooks/use-cart";

// Mock data cho thông tin người dùng
const mockUserInfo = {
  name: "Nguyễn Văn A",
  address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  phone: "0123456789",
  email: "nguyenvana@example.com",
};

// Function để convert CartItemType (từ useCart) sang CartItem (cho checkout)
const convertToCheckoutItems = (cartItems: CartItemType[]): CartItem[] => {
  return cartItems.map((item) => ({
    id: item.CartItemID,
    name: item.Product.Name,
    color: item.Color,
    size: item.Size,
    price: item.UnitPrice,
    originalPrice: item.UnitPrice, // Có thể thêm logic tính originalPrice sau
    quantity: item.Quantity,
    image: item.Product.Images[0] || "/api/placeholder/100/120",
  }));
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items: cartItemsFromHook, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [promoCode, setPromoCode] = useState("");
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [isFromCart, setIsFromCart] = useState(false);

  // Load checkout items on component mount
  useEffect(() => {
    const source = searchParams.get("source"); // "cart" hoặc "product"
    const singleItem = searchParams.get("item"); // JSON string của single item nếu từ product page

    if (source === "cart") {
      // Thanh toán từ cart - sử dụng tất cả items trong cart
      setIsFromCart(true);
      const convertedItems = convertToCheckoutItems(cartItemsFromHook);
      setCheckoutItems(convertedItems);
    } else if (source === "product" && singleItem) {
      // Thanh toán ngay từ product page - chỉ 1 item
      setIsFromCart(false);
      try {
        const parsedItem = JSON.parse(decodeURIComponent(singleItem));
        setCheckoutItems([parsedItem]);
      } catch (error) {
        console.error("Error parsing single item:", error);
        // Fallback: redirect về trang chủ
        router.push("/");
      }
    } else {
      // Fallback: load từ sessionStorage (cho backward compatibility)
      const savedItems = sessionStorage.getItem("checkoutItems");
      if (savedItems) {
        try {
          const parsedItems = JSON.parse(savedItems);
          setCheckoutItems(parsedItems);
        } catch (error) {
          console.error("Error parsing checkout items:", error);
        }
      } else {
        // Nếu không có items nào, redirect về trang chủ
        router.push("/");
      }
    }
  }, [searchParams, cartItemsFromHook, router]);

  // Tính toán giá
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const originalTotal = checkoutItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;
  const shipping = subtotal >= 200000 ? 0 : 30000; // Miễn phí ship từ 200k
  const total = subtotal + shipping;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCheckoutItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCheckoutItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleApplyPromoCode = () => {
    // Logic áp dụng mã giảm giá
    console.log("Apply promo code:", promoCode);
  };

  const handleCompleteOrder = () => {
    // Nếu thanh toán từ cart, xóa items khỏi cart sau khi đặt hàng thành công
    if (isFromCart) {
      clearCart();
    }

    if (paymentMethod === "vnpay") {
      // Chuyển đến trang VNPay callback (giả lập)
      // Trong thực tế sẽ redirect đến VNPay gateway
      router.push(
        "/vnpay-callback?vnp_ResponseCode=00&vnp_TransactionStatus=00&vnp_TxnRef=ORD-1703123456-ABC12&vnp_Amount=56000000&vnp_OrderInfo=Don+hang+Memew&vnp_PayDate=20241220143000"
      );
    } else {
      // COD - chuyển trực tiếp đến trang thành công
      router.push("/order-success");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <p className="text-gray-600 mt-2">
            Xem lại đơn hàng và hoàn tất mua hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <UserInfoSection userInfo={mockUserInfo} />

            <OrderItemsSection
              cartItems={checkoutItems}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              formatCurrency={formatCurrency}
            />

            <PaymentMethodSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              savings={savings}
              shipping={shipping}
              total={total}
              promoCode={promoCode}
              onPromoCodeChange={setPromoCode}
              onApplyPromoCode={handleApplyPromoCode}
              onCompleteOrder={handleCompleteOrder}
              formatCurrency={formatCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <p className="text-gray-600 mt-2">
            Xem lại đơn hàng và hoàn tất mua hàng
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
