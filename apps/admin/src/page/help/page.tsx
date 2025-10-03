import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <h1 className="text-3xl font-bold">Trợ giúp</h1>
        <p className="text-muted-foreground mt-2">
          Tài liệu hướng dẫn và hỗ trợ sử dụng hệ thống
        </p>
      </div>
    </DashboardLayout>
  );
}
