import { create } from "zustand";

export interface Account {
  // Admin account info
  adminName: string;
  email: string;
  avatarUrl?: string | null;

  // Shop information for customer website
  shopName: string;
  shopLogoUrl?: string | null;
  shopDescription: string;
  contactEmail: string;
  phoneNumber?: string;
  address?: string;

  // Website content
  homepageHeroText: string;
  homepageHeroImage?: string | null;
  aboutPageTitle: string;
  aboutPageContent: string;
  aboutPageImage?: string | null;

  // Social media
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

interface AccountState {
  account: Account;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchAccount: () => Promise<void>;
  updateAccount: (payload: Partial<Account>) => Promise<void>;
  logout: () => void;
}

// Mock data
const mockAccount: Account = {
  // Admin account info
  adminName: "Admin Memew",
  email: "admin@memew.test",
  avatarUrl: null,

  // Shop information
  shopName: "Memew Shop",
  shopLogoUrl: null,
  shopDescription:
    "Cửa hàng sản phẩm của sinh viên với chất lượng cao và giá cả hợp lý",
  contactEmail: "contact@memew.test",
  phoneNumber: "0123 456 789",
  address: "123 Đường ABC, Quận 1, TP.HCM",

  // Website content
  homepageHeroText:
    "Chào mừng đến với Memew Shop - Nơi bạn tìm thấy những sản phẩm chất lượng cao với giá cả phải chăng",
  homepageHeroImage: null,
  aboutPageTitle: "Về chúng tôi",
  aboutPageContent:
    "Memew Shop được thành lập bởi các sinh viên với mục tiêu mang đến những sản phẩm chất lượng cao cho mọi người. Chúng tôi cam kết cung cấp dịch vụ tốt nhất và sản phẩm đáng tin cậy.",
  aboutPageImage: null,

  // Social media
  facebookUrl: "https://facebook.com/memewshop",
  instagramUrl: "https://instagram.com/memewshop",
  twitterUrl: "https://twitter.com/memewshop",

  // SEO
  metaTitle: "Memew Shop - Sản phẩm chất lượng cao",
  metaDescription:
    "Cửa hàng sản phẩm của sinh viên với chất lượng cao và giá cả hợp lý",
  metaKeywords: ["shop", "sản phẩm", "sinh viên", "chất lượng", "giá rẻ"],
};

export const useAccountStore = create<AccountState>((set) => ({
  account: mockAccount,
  isLoading: false,
  error: null,

  fetchAccount: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ account: mockAccount, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tải thông tin tài khoản",
        isLoading: false,
      });
    }
  },

  updateAccount: async (payload: Partial<Account>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      set((state) => ({
        account: { ...state.account, ...payload },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi cập nhật thông tin tài khoản",
        isLoading: false,
      });
    }
  },

  logout: () => {
    // Clear auth data and redirect to login
    localStorage.removeItem("auth_token");
    localStorage.removeItem("admin_data");
    // In a real app, you would redirect to login page
    console.log("Đã đăng xuất khỏi hệ thống");
    window.location.href = "/login";
  },
}));
