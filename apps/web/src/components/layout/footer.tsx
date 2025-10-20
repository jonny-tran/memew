import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const supportLinks = [
    { name: "Đơn hàng của bạn", href: "/orders-history" },
    { name: "Tài khoản", href: "/profile" },
    { name: "FAQs", href: "/faqs" },
  ];

  const aboutLinks = [{ name: "Giới Thiệu", href: "/about" }];

  const policyLinks = [
    { name: "Chính sách bảo mật", href: "/privacy-policy" },
    { name: "Chính sách đổi trả", href: "/refund-policy" },
  ];

  const shopeeLink = {
    name: "Shopee",
    href: "https://shopee.vn/memewstore",
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Hỗ trợ */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm">Hỗ trợ</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Về chúng tôi */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm">Về chúng tôi</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Chính Sách */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm">Chính Sách</h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  0559001543
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Mewmemes1@gmail.com
                </span>
              </div>
              <div className="flex space-x-4">
                <Link
                  href={shopeeLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={shopeeLink.name}
                >
                  <Image
                    src="/shopee-seeklogo.svg"
                    alt="Shopee"
                    width={120}
                    height={120}
                    className="h-30 w-30"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Logo và Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo-memew.svg"
                alt="MEMEW Logo"
                width={160}
                height={160}
                className="w-32 h-32"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Mew tung chiêu, triệu tim yêu! Đăng ký ngay ✨
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter email address..."
                className="flex-1"
              />
              <Button size="sm">Đăng Ký</Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Memew. Tất cả quyền được bảo lưu.
            </p>
            <div className="text-sm text-muted-foreground">
              Được phát triển với ❤️ tại Việt Nam
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
