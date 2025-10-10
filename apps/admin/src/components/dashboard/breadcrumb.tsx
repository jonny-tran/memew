import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DynamicBreadcrumbProps {
  items?: BreadcrumbItem[];
}

export function DynamicBreadcrumb({ items }: DynamicBreadcrumbProps) {
  const location = useLocation();

  // Tự động tạo breadcrumb từ URL nếu không có items được truyền vào
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Map các segment thành breadcrumb items
    pathSegments.forEach((segment, index) => {
      // Skip admin segment
      if (segment === "admin") {
        return;
      }

      const path = "/" + pathSegments.slice(0, index + 1).join("/");

      // Map segment thành label thân thiện
      let label = segment;
      switch (segment) {
        case "dashboard":
          label = "Dashboard";
          break;
        case "products":
          label = "Sản phẩm";
          break;
        case "product-types":
          label = "Loại sản phẩm";
          break;
        case "invoices":
          label = "Hóa đơn";
          break;
        case "settings":
          label = "Cài đặt";
          break;
        case "help":
          label = "Trợ giúp";
          break;
        case "account":
          label = "Tài khoản";
          break;
        case "notifications":
          label = "Thông báo";
          break;
        case "chat":
          label = "Chat";
          break;
        default:
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      // Chỉ item cuối cùng không có href
      if (index === pathSegments.length - 1) {
        breadcrumbs.push({ label });
      } else {
        breadcrumbs.push({ label, href: path });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              {item.href ? (
                <BreadcrumbLink asChild>
                  <Link to={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
