"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

export interface CartItem {
  CartItemID: string;
  ProductID: string;
  Product: {
    ProductID: string;
    Name: string;
    Images: string[];
    Type: string;
    Status: string;
    Description: string;
  };
  Quantity: number;
  UnitPrice: number;
  Size: string;
  Color: string;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
}

const CART_STORAGE_KEY = "memew-cart";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } else {
        // Bắt đầu với cart trống thay vì mock data
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        // Dispatch custom event để thông báo cho các component khác
        window.dispatchEvent(
          new CustomEvent("cartUpdated", {
            detail: {
              items: cartItems,
              itemCount: cartItems.reduce(
                (total, item) => total + item.Quantity,
                0
              ),
            },
          })
        );
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cartItems, isLoading]);

  // Listen for cart updates from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const newCartItems = JSON.parse(e.newValue);
          setCartItems(newCartItems);
        } catch (error) {
          console.error("Error parsing cart from storage event:", error);
        }
      }
    };

    const handleCartUpdate = (e: CustomEvent) => {
      // Force re-render when cart is updated
      setCartItems(e.detail.items);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleCartUpdate as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate as EventListener
      );
    };
  }, []);

  const addItem = useCallback(
    (product: Omit<CartItem, "CartItemID" | "Quantity">) => {
      setCartItems((prev) => {
        const existingItem = prev.find(
          (item) =>
            item.ProductID === product.ProductID &&
            item.Size === product.Size &&
            item.Color === product.Color
        );

        if (existingItem) {
          return prev.map((item) =>
            item.CartItemID === existingItem.CartItemID
              ? { ...item, Quantity: item.Quantity + 1 }
              : item
          );
        } else {
          const newItem: CartItem = {
            ...product,
            CartItemID: Date.now().toString(),
            Quantity: 1,
          };
          return [...prev, newItem];
        }
      });
    },
    []
  );

  const updateQuantity = useCallback((cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) =>
        prev.filter((item) => item.CartItemID !== cartItemId)
      );
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.CartItemID === cartItemId ? { ...item, Quantity: quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((cartItemId: string) => {
    setCartItems((prev) =>
      prev.filter((item) => item.CartItemID !== cartItemId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.UnitPrice * item.Quantity,
      0
    );
  }, [cartItems]);

  const shipping = useMemo(() => {
    return subtotal > 500000 ? 0 : 30000; // Miễn phí ship từ 500k
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + shipping;
  }, [subtotal, shipping]);

  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.Quantity, 0);
  }, [cartItems]);

  const cartState: CartState = {
    items: cartItems,
    itemCount,
    subtotal,
    shipping,
    total,
  };

  return {
    ...cartState,
    isLoading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
