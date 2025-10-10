import { create } from "zustand";

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchNotifications: () => Promise<void>;
  markAllRead: () => Promise<void>;
  removeNotification: (id: string) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;

  // Getters
  getUnreadCount: () => number;
}

// Mock data
const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Đơn hàng mới",
    message: "Bạn có 1 đơn hàng mới từ khách hàng Nguyễn Văn A",
    date: new Date().toISOString(),
    read: false,
  },
  {
    id: "n2",
    title: "Bảo trì hệ thống",
    message: "Hệ thống sẽ bảo trì vào lúc 22:00 - 23:00 hôm nay",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
  },
  {
    id: "n3",
    title: "Cập nhật sản phẩm",
    message: "Sản phẩm 'Áo thun nam' đã được cập nhật giá",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: false,
  },
  {
    id: "n4",
    title: "Thông báo thanh toán",
    message: "Đơn hàng #ORD-1001 đã thanh toán thành công",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true,
  },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ notifications: mockNotifications, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tải thông báo",
        isLoading: false,
      });
    }
  },

  markAllRead: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi đánh dấu đã đọc",
        isLoading: false,
      });
    }
  },

  removeNotification: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xóa thông báo",
        isLoading: false,
      });
    }
  },

  markAsRead: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200));

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi đánh dấu đã đọc",
        isLoading: false,
      });
    }
  },

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },
}));
