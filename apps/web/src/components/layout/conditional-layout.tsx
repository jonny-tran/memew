"use client";

import { usePathname } from "next/navigation";
import { MainLayout } from "./main-layout";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Các trang không sử dụng MainLayout
  const noLayoutPages = ["/login", "/signup"];

  // Nếu là trang login hoặc signup, render children trực tiếp
  if (noLayoutPages.includes(pathname)) {
    return <>{children}</>;
  }

  // Các trang khác sử dụng MainLayout
  return <MainLayout>{children}</MainLayout>;
}
