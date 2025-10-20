import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CartItemComponent, { CartItem } from "./cart-item";

interface OrderItemsSectionProps {
  cartItems: CartItem[];
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  formatCurrency: (amount: number) => string;
}

export default function OrderItemsSection({
  cartItems,
  onQuantityChange,
  onRemoveItem,
  formatCurrency,
}: OrderItemsSectionProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3 md:pb-6">
        <CardTitle className="text-lg md:text-xl">
          Đơn hàng của bạn ({cartItems.length} sản phẩm)
        </CardTitle>
        <p className="text-xs md:text-sm text-muted-foreground">
          Xem lại các sản phẩm trước khi thanh toán
        </p>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-4 px-3 md:px-6">
        {cartItems.map((item) => (
          <CartItemComponent
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
            canRemove={cartItems.length > 1}
            formatCurrency={formatCurrency}
          />
        ))}
      </CardContent>
    </Card>
  );
}
