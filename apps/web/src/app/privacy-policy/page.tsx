import { Card } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Users, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  const policySections = [
    {
      icon: Eye,
      title: "Thu thập thông tin",
      content: [
        "Chúng tôi thu thập thông tin cá nhân khi bạn đăng ký tài khoản, đặt hàng, hoặc liên hệ với chúng tôi.",
        "Thông tin thu thập bao gồm: họ tên, địa chỉ email, số điện thoại, địa chỉ giao hàng, thông tin thanh toán.",
        "Chúng tôi cũng thu thập thông tin về cách bạn sử dụng website thông qua cookies và các công nghệ tương tự.",
      ],
    },
    {
      icon: Database,
      title: "Sử dụng thông tin",
      content: [
        "Xử lý và thực hiện đơn hàng của bạn.",
        "Cung cấp dịch vụ khách hàng và hỗ trợ kỹ thuật.",
        "Gửi thông tin về sản phẩm mới, khuyến mãi và cập nhật dịch vụ (nếu bạn đồng ý).",
        "Cải thiện website và trải nghiệm người dùng.",
        "Tuân thủ các nghĩa vụ pháp lý và quy định.",
      ],
    },
    {
      icon: Lock,
      title: "Bảo mật thông tin",
      content: [
        "Chúng tôi sử dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin cá nhân của bạn.",
        "Tất cả dữ liệu được mã hóa trong quá trình truyền tải và lưu trữ.",
        "Chỉ những nhân viên có thẩm quyền mới được tiếp cận thông tin cá nhân của bạn.",
        "Chúng tôi thường xuyên cập nhật và cải thiện các biện pháp bảo mật.",
      ],
    },
    {
      icon: Users,
      title: "Chia sẻ thông tin",
      content: [
        "Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba vì mục đích thương mại.",
        "Thông tin có thể được chia sẻ với các đối tác vận chuyển để thực hiện giao hàng.",
        "Chúng tôi có thể chia sẻ thông tin khi được yêu cầu bởi cơ quan pháp luật hoặc để bảo vệ quyền lợi hợp pháp của chúng tôi.",
        "Trong trường hợp sáp nhập hoặc mua lại, thông tin có thể được chuyển giao cho bên mới.",
      ],
    },
    {
      icon: FileText,
      title: "Quyền của bạn",
      content: [
        "Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình.",
        "Bạn có thể từ chối nhận email marketing bất cứ lúc nào.",
        "Bạn có quyền yêu cầu chúng tôi ngừng xử lý thông tin cá nhân của bạn.",
        "Bạn có quyền khiếu nại với cơ quan bảo vệ dữ liệu nếu bạn cho rằng quyền riêng tư của mình bị vi phạm.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-accent py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-4">
              Chính Sách Bảo Mật
            </h1>
            <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto">
              Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-8 mb-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Cam kết của chúng tôi
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Tại Memew, chúng tôi hiểu rằng việc bảo vệ thông tin cá nhân của
                bạn là vô cùng quan trọng. Chính sách bảo mật này giải thích
                cách chúng tôi thu thập, sử dụng, bảo vệ và chia sẻ thông tin cá
                nhân của bạn khi sử dụng dịch vụ của chúng tôi.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong>Cập nhật lần cuối:</strong> 15/12/2024
              </p>
            </div>
          </Card>

          {/* Policy Sections */}
          <div className="space-y-8">
            {policySections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={index} className="p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start gap-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground leading-relaxed">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Contact Information */}
          <Card className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Liên hệ về quyền riêng tư
              </h2>
              <p className="text-muted-foreground mb-6">
                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc
                muốn thực hiện quyền của mình, vui lòng liên hệ với chúng tôi:
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground">
                    privacy@memew.com
                  </p>
                </div>
                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Hotline</h3>
                  <p className="text-sm text-muted-foreground">1900 1234 567</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Lưu ý:</strong> Chúng tôi có thể cập nhật chính sách
                  bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo
                  trên website và có hiệu lực ngay lập tức.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
