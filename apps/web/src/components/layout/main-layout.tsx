import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { ChatWidget } from "../chat/chat-widget";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header cố định */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pt-[120px] md:pt-[200px]">{children}</main>

      {/* Footer */}
      <Footer />

      {/* Chat Widget - hiển thị ở mọi trang */}
      <ChatWidget />
    </div>
  );
}
