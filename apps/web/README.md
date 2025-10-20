# 🐱 Memew Web - Ứng dụng thương mại điện tử cho khách hàng

Ứng dụng web Memew được xây dựng với Next.js 15, cung cấp trải nghiệm mua sắm trực tuyến cho các sản phẩm meme mèo. Đây là phần frontend dành cho khách hàng của nền tảng thương mại điện tử Memew.

## ✨ Tính năng chính

### 🛍️ Mua sắm và sản phẩm

- **Trang chủ**: Hiển thị sản phẩm nổi bật và banner quảng cáo
- **Danh mục sản phẩm**: Duyệt sản phẩm theo loại và bộ lọc
- **Tìm kiếm**: Tìm kiếm sản phẩm theo tên và mô tả
- **Chi tiết sản phẩm**: Xem thông tin chi tiết, hình ảnh và đánh giá

### 🛒 Giỏ hàng và thanh toán

- **Giỏ hàng**: Thêm/xóa sản phẩm, cập nhật số lượng
- **Tính toán**: Tự động tính tổng tiền và phí vận chuyển
- **Thanh toán**: Tích hợp VNPay cho thanh toán online
- **Xác nhận đơn hàng**: Trang xác nhận và theo dõi đơn hàng

### 👤 Quản lý tài khoản

- **Đăng ký/Đăng nhập**: Hệ thống xác thực người dùng
- **Hồ sơ cá nhân**: Quản lý thông tin tài khoản
- **Lịch sử đơn hàng**: Xem và theo dõi trạng thái đơn hàng
- **Danh sách yêu thích**: Lưu sản phẩm yêu thích

### 💬 Hỗ trợ khách hàng

- **Chat widget**: Hỗ trợ trực tuyến real-time
- **FAQ**: Câu hỏi thường gặp
- **Liên hệ**: Thông tin liên hệ và hỗ trợ
- **Chính sách**: Chính sách bảo mật, hoàn trả, v.v.

## 🚀 Công nghệ sử dụng

- **Next.js 15** với App Router và Turbopack
- **React 19** với Server Components
- **TypeScript** cho type safety
- **Tailwind CSS** cho styling
- **Radix UI** cho UI components
- **React Hook Form** + **Zod** cho form validation
- **Lucide React** cho icons
- **Next Themes** cho dark/light mode

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js >= 18
- npm >= 11.6.0

### Cài đặt dependencies

```bash
# Từ thư mục gốc của dự án
npm install

# Hoặc chỉ cài đặt cho ứng dụng web
cd apps/web
npm install
```

### Chạy development

```bash
# Từ thư mục gốc
npm run dev --filter=web

# Hoặc từ thư mục apps/web
cd apps/web
npm run dev
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)

### Build production

```bash
# Từ thư mục gốc
npm run build --filter=web

# Hoặc từ thư mục apps/web
cd apps/web
npm run build
```

### Preview production build

```bash
cd apps/web
npm run start
```

## 📁 Cấu trúc thư mục

```
apps/web/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── about/             # Trang giới thiệu
│   │   ├── cart/              # Trang giỏ hàng
│   │   ├── checkout/          # Trang thanh toán
│   │   ├── faqs/              # Câu hỏi thường gặp
│   │   ├── login/             # Đăng nhập
│   │   ├── order-detail/      # Chi tiết đơn hàng
│   │   ├── orders-history/    # Lịch sử đơn hàng
│   │   ├── products/          # Sản phẩm
│   │   ├── profile/           # Hồ sơ cá nhân
│   │   ├── search/            # Tìm kiếm
│   │   ├── signup/            # Đăng ký
│   │   ├── support/           # Hỗ trợ
│   │   └── wishlist/          # Danh sách yêu thích
│   ├── components/            # React components
│   │   ├── auth/              # Components xác thực
│   │   ├── cart/              # Components giỏ hàng
│   │   ├── checkout/          # Components thanh toán
│   │   ├── home/              # Components trang chủ
│   │   ├── layout/            # Components layout
│   │   ├── product-detail/    # Components chi tiết sản phẩm
│   │   ├── search/            # Components tìm kiếm
│   │   ├── ui/                # UI components (Radix UI)
│   │   └── wishlist/          # Components yêu thích
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities và helpers
│   └── utils/                 # Utility functions
├── public/                    # Static assets
├── package.json
└── README.md
```

## 🎨 UI/UX Features

### Responsive Design

- **Mobile-first**: Tối ưu cho thiết bị di động
- **Tablet**: Giao diện thích ứng cho tablet
- **Desktop**: Trải nghiệm đầy đủ trên desktop

### Dark/Light Mode

- **Theme toggle**: Chuyển đổi giữa chế độ sáng/tối
- **System preference**: Tự động theo cài đặt hệ thống
- **Persistent**: Lưu lựa chọn theme của người dùng

### Accessibility

- **Keyboard navigation**: Hỗ trợ điều hướng bằng bàn phím
- **Screen readers**: Tương thích với screen readers
- **ARIA labels**: Đầy đủ ARIA attributes
- **Color contrast**: Đảm bảo độ tương phản màu sắc

## 🔧 Scripts có sẵn

```bash
# Development
npm run dev              # Chạy development server với Turbopack
npm run dev --turbopack  # Chạy với Turbopack (mặc định)

# Build
npm run build            # Build production với Turbopack
npm run build --turbopack # Build với Turbopack (mặc định)

# Production
npm run start            # Chạy production server
npm run preview          # Preview production build

# Code Quality
npm run lint             # Chạy ESLint
npm run lint:fix         # Tự động sửa lỗi ESLint
```

## 🌐 Environment Variables

Tạo file `.env.local` trong thư mục `apps/web/`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# VNPay Configuration
NEXT_PUBLIC_VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNPAY_TMN_CODE=your_tmn_code
VNPAY_HASH_SECRET=your_hash_secret

# Chat Configuration
NEXT_PUBLIC_CHAT_API_URL=ws://localhost:8080
```

## 📱 PWA Support

Ứng dụng hỗ trợ Progressive Web App với:

- **Service Worker**: Cache tài nguyên offline
- **Web App Manifest**: Cài đặt như ứng dụng native
- **Offline support**: Hoạt động khi mất kết nối
- **Push notifications**: Thông báo đẩy

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Docker

```bash
# Build Docker image
docker build -t memew-web .

# Run container
docker run -p 3000:3000 memew-web
```

## 🧪 Testing

```bash
# Chạy tests (khi có)
npm run test

# Chạy tests với coverage
npm run test:coverage

# Chạy tests trong watch mode
npm run test:watch
```

## 📊 Performance

- **Core Web Vitals**: Tối ưu LCP, FID, CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Tự động chia nhỏ bundle
- **Lazy Loading**: Lazy load components và images
- **Caching**: Aggressive caching strategy

## 🔗 Liên kết hữu ích

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [Vercel Deployment](https://vercel.com/docs)

## 👨‍💻 Tác giả

**Jonny Tran**

- Email: jonnytran.working@gmail.com
- GitHub: [@jonny-tran](https://github.com/jonny-tran)
- Phone: 0869503259
