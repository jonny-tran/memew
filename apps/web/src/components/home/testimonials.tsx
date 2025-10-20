"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

// Dữ liệu testimonials cho dự án memew mèo
const testimonials = [
  {
    id: 1,
    name: "Nguyễn Thị Lan",
    company: "Cửa Hàng Thời Trang Cute",
    avatar: null, // Không có avatar, sẽ hiển thị chữ cái đầu
    rating: 5,
    quote:
      "Sản phẩm mèo memew của các bạn thật sự đáng yêu! Khách hàng của tôi rất thích những chiếc áo thun và sticker mèo. Chất lượng in ấn rất tốt và thiết kế độc đáo.",
  },
  {
    id: 2,
    name: "Trần Minh Tuấn",
    company: "Quán Cà Phê Mèo",
    avatar: null, // Không có avatar, sẽ hiển thị chữ cái đầu
    rating: 5,
    quote:
      "Ly cốc mèo memew đã trở thành sản phẩm bán chạy nhất tại quán của tôi! Khách hàng thích thú với thiết kế cute và chất lượng sứ tốt. Sẽ đặt hàng thêm nhiều mẫu khác.",
  },
  {
    id: 3,
    name: "Lê Thị Hương",
    company: "Shop Online Phụ Kiện",
    avatar: null, // Không có avatar, sẽ hiển thị chữ cái đầu
    rating: 5,
    quote:
      "Móc khóa mèo memew 3D của các bạn thật sự xuất sắc! Chất liệu cao cấp, thiết kế tinh xảo. Khách hàng feedback rất tích cực và tôi đã bán hết hàng chỉ trong 1 tuần.",
  },
  {
    id: 4,
    name: "Phạm Văn Đức",
    company: "Cửa Hàng Điện Thoại",
    avatar: null, // Không có avatar, sẽ hiển thị chữ cái đầu
    rating: 5,
    quote:
      "Ốp lưng mèo memew rất được khách hàng trẻ yêu thích! Thiết kế độc đáo, chất lượng bảo vệ tốt. Đây là sản phẩm bán chạy nhất trong cửa hàng của tôi.",
  },
  {
    id: 5,
    name: "Hoàng Thị Mai",
    company: "Studio Nghệ Thuật",
    avatar: null, // Không có avatar, sẽ hiển thị chữ cái đầu
    rating: 5,
    quote:
      "Bộ sticker mèo memew với nhiều biểu cảm khác nhau thật sự tuyệt vời! Học sinh của tôi rất thích sử dụng để trang trí vở, laptop. Chất lượng in sắc nét và bền màu.",
  },
];

// Function để tạo avatar với chữ cái đầu
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Function để tạo màu background cho avatar
const getAvatarColor = (name: string): string => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];

  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export default function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Khám phá những trải nghiệm tuyệt vời của khách hàng với sản phẩm mèo
            memew chất lượng cao và dịch vụ tận tâm
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-muted-foreground/20">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    {testimonial.avatar ? (
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getAvatarColor(
                          testimonial.name
                        )}`}
                      >
                        {getInitials(testimonial.name)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
