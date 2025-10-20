"use client";

import { Badge } from "@/components/ui/badge";

interface CartBadgeProps {
  count: number;
}

export function CartBadge({ count }: CartBadgeProps) {
  if (count === 0) return null;

  return (
    <Badge
      variant="destructive"
      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
    >
      {count > 99 ? "99+" : count}
    </Badge>
  );
}
