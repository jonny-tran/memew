import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, Mail, Phone, Clock } from "lucide-react";

export default function FAQsPage() {
  const faqData = [
    {
      category: "Sản phẩm",
      questions: [
        {
          question: "Các sản phẩm của Memew được làm từ chất liệu gì?",
          answer:
            "Tất cả sản phẩm của chúng tôi đều được làm từ chất liệu cao cấp, an toàn cho sức khỏe. Áo thun được làm từ 100% cotton, ly sứ được làm từ gốm sứ cao cấp, móc khóa và ốp lưng được làm từ nhựa ABS an toàn, sticker được in trên giấy decal chất lượng cao.",
        },
        {
          question: "Kích thước áo thun như thế nào?",
          answer:
            "Chúng tôi có đầy đủ các size từ S đến XXL. Bạn có thể tham khảo bảng size chi tiết trong trang sản phẩm. Nếu bạn không chắc chắn về size, hãy liên hệ với chúng tôi để được tư vấn miễn phí.",
        },
        {
          question: "Sản phẩm có bền không?",
          answer:
            "Tất cả sản phẩm của chúng tôi đều được sản xuất với tiêu chuẩn chất lượng cao. Áo thun có thể giặt máy, ly sứ có thể sử dụng trong lò vi sóng, móc khóa và ốp lưng có độ bền cao. Chúng tôi cam kết đổi trả nếu sản phẩm có lỗi từ nhà sản xuất.",
        },
      ],
    },
    {
      category: "Đặt hàng & Thanh toán",
      questions: [
        {
          question: "Làm thế nào để đặt hàng?",
          answer:
            "Bạn có thể đặt hàng dễ dàng qua website của chúng tôi. Chỉ cần chọn sản phẩm yêu thích, thêm vào giỏ hàng, điền thông tin giao hàng và thanh toán. Hệ thống sẽ gửi email xác nhận đơn hàng cho bạn.",
        },
        {
          question: "Có những phương thức thanh toán nào?",
          answer:
            "Chúng tôi hỗ trợ nhiều phương thức thanh toán: thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay), và thanh toán khi nhận hàng (COD) cho đơn hàng trong nội thành.",
        },
        {
          question: "Tôi có thể hủy đơn hàng không?",
          answer:
            "Bạn có thể hủy đơn hàng trong vòng 24 giờ kể từ khi đặt hàng. Sau thời gian này, đơn hàng đã được xử lý và không thể hủy. Vui lòng liên hệ hotline để được hỗ trợ.",
        },
      ],
    },
    {
      category: "Giao hàng & Vận chuyển",
      questions: [
        {
          question: "Thời gian giao hàng là bao lâu?",
          answer:
            "Đối với đơn hàng trong nội thành: 1-2 ngày làm việc. Đối với đơn hàng tỉnh thành khác: 3-5 ngày làm việc. Đơn hàng sẽ được giao trong giờ hành chính (8:00 - 17:00).",
        },
        {
          question: "Phí vận chuyển như thế nào?",
          answer:
            "Miễn phí vận chuyển cho đơn hàng từ 500.000đ trở lên. Đơn hàng dưới 500.000đ sẽ tính phí vận chuyển 30.000đ (nội thành) và 50.000đ (tỉnh thành khác).",
        },
        {
          question: "Tôi có thể theo dõi đơn hàng không?",
          answer:
            "Có, bạn sẽ nhận được mã vận đơn qua email và có thể theo dõi trạng thái đơn hàng trên website hoặc liên hệ hotline để được cập nhật thông tin mới nhất.",
        },
      ],
    },
    {
      category: "Đổi trả & Bảo hành",
      questions: [
        {
          question: "Chính sách đổi trả như thế nào?",
          answer:
            "Chúng tôi chấp nhận đổi trả trong vòng 7 ngày kể từ khi nhận hàng với điều kiện sản phẩm còn nguyên vẹn, chưa sử dụng và có hóa đơn mua hàng. Khách hàng chịu phí vận chuyển đổi trả.",
        },
        {
          question: "Sản phẩm có bảo hành không?",
          answer:
            "Tất cả sản phẩm đều có bảo hành 30 ngày đối với lỗi từ nhà sản xuất. Chúng tôi sẽ đổi mới hoặc hoàn tiền 100% nếu sản phẩm có lỗi kỹ thuật.",
        },
        {
          question: "Làm thế nào để yêu cầu đổi trả?",
          answer:
            "Bạn có thể liên hệ hotline hoặc gửi email với thông tin đơn hàng và lý do đổi trả. Chúng tôi sẽ hướng dẫn bạn quy trình đổi trả chi tiết.",
        },
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
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-accent-foreground mb-4">
              Câu Hỏi Thường Gặp
            </h1>
            <p className="text-lg text-accent-foreground/80 max-w-2xl mx-auto">
              Tìm câu trả lời cho những thắc mắc của bạn về sản phẩm, đặt hàng
              và dịch vụ của Memew
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {categoryIndex + 1}
                    </span>
                  </div>
                  {category.category}
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border border-border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            ))}
          </div>

          {/* Contact Support Section */}
          <Card className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Vẫn chưa tìm thấy câu trả lời?
              </h2>
              <p className="text-muted-foreground mb-6">
                Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Phone Support */}
                <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Hotline</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    1900 1234 567
                  </p>
                  <p className="text-xs text-muted-foreground">
                    8:00 - 22:00 hàng ngày
                  </p>
                </div>

                {/* Email Support */}
                <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    support@memew.com
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Phản hồi trong 24h
                  </p>
                </div>

                {/* Live Chat */}
                <div className="flex flex-col items-center p-4 bg-background rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                    <MessageCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Trò chuyện trực tiếp
                  </p>
                  <p className="text-xs text-muted-foreground">8:00 - 18:00</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-amber-800">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">
                    Thời gian phản hồi nhanh nhất:
                  </span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  Live Chat: Ngay lập tức | Hotline: Trong 5 phút | Email: Trong
                  2 giờ
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
