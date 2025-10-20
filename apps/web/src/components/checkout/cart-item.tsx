import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItem;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  canRemove: boolean;
  formatCurrency: (amount: number) => string;
}

export default function CartItemComponent({
  item,
  onQuantityChange,
  onRemoveItem,
  canRemove,
  formatCurrency,
}: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg bg-card">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={96}
          className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        <h3 className="font-medium text-foreground text-sm sm:text-base truncate">
          {item.name}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Màu: {item.color} | Size: {item.size}
        </p>
        <div className="flex items-center gap-2 mt-1 sm:mt-2">
          <span className="text-xs sm:text-sm text-muted-foreground">
            ⭐ 4.8 (1247)
          </span>
        </div>
      </div>

      {/* Desktop Layout: Quantity and Price */}
      <div className="hidden sm:flex items-center gap-4 w-full sm:w-auto">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        {/* Price */}
        <div className="text-right min-w-[80px]">
          <div className="font-medium text-sm sm:text-base">
            {formatCurrency(item.price * item.quantity)}
          </div>
          {item.originalPrice > item.price && (
            <div className="text-xs sm:text-sm text-muted-foreground line-through">
              {formatCurrency(item.originalPrice * item.quantity)}
            </div>
          )}
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemoveItem(item.id)}
          disabled={!canRemove}
          className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>

      {/* Mobile Layout: Bottom Row */}
      <div className="flex sm:hidden items-center justify-between w-full pt-2 border-t border-border">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        {/* Price and Remove Button */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-medium text-sm">
              {formatCurrency(item.price * item.quantity)}
            </div>
            {item.originalPrice > item.price && (
              <div className="text-xs text-muted-foreground line-through">
                {formatCurrency(item.originalPrice * item.quantity)}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveItem(item.id)}
            disabled={!canRemove}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 disabled:text-muted-foreground disabled:cursor-not-allowed"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
