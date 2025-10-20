import { create } from "zustand";

export type Sender = "customer" | "admin";

export interface Message {
  id: string;
  from: Sender;
  text: string;
  createdAt: string;
  file?: {
    name: string;
    type: string;
    size: number;
  };
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  avatarUrl?: string | null;
  online?: boolean;
  messages: Message[];
  lastMessageAt: string;
  lastMessagePreview: string;
  unreadCount: number;
}

interface ChatState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  fetchConversations: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (
    conversationId: string,
    text: string,
    file?: File | null
  ) => void;
  receiveMockMessage: (conversationId: string, text: string) => void;
  markAsRead: (conversationId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [
    {
      id: "C-1",
      customerId: "u-101",
      customerName: "Nguyễn Văn A",
      avatarUrl: null,
      online: true,
      messages: [
        {
          id: "m1",
          from: "customer",
          text: "Xin chào, còn áo size M không?",
          createdAt: new Date().toISOString(),
        },
      ],
      lastMessageAt: new Date().toISOString(),
      lastMessagePreview: "Xin chào, còn áo size M không?",
      unreadCount: 1,
    },
    {
      id: "C-2",
      customerId: "u-102",
      customerName: "Trần Thị B",
      avatarUrl: null,
      online: false,
      messages: [
        {
          id: "m2",
          from: "customer",
          text: "Khi nào giao hàng?",
          createdAt: new Date().toISOString(),
        },
      ],
      lastMessageAt: new Date().toISOString(),
      lastMessagePreview: "Khi nào giao hàng?",
      unreadCount: 0,
    },
    {
      id: "C-3",
      customerId: "u-103",
      customerName: "Lê Văn C",
      avatarUrl: null,
      online: true,
      messages: [
        {
          id: "m3",
          from: "customer",
          text: "Tôi muốn đổi size L",
          createdAt: new Date().toISOString(),
        },
        {
          id: "m4",
          from: "admin",
          text: "Được ạ, bạn có thể đổi trong vòng 7 ngày",
          createdAt: new Date().toISOString(),
        },
      ],
      lastMessageAt: new Date().toISOString(),
      lastMessagePreview: "Được ạ, bạn có thể đổi trong vòng 7 ngày",
      unreadCount: 0,
    },
  ],
  selectedConversationId: null,
  fetchConversations: () => {
    // stub: could fetch from API
    set((s) => s);
    // Start a simple mock incoming message every 30s (optional)
    // const interval = setInterval(() => get().receiveMockMessage("C-1", "Tin nhắn mẫu tự động"), 30000);
    // store interval id if you want to clear later
  },
  selectConversation: (id) => set({ selectedConversationId: id }),
  sendMessage: (conversationId, text, file) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      from: "admin",
      text: file ? `${text} [file:${file.name}]` : text,
      createdAt: new Date().toISOString(),
      file: file
        ? {
            name: file.name,
            type: file.type,
            size: file.size,
          }
        : undefined,
    };
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, msg],
              lastMessageAt: msg.createdAt,
              lastMessagePreview: msg.text,
            }
          : c
      ),
    }));
  },
  receiveMockMessage: (conversationId, text) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      from: "customer",
      text,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              messages: [...c.messages, msg],
              lastMessageAt: msg.createdAt,
              lastMessagePreview: msg.text,
              unreadCount:
                c.id === state.selectedConversationId ? 0 : c.unreadCount + 1,
            }
          : c
      ),
    }));
  },
  markAsRead: (conversationId) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
    })),
}));
