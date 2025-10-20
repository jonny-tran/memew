"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
// import { FavoriteProduct } from "@memew/types";

export interface WishlistItem {
  FavoriteProductID: string;
  CustomerID: string;
  ProductID: string;
  Product: {
    ProductID: string;
    Name: string;
    Images: string[];
    Type: string;
    Status: string;
    Description: string;
    CurrentPrice: number;
    OriginalPrice: number;
    Discount: number;
    Rating: number;
    ReviewCount: number;
    IsTrending?: boolean;
    Promotion?: string;
  };
}

const WISHLIST_STORAGE_KEY = "memew-wishlist";

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlistItems(parsedWishlist);
      } else {
        // Mock data cho demo
        const mockWishlist: WishlistItem[] = [
          {
            FavoriteProductID: "fav-1",
            CustomerID: "customer-1",
            ProductID: "product-1",
            Product: {
              ProductID: "product-1",
              Name: "Áo thun nam cao cấp",
              Images: ["/api/placeholder/300/300"],
              Type: "PRODUCT",
              Status: "ACTIVE",
              Description:
                "Áo thun nam chất liệu cotton cao cấp, thoáng mát và bền đẹp",
              CurrentPrice: 299000,
              OriginalPrice: 399000,
              Discount: 25,
              Rating: 4.8,
              ReviewCount: 1250,
              IsTrending: true,
            },
          },
          {
            FavoriteProductID: "fav-2",
            CustomerID: "customer-1",
            ProductID: "product-2",
            Product: {
              ProductID: "product-2",
              Name: "Quần jean nữ slim fit",
              Images: ["/api/placeholder/300/300"],
              Type: "PRODUCT",
              Status: "ACTIVE",
              Description:
                "Quần jean nữ thiết kế slim fit, tôn dáng và thoải mái",
              CurrentPrice: 599000,
              OriginalPrice: 799000,
              Discount: 25,
              Rating: 4.6,
              ReviewCount: 890,
              IsTrending: false,
            },
          },
          {
            FavoriteProductID: "fav-3",
            CustomerID: "customer-1",
            ProductID: "product-3",
            Product: {
              ProductID: "product-3",
              Name: "Giày sneaker unisex",
              Images: ["/api/placeholder/300/300"],
              Type: "PRODUCT",
              Status: "ACTIVE",
              Description:
                "Giày sneaker unisex thiết kế hiện đại, êm ái và bền bỉ",
              CurrentPrice: 1299000,
              OriginalPrice: 1599000,
              Discount: 19,
              Rating: 4.9,
              ReviewCount: 2100,
              IsTrending: true,
            },
          },
        ];
        setWishlistItems(mockWishlist);
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error);
      setWishlistItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save wishlist to localStorage whenever wishlistItems change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(
          WISHLIST_STORAGE_KEY,
          JSON.stringify(wishlistItems)
        );
        // Dispatch custom event để thông báo cho các component khác
        window.dispatchEvent(
          new CustomEvent("wishlistUpdated", {
            detail: {
              items: wishlistItems,
              itemCount: wishlistItems.length,
            },
          })
        );
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error);
      }
    }
  }, [wishlistItems, isLoading]);

  // Listen for wishlist updates from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === WISHLIST_STORAGE_KEY && e.newValue) {
        try {
          const updatedWishlist = JSON.parse(e.newValue);
          setWishlistItems(updatedWishlist);
        } catch (error) {
          console.error("Error parsing wishlist from storage event:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Add item to wishlist
  const addItem = useCallback((item: WishlistItem) => {
    setWishlistItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find(
        (existing) => existing.ProductID === item.ProductID
      );
      if (existingItem) {
        return prevItems; // Don't add duplicate
      }
      return [...prevItems, item];
    });
  }, []);

  // Remove item from wishlist
  const removeItem = useCallback((productId: string) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.ProductID !== productId)
    );
  }, []);

  // Check if item is in wishlist
  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistItems.some((item) => item.ProductID === productId);
    },
    [wishlistItems]
  );

  // Toggle item in wishlist
  const toggleItem = useCallback(
    (item: WishlistItem) => {
      if (isInWishlist(item.ProductID)) {
        removeItem(item.ProductID);
      } else {
        addItem(item);
      }
    },
    [addItem, removeItem, isInWishlist]
  );

  // Clear all items
  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
  }, []);

  // Get wishlist count - use useMemo to ensure it updates when wishlistItems changes
  const itemCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  return {
    wishlistItems,
    isLoading,
    addItem,
    removeItem,
    isInWishlist,
    toggleItem,
    clearWishlist,
    itemCount,
  };
}
