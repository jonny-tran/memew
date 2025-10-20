# 🐱 Memew - Nền tảng thương mại điện tử meme mèo

Memew là một nền tảng thương mại điện tử chuyên về các sản phẩm meme mèo, được xây dựng với kiến trúc monorepo hiện đại sử dụng Turborepo. Dự án bao gồm ứng dụng web cho khách hàng và ứng dụng admin để quản lý cửa hàng.

## ✨ Giới thiệu

Memew được tạo ra bởi một nhóm bạn yêu mèo và nghiện meme, với mục tiêu đưa những chiếc meme mèo huyền thoại bước ra đời thật - thành áo, ly, móc khóa, sticker, ốp lưng và khiến chúng trở nên đình đám. Chúng tôi cam kết mang đến những sản phẩm chất lượng cao với giá cả hợp lý.

## 🏗️ Kiến trúc dự án

Dự án sử dụng kiến trúc monorepo với Turborepo, bao gồm:

### Ứng dụng (Apps)

- **`web`**: Ứng dụng Next.js cho khách hàng
  - Trang chủ với sản phẩm nổi bật
  - Danh mục sản phẩm và tìm kiếm
  - Giỏ hàng và thanh toán
  - Quản lý đơn hàng và lịch sử mua hàng
  - Hệ thống yêu thích sản phẩm
  - Chat hỗ trợ khách hàng
  - Trang thông tin và hỗ trợ

- **`admin`**: Ứng dụng React + Vite cho quản trị viên
  - Dashboard với thống kê và biểu đồ
  - Quản lý sản phẩm và danh mục
  - Quản lý đơn hàng và khách hàng
  - Cài đặt cửa hàng và tài khoản
  - Hệ thống thông báo

### Gói dùng chung (Packages)

- **`@repo/types`**: Định nghĩa TypeScript cho toàn bộ dự án
- **`@repo/eslint-config`**: Cấu hình ESLint
- **`@repo/typescript-config`**: Cấu hình TypeScript
- **`@repo/assets`**: Tài nguyên dùng chung (logo, hình ảnh)

## 🚀 Công nghệ sử dụng

### Frontend

- **Next.js 15** với Turbopack cho ứng dụng web
- **React 19** với Vite cho ứng dụng admin
- **TypeScript** cho type safety
- **Tailwind CSS** cho styling
- **Radix UI** cho components
- **React Hook Form** + **Zod** cho form validation
- **Zustand** cho state management

### Development Tools

- **Turborepo** cho monorepo management
- **ESLint** + **Prettier** cho code quality
- **Lucide React** cho icons

## 📦 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 18
- npm >= 11.6.0

### Cài đặt dependencies

```bash
# Cài đặt dependencies cho toàn bộ dự án
npm install
```

### Chạy development

```bash
# Chạy tất cả ứng dụng
npm run dev

# Hoặc sử dụng turbo trực tiếp
npx turbo dev
```

### Chạy ứng dụng cụ thể

```bash
# Chạy ứng dụng web (khách hàng)
npx turbo dev --filter=web

# Chạy ứng dụng admin
npx turbo dev --filter=admin
```

### Build dự án

```bash
# Build tất cả ứng dụng
npm run build

# Build ứng dụng cụ thể
npx turbo build --filter=web
npx turbo build --filter=admin
```

### Linting và Formatting

```bash
# Chạy linting
npm run lint

# Format code
npm run format

# Kiểm tra types
npm run check-types
```

## 📁 Cấu trúc thư mục

```
memew/
├── apps/
│   ├── web/                 # Ứng dụng Next.js cho khách hàng
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # React components
│   │   │   ├── hooks/       # Custom hooks
│   │   │   └── lib/         # Utilities
│   │   └── package.json
│   └── admin/               # Ứng dụng React + Vite cho admin
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── contexts/    # React contexts
│       │   ├── hooks/       # Custom hooks
│       │   ├── layouts/     # Layout components
│       │   ├── page/        # Pages
│       │   ├── routes/      # Routing
│       │   └── store/       # Zustand stores
│       └── package.json
├── packages/
│   ├── types/               # TypeScript type definitions
│   ├── eslint-config/       # ESLint configurations
│   ├── typescript-config/   # TypeScript configurations
│   └── assets/              # Shared assets
├── turbo.json               # Turborepo configuration
└── package.json             # Root package.json
```

## 🎯 Tính năng chính

### Cho khách hàng (Web App)

- 🛍️ **Mua sắm**: Duyệt và tìm kiếm sản phẩm meme mèo
- 🛒 **Giỏ hàng**: Thêm/xóa sản phẩm, tính toán tổng tiền
- 💳 **Thanh toán**: Tích hợp VNPay cho thanh toán online
- 📦 **Đơn hàng**: Theo dõi trạng thái đơn hàng
- ❤️ **Yêu thích**: Lưu sản phẩm yêu thích
- 💬 **Chat**: Hỗ trợ khách hàng trực tuyến
- 📱 **Responsive**: Tối ưu cho mọi thiết bị

### Cho quản trị viên (Admin App)

- 📊 **Dashboard**: Thống kê doanh thu, đơn hàng, sản phẩm
- 📦 **Quản lý sản phẩm**: CRUD sản phẩm, quản lý hình ảnh
- 📋 **Quản lý đơn hàng**: Xem và cập nhật trạng thái đơn hàng
- 👥 **Quản lý khách hàng**: Thông tin và lịch sử mua hàng
- ⚙️ **Cài đặt**: Cấu hình thông tin cửa hàng
- 🔔 **Thông báo**: Hệ thống thông báo real-time

## 🛠️ Scripts có sẵn

```bash
# Development
npm run dev              # Chạy tất cả ứng dụng
npm run dev --filter=web # Chạy chỉ ứng dụng web

# Build
npm run build            # Build tất cả ứng dụng
npm run build --filter=admin # Build chỉ ứng dụng admin

# Code Quality
npm run lint             # Chạy ESLint
npm run format           # Format code với Prettier
npm run check-types      # Kiểm tra TypeScript types
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm thông tin.

## 👨‍💻 Tác giả

**Jonny Tran**

- Email: jonnytran.working@gmail.com
- GitHub: [@jonny-tran](https://github.com/jonny-tran)
- Phone: 0869503259

## 🔗 Liên kết hữu ích

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
