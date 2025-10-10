import { create } from "zustand";

export interface Settings {
  // System settings
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  autoBackup: boolean;
  backupFrequency: "daily" | "weekly" | "monthly";
  maxFileSize: number; // in MB
  allowedFileTypes: string[];
  sessionTimeout: number; // in minutes
  twoFactorAuth: boolean;
}

interface SettingsState {
  settings: Settings;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchSettings: () => Promise<void>;
  updateSettings: (payload: Partial<Settings>) => Promise<void>;
}

// Mock data
const mockSettings: Settings = {
  maintenanceMode: false,
  allowRegistration: true,
  emailNotifications: true,
  smsNotifications: false,
  autoBackup: true,
  backupFrequency: "daily",
  maxFileSize: 10,
  allowedFileTypes: ["jpg", "jpeg", "png", "gif", "pdf"],
  sessionTimeout: 30,
  twoFactorAuth: false,
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: mockSettings,
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ settings: mockSettings, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi tải cài đặt",
        isLoading: false,
      });
    }
  },

  updateSettings: async (payload: Partial<Settings>) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      set((state) => ({
        settings: { ...state.settings, ...payload },
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi cập nhật cài đặt",
        isLoading: false,
      });
    }
  },
}));
