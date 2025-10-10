import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/page/login/page";
import DashboardPage from "@/page/dashboard/page";
import ProductsPage from "@/page/products/page";
import ProductDetailPage from "@/page/products/[id]/page";
import CategoriesPage from "@/page/categories/page";
import InvoicesPage from "@/page/invoices/page";
import SettingsPage from "@/page/settings/page";
import HelpPage from "@/page/help/page";
import AccountPage from "@/page/account/page";
import NotificationsPage from "@/page/notifications/page";
import ChatPage from "@/page/chat/page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={<DashboardPage />} />
      <Route path="/admin/products" element={<ProductsPage />} />
      <Route path="/admin/products/:id" element={<ProductDetailPage />} />
      <Route path="/admin/categories" element={<CategoriesPage />} />
      <Route path="/admin/invoices" element={<InvoicesPage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
      <Route path="/admin/help" element={<HelpPage />} />
      <Route path="/admin/account" element={<AccountPage />} />
      <Route path="/admin/notifications" element={<NotificationsPage />} />
      <Route path="/admin/chat" element={<ChatPage />} />
    </Routes>
  );
}
