import { create } from "zustand";

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Delivered"
  | "Cancelled"
  | "Refunded";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  orderDate: string;
  status: OrderStatus;
  paymentMethod: "Cash" | "VNPay" | "BankTransfer";
  items: OrderItem[];
  total: number;
  shippingAddress: string;
  notes?: string;
}

interface OrderState {
  orders: Order[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
}

// Mock data
const mockOrders: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@email.com",
    customerPhone: "0901234567",
    orderDate: new Date().toISOString(),
    status: "Pending",
    paymentMethod: "VNPay",
    items: [
      { id: "p1", name: "Áo thun nam", quantity: 2, unitPrice: 150000 },
      { id: "p2", name: "Sticker logo", quantity: 3, unitPrice: 10000 },
    ],
    total: 2 * 150000 + 3 * 10000,
    shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
    notes: "Giao hàng vào buổi sáng",
  },
  {
    id: "ORD-1002",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@email.com",
    customerPhone: "0987654321",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: "Delivered",
    paymentMethod: "Cash",
    items: [{ id: "p3", name: "Ly sứ cao cấp", quantity: 1, unitPrice: 90000 }],
    total: 90000,
    shippingAddress: "456 Đường XYZ, Quận 3, TP.HCM",
  },
  {
    id: "ORD-1003",
    customerName: "Lê Văn C",
    customerEmail: "levanc@email.com",
    customerPhone: "0912345678",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: "Processing",
    paymentMethod: "BankTransfer",
    items: [
      { id: "p4", name: "Móc khóa kim loại", quantity: 5, unitPrice: 25000 },
      { id: "p5", name: "Túi vải canvas", quantity: 2, unitPrice: 120000 },
    ],
    total: 5 * 25000 + 2 * 120000,
    shippingAddress: "789 Đường DEF, Quận 5, TP.HCM",
    notes: "Khách hàng VIP",
  },
  {
    id: "ORD-1004",
    customerName: "Phạm Thị D",
    customerEmail: "phamthid@email.com",
    customerPhone: "0923456789",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    status: "Cancelled",
    paymentMethod: "VNPay",
    items: [{ id: "p6", name: "Áo hoodie", quantity: 1, unitPrice: 350000 }],
    total: 350000,
    shippingAddress: "321 Đường GHI, Quận 7, TP.HCM",
    notes: "Hủy do thay đổi ý định",
  },
  {
    id: "ORD-1005",
    customerName: "Hoàng Văn E",
    customerEmail: "hoangvane@email.com",
    customerPhone: "0934567890",
    orderDate: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    status: "Refunded",
    paymentMethod: "VNPay",
    items: [{ id: "p7", name: "Balo du lịch", quantity: 1, unitPrice: 450000 }],
    total: 450000,
    shippingAddress: "654 Đường JKL, Quận 10, TP.HCM",
    notes: "Sản phẩm bị lỗi, đã hoàn tiền",
  },
];

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      set({ orders: mockOrders, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tải danh sách đơn hàng",
        isLoading: false,
      });
    }
  },

  updateOrderStatus: async (id: string, status: OrderStatus) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id ? { ...order, status } : order
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi cập nhật trạng thái đơn hàng",
        isLoading: false,
      });
    }
  },

  deleteOrder: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      set((state) => ({
        orders: state.orders.filter((order) => order.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xóa đơn hàng",
        isLoading: false,
      });
    }
  },

  getOrderById: (id: string) => {
    return get().orders.find((order) => order.id === id);
  },

  getOrdersByStatus: (status: OrderStatus) => {
    return get().orders.filter((order) => order.status === status);
  },
}));
