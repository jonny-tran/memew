import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <h1 className="text-3xl font-bold">Cài đặt hệ thống</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý cài đặt và cấu hình hệ thống admin
        </p>
      </div>
    </DashboardLayout>
  );
}
