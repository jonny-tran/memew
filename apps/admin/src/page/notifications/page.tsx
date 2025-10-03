import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <h1 className="text-3xl font-bold">Thông báo</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý và xem tất cả thông báo hệ thống
        </p>
      </div>
    </DashboardLayout>
  );
}
