import { create } from "zustand";

export interface ProductType {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

interface ProductTypeStore {
  productTypes: ProductType[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProductTypes: () => Promise<void>;
  addProductType: (name: string) => Promise<void>;
  updateProductType: (id: string, name: string) => Promise<void>;
  deleteProductType: (id: string) => Promise<void>;
  toggleProductTypeStatus: (id: string) => Promise<void>;

  // Getters
  getProductTypeById: (id: string) => ProductType | undefined;
  getActiveProductTypes: () => ProductType[];
}

// Mock data
const mockProductTypes: ProductType[] = [
  {
    id: "1",
    name: "Áo thun",
    status: "active",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Sticker",
    status: "active",
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    name: "Ly, cốc",
    status: "active",
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
];

export const useProductTypeStore = create<ProductTypeStore>((set, get) => ({
  productTypes: [],
  isLoading: false,
  error: null,

  fetchProductTypes: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ productTypes: mockProductTypes, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tải danh sách loại sản phẩm",
        isLoading: false,
      });
    }
  },

  addProductType: async (name: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      const newProductType: ProductType = {
        id: crypto.randomUUID(),
        name: name.trim(),
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set((state) => ({
        productTypes: [...state.productTypes, newProductType],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi thêm loại sản phẩm",
        isLoading: false,
      });
    }
  },

  updateProductType: async (id: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      set((state) => ({
        productTypes: state.productTypes.map((type) =>
          type.id === id
            ? { ...type, name: name.trim(), updatedAt: new Date() }
            : type
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi cập nhật loại sản phẩm",
        isLoading: false,
      });
    }
  },

  deleteProductType: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      set((state) => ({
        productTypes: state.productTypes.filter((type) => type.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xóa loại sản phẩm",
        isLoading: false,
      });
    }
  },

  toggleProductTypeStatus: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      set((state) => ({
        productTypes: state.productTypes.map((type) =>
          type.id === id
            ? {
                ...type,
                status: type.status === "active" ? "inactive" : "active",
                updatedAt: new Date(),
              }
            : type
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi thay đổi trạng thái loại sản phẩm",
        isLoading: false,
      });
    }
  },

  getProductTypeById: (id: string) => {
    return get().productTypes.find((type) => type.id === id);
  },

  getActiveProductTypes: () => {
    return get().productTypes.filter((type) => type.status === "active");
  },
}));
