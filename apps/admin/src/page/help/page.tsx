import { DashboardLayout } from "@/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

/**
 * HelpPage - tài liệu và FAQ cho admin
 */
export default function HelpPage() {
  const faqs = [
    {
      category: "Quản lý sản phẩm",
      questions: [
        {
          q: "Làm sao để thêm sản phẩm mới?",
          a: "Vào mục 'Sản phẩm' → Nhấn 'Thêm sản phẩm' → Điền thông tin cơ bản (tên, giá, mô tả) → Upload ảnh sản phẩm → Chọn loại sản phẩm → Lưu thay đổi.",
        },
        {
          q: "Cách cập nhật thông tin sản phẩm?",
          a: "Tìm sản phẩm cần sửa trong danh sách → Nhấn nút 'Chỉnh sửa' → Thay đổi thông tin → Nhấn 'Cập nhật' để lưu thay đổi.",
        },
        {
          q: "Làm thế nào để xóa sản phẩm?",
          a: "Tìm sản phẩm cần xóa → Nhấn nút 'Xóa' → Xác nhận trong hộp thoại → Sản phẩm sẽ bị xóa khỏi hệ thống.",
        },
      ],
    },
    {
      category: "Quản lý đơn hàng",
      questions: [
        {
          q: "Cách xem đơn hàng mới?",
          a: "Vào mục 'Đơn hàng' để xem tất cả đơn hàng. Đơn hàng mới sẽ có trạng thái 'Chờ xử lý' và được đánh dấu màu xanh.",
        },
        {
          q: "Làm sao để cập nhật trạng thái đơn hàng?",
          a: "Chọn đơn hàng cần cập nhật → Nhấn 'Cập nhật trạng thái' → Chọn trạng thái mới (Đang xử lý, Đã giao hàng, v.v.) → Xác nhận.",
        },
        {
          q: "Cách refund đơn hàng?",
          a: "Mở đơn hàng cần hoàn tiền → Chọn 'Hoàn tiền' → Nhập lý do hoàn tiền → Thực hiện hoàn tiền trên hệ thống thanh toán → Cập nhật trạng thái thành 'Đã hoàn tiền'.",
        },
      ],
    },
    {
      category: "Cài đặt hệ thống",
      questions: [
        {
          q: "Làm sao để thay đổi tên cửa hàng?",
          a: "Vào mục 'Cài đặt' → Chỉnh sửa trường 'Tên cửa hàng' → Nhấn 'Lưu thay đổi'. Thay đổi sẽ có hiệu lực ngay lập tức.",
        },
        {
          q: "Cách upload logo cửa hàng?",
          a: "Vào 'Cài đặt' → Tìm mục 'Logo cửa hàng' → Kéo thả file ảnh hoặc nhấn 'Chọn hình ảnh' → Chọn file JPG/PNG (tối đa 5MB) → Logo sẽ được cập nhật.",
        },
        {
          q: "Làm thế nào để thay đổi nội dung trang chủ?",
          a: "Vào 'Cài đặt' → Chỉnh sửa trường 'Mô tả landing' → Nhập nội dung muốn hiển thị trên trang chủ → Lưu thay đổi.",
        },
      ],
    },
    {
      category: "Tài khoản & Bảo mật",
      questions: [
        {
          q: "Cách thay đổi thông tin cá nhân?",
          a: "Vào mục 'Tài khoản' → Chỉnh sửa thông tin (tên, email, ảnh đại diện) → Nhấn 'Lưu thay đổi'.",
        },
        {
          q: "Làm sao để đăng xuất?",
          a: "Vào mục 'Tài khoản' → Nhấn nút 'Đăng xuất' → Xác nhận trong hộp thoại → Hệ thống sẽ chuyển về trang đăng nhập.",
        },
      ],
    },
  ];

  const quickLinks = [
    {
      title: "Hướng dẫn sử dụng",
      description: "Tài liệu chi tiết về các tính năng",
      icon: BookOpen,
      href: "#",
    },
    {
      title: "Video hướng dẫn",
      description: "Các video tutorial từng bước",
      icon: MessageCircle,
      href: "#",
    },
    {
      title: "Liên hệ hỗ trợ",
      description: "Đội ngũ hỗ trợ 24/7",
      icon: Phone,
      href: "#",
    },
  ];

  return (
    <DashboardLayout>
      <div className="px-4 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Trợ giúp</h1>
          <p className="text-muted-foreground mt-2">
            Tài liệu hướng dẫn và hỗ trợ sử dụng hệ thống
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickLinks.map((link, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <link.icon className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <HelpCircle className="w-6 h-6" />
              <CardTitle className="text-2xl">Câu hỏi thường gặp</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground">
              Tìm câu trả lời cho các câu hỏi phổ biến về việc sử dụng hệ thống
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {section.category}
                  </Badge>
                </div>

                <div className="space-y-3 ml-4">
                  {section.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border rounded-lg p-4">
                      <div className="font-medium text-gray-900 mb-2">
                        {faq.q}
                      </div>
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Liên hệ hỗ trợ</CardTitle>
            <p className="text-sm text-muted-foreground">
              Nếu bạn không tìm thấy câu trả lời, hãy liên hệ với đội ngũ hỗ trợ
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Email hỗ trợ</div>
                  <div className="text-sm text-muted-foreground">
                    support@memew.test
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Hotline</div>
                  <div className="text-sm text-muted-foreground">1900 1234</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Giờ làm việc</div>
                  <div className="text-sm text-muted-foreground">
                    Thứ 2 - Thứ 6: 8:00 - 17:00
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium">Chat trực tuyến</div>
                  <div className="text-sm text-muted-foreground">
                    Có sẵn 24/7
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Lưu ý:</strong> Khi liên hệ hỗ trợ, vui lòng cung cấp
                thông tin về vấn đề bạn đang gặp phải và các bước đã thực hiện
                để chúng tôi có thể hỗ trợ bạn tốt nhất.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
