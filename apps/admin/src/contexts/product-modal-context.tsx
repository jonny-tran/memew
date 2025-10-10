import { createContext, useContext, useState } from "react";
import type { Product } from "@packages/types";

interface ProductModalContextType {
  isFormDialogOpen: boolean;
  editingProduct: Product | undefined;
  openAddProductModal: () => void;
  openEditProductModal: (product: Product) => void;
  closeModal: () => void;
}

const ProductModalContext = createContext<ProductModalContextType | undefined>(
  undefined
);

export function ProductModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const openAddProductModal = () => {
    setEditingProduct(undefined);
    setIsFormDialogOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setIsFormDialogOpen(true);
  };

  const closeModal = () => {
    setIsFormDialogOpen(false);
    setEditingProduct(undefined);
  };

  return (
    <ProductModalContext.Provider
      value={{
        isFormDialogOpen,
        editingProduct,
        openAddProductModal,
        openEditProductModal,
        closeModal,
      }}
    >
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  const context = useContext(ProductModalContext);
  if (context === undefined) {
    throw new Error(
      "useProductModal must be used within a ProductModalProvider"
    );
  }
  return context;
}
