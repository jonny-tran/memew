import { Card } from "@/components/ui/card";
import {
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Mail,
} from "lucide-react";

export default function RefundPolicyPage() {
  const policySections = [
    {
      icon: Clock,
      title: "Thời gian đổi trả",
      content: [
        "Bạn có thể yêu cầu đổi trả trong vòng 7 ngày kể từ ngày nhận hàng.",
        "Đối với sản phẩm lỗi từ nhà sản xuất: 30 ngày kể từ ngày nhận hàng.",
        "Thời gian xử lý đổi trả: 3-5 ngày làm việc sau khi nhận được sản phẩm.",
        "Thời gian hoàn tiền: 5-7 ngày làm việc sau khi xác nhận đổi trả.",
      ],
    },
    {
      icon: CheckCircle,
      title: "Điều kiện đổi trả",
      content: [
        "Sản phẩm còn nguyên vẹn, chưa sử dụng và còn đầy đủ phụ kiện đi kèm.",
        "Sản phẩm không bị hư hỏng, bẩn hoặc có dấu hiệu sử dụng.",
        "Còn giữ hóa đơn mua hàng hoặc email xác nhận đơn hàng.",
        "Sản phẩm không thuộc danh mục không được đổi trả (đồ lót, sản phẩm cá nhân hóa).",
      ],
    },
    {
      icon: XCircle,
      title: "Trường hợp không được đổi trả",
      content: [
        "Sản phẩm đã được sử dụng hoặc có dấu hiệu hư hỏng do người dùng.",
        "Sản phẩm bị mất phụ kiện, hộp đựng hoặc tài liệu hướng dẫn.",
        "Sản phẩm đã được cá nhân hóa theo yêu cầu của khách hàng.",
        "Đơn hàng đã quá thời hạn đổi trả quy định.",
        "Sản phẩm thuộc danh mục đồ lót, mỹ phẩm đã mở niêm phong.",
      ],
    },
    {
      icon: RefreshCw,
      title: "Quy trình đổi trả",
      content: [
        "Bước 1: Liên hệ hotline hoặc gửi email yêu cầu đổi trả với mã đơn hàng.",
        "Bước 2: Cung cấp lý do đổi trả và hình ảnh sản phẩm (nếu cần).",
        "Bước 3: Nhận hướng dẫn gửi hàng về kho từ đội ngũ hỗ trợ.",
        "Bước 4: Gửi sản phẩm về địa chỉ được cung cấp (khách hàng chịu phí vận chuyển).",
        "Bước 5: Nhận hoàn tiền hoặc sản phẩm thay thế sau khi kiểm tra.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Phí đổi trả",
      content: [
        "Khách hàng chịu phí vận chuyển khi gửi sản phẩm về kho (30.000đ - 50.000đ).",
        "Miễn phí vận chuyển đổi trả nếu sản phẩm có lỗi từ nhà sản xuất.",
        "Phí xử lý đổi trả: 0đ (miễn phí hoàn toàn).",
        "Phí hoàn tiền: 0đ (hoàn tiền 100% giá trị sản phẩm).",
      ],
    },
  ];

  const refundMethods = [
    {
      method: "Hoàn tiền qua tài khoản ngân hàng",
      time: "3-5 ngày làm việc",
      condition: "Cung cấp thông tin tài khoản chính xác",
    },
    {
      method: "Hoàn tiền qua ví điện tử",
      time: "1-2 ngày làm việc",
      condition: "MoMo, ZaloPay, ViettelPay",
    },
    {
      method: "Hoàn tiền qua thẻ tín dụng",
      time: "5-7 ngày làm việc",
      condition: "Thẻ đã sử dụng để thanh toán",
    },
    {
      method: "Đổi sản phẩm khác",
      time: "2-3 ngày làm việc",
      condition: "Chọn sản phẩm có giá trị tương đương",
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
                <RefreshCw className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-4">
              Chính Sách Đổi Trả
            </h1>
            <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto">
              Cam kết đảm bảo quyền lợi khách hàng với chính sách đổi trả minh
              bạch và công bằng
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
                Tại Memew, chúng tôi cam kết mang đến trải nghiệm mua sắm tốt
                nhất cho khách hàng. Nếu bạn không hài lòng với sản phẩm đã mua,
                chúng tôi sẽ hỗ trợ đổi trả một cách nhanh chóng và thuận tiện.
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

          {/* Refund Methods */}
          <Card className="mt-8 p-6 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              Phương thức hoàn tiền
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {refundMethods.map((method, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg"
                >
                  <h4 className="font-semibold text-foreground mb-2">
                    {method.method}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-1">
                    <strong>Thời gian:</strong> {method.time}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Điều kiện:</strong> {method.condition}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Cần hỗ trợ đổi trả?
              </h2>
              <p className="text-muted-foreground mb-6">
                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn xử lý yêu
                cầu đổi trả một cách nhanh chóng
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <RefreshCw className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Hotline</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    1900 1234 567
                  </p>
                  <p className="text-xs text-muted-foreground">
                    8:00 - 22:00 hàng ngày
                  </p>
                </div>

                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    refund@memew.com
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Phản hồi trong 2h
                  </p>
                </div>

                <div className="p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Trò chuyện trực tiếp
                  </p>
                  <p className="text-xs text-muted-foreground">8:00 - 18:00</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-green-800 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    Cam kết chất lượng dịch vụ:
                  </span>
                </div>
                <p className="text-sm text-green-700">
                  Xử lý đổi trả trong 24h | Hoàn tiền 100% | Hỗ trợ miễn phí
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
