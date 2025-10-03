import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function AccountPage() {
  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <h1 className="text-3xl font-bold">Tài khoản</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý thông tin tài khoản cá nhân
        </p>
      </div>
    </DashboardLayout>
  );
}
