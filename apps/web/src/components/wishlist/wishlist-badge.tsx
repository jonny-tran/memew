"use client";

interface WishlistBadgeProps {
  count: number;
}

export function WishlistBadge({ count }: WishlistBadgeProps) {
  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
      {count > 99 ? "99+" : count}
    </span>
  );
}
