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
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={96}
        className="w-20 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Màu: {item.color} | Size: {item.size}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm">⭐ 4.8 (1247)</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-right">
        <div className="font-medium">
          {formatCurrency(item.price * item.quantity)}
        </div>
        {item.originalPrice > item.price && (
          <div className="text-sm text-gray-500 line-through">
            {formatCurrency(item.originalPrice * item.quantity)}
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemoveItem(item.id)}
        disabled={!canRemove}
        className="text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
