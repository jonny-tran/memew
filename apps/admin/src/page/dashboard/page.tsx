import { AdminMetrics } from "@/components/dashboard/admin-metrics";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { ProductTable } from "@/components/dashboard/product-table";
import { SectionCards } from "@/components/dashboard/section-cards";
import { DashboardLayout } from "@/layouts/dashboard-layout";

import data from "./data.json";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="py-6">
        <AdminMetrics />
      </div>
      <ProductTable data={data} />
    </DashboardLayout>
  );
}
