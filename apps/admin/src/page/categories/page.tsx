import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function CategoriesPage() {
  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <h1 className="text-3xl font-bold">Quản lý Loại sản phẩm</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý các loại sản phẩm và phân loại
        </p>
      </div>
    </DashboardLayout>
  );
}
