import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <h1 className="text-3xl font-bold">Quản lý Hóa đơn</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý hóa đơn và giao dịch trong hệ thống
        </p>
      </div>
    </DashboardLayout>
  );
}
