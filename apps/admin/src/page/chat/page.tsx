import { DashboardLayout } from "@/layouts/dashboard-layout";

export default function ChatPage() {
  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <h1 className="text-3xl font-bold">Chat</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý chat với khách hàng
        </p>
      </div>
    </DashboardLayout>
  );
}
