import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header cố định */}
      <Header />

      {/* Main content */}
      <main className="flex-1 pt-[200px]">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
