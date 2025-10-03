import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/page/login/page";
import DashboardPage from "@/page/dashboard/page";
import ProductsPage from "@/page/products/page";
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
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}
