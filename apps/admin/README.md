# 🛠️ Memew Admin - Ứng dụng quản trị cho cửa hàng

Ứng dụng admin Memew được xây dựng với React + Vite, cung cấp giao diện quản trị toàn diện cho việc quản lý cửa hàng thương mại điện tử meme mèo. Đây là phần backend admin của nền tảng Memew.

## ✨ Tính năng chính

### 📊 Dashboard & Thống kê

- **Tổng quan**: Thống kê doanh thu, đơn hàng, sản phẩm
- **Biểu đồ tương tác**: Biểu đồ doanh thu theo thời gian
- **Metrics cards**: Hiển thị các chỉ số quan trọng
- **Real-time updates**: Cập nhật dữ liệu real-time

### 📦 Quản lý sản phẩm

- **Danh sách sản phẩm**: Xem tất cả sản phẩm với bảng dữ liệu
- **Thêm/Sửa sản phẩm**: Form quản lý thông tin sản phẩm
- **Upload hình ảnh**: Quản lý hình ảnh sản phẩm
- **Quản lý danh mục**: Phân loại sản phẩm theo loại
- **Trạng thái sản phẩm**: Bật/tắt, cập nhật trạng thái

### 📋 Quản lý đơn hàng

- **Danh sách đơn hàng**: Xem tất cả đơn hàng với bộ lọc
- **Chi tiết đơn hàng**: Xem thông tin chi tiết từng đơn hàng
- **Cập nhật trạng thái**: Thay đổi trạng thái đơn hàng
- **Quản lý vận chuyển**: Theo dõi và cập nhật thông tin giao hàng

### 👥 Quản lý khách hàng

- **Danh sách khách hàng**: Xem thông tin tất cả khách hàng
- **Lịch sử mua hàng**: Xem lịch sử đơn hàng của khách hàng
- **Thông tin liên hệ**: Quản lý thông tin liên hệ khách hàng

### ⚙️ Cài đặt hệ thống

- **Thông tin cửa hàng**: Cập nhật thông tin shop, logo, mô tả
- **Cài đặt tài khoản**: Quản lý thông tin admin
- **Nội dung website**: Quản lý nội dung trang chủ, về chúng tôi
- **Mạng xã hội**: Cấu hình liên kết social media
- **SEO settings**: Cài đặt meta title, description, keywords

### 🔔 Hệ thống thông báo

- **Thông báo real-time**: Nhận thông báo về đơn hàng mới
- **Lịch sử thông báo**: Xem lịch sử các thông báo
- **Cài đặt thông báo**: Tùy chỉnh loại thông báo nhận

## 🚀 Công nghệ sử dụng

- **React 19** với Hooks và Context API
- **Vite** cho build tool và dev server
- **TypeScript** cho type safety
- **Tailwind CSS** cho styling
- **Radix UI** cho UI components
- **React Router DOM** cho routing
- **Zustand** cho state management
- **React Hook Form** + **Zod** cho form validation
- **TanStack Table** cho data tables
- **Recharts** cho biểu đồ
- **Lucide React** cho icons

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js >= 18
- npm >= 11.6.0

### Cài đặt dependencies

```bash
# Từ thư mục gốc của dự án
npm install

# Hoặc chỉ cài đặt cho ứng dụng admin
cd apps/admin
npm install
```

### Chạy development

```bash
# Từ thư mục gốc
npm run dev --filter=admin

# Hoặc từ thư mục apps/admin
cd apps/admin
npm run dev
```

Ứng dụng sẽ chạy tại [http://localhost:5173](http://localhost:5173)

### Build production

```bash
# Từ thư mục gốc
npm run build --filter=admin

# Hoặc từ thư mục apps/admin
cd apps/admin
npm run build
```

### Preview production build

```bash
cd apps/admin
npm run preview
```

## 📁 Cấu trúc thư mục

```
apps/admin/
├── src/
│   ├── components/            # React components
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── admin-metrics.tsx
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── chart-area-interactive.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── nav-*.tsx      # Navigation components
│   │   │   ├── product-table.tsx
│   │   │   ├── section-cards.tsx
│   │   │   └── site-header.tsx
│   │   ├── icons/             # Icon components
│   │   ├── login/             # Login components
│   │   ├── products/          # Product management
│   │   │   ├── delete-confirmation-dialog.tsx
│   │   │   ├── form-dialog/   # Product form components
│   │   │   └── product-form-dialog.tsx
│   │   ├── ui/                # UI components (Radix UI)
│   │   └── theme-provider.tsx # Theme context
│   ├── contexts/              # React contexts
│   │   └── product-modal-context.tsx
│   ├── hooks/                 # Custom React hooks
│   │   └── use-mobile.ts
│   ├── layouts/               # Layout components
│   │   └── dashboard-layout.tsx
│   ├── lib/                   # Utilities và helpers
│   │   ├── format-currency.ts
│   │   └── utils.ts
│   ├── page/                  # Page components
│   │   ├── account/           # Account management
│   │   ├── chat/              # Chat management
│   │   ├── dashboard/         # Dashboard page
│   │   ├── help/              # Help page
│   │   ├── invoices/          # Invoice management
│   │   ├── login/             # Login page
│   │   ├── notifications/     # Notifications
│   │   ├── product-types/     # Product types
│   │   ├── products/          # Product management
│   │   └── settings/          # Settings
│   ├── routes/                # Routing configuration
│   │   └── index.tsx
│   ├── store/                 # Zustand stores
│   │   ├── accountStore.ts    # Account state
│   │   ├── chatStore.ts       # Chat state
│   │   ├── notificationStore.ts # Notifications state
│   │   ├── orderStore.ts      # Orders state
│   │   ├── productTypeStore.ts # Product types state
│   │   └── settingsStore.ts   # Settings state
│   ├── App.tsx                # Main App component
│   └── main.tsx               # Entry point
├── public/                    # Static assets
├── package.json
└── README.md
```

## 🎨 UI/UX Features

### Dashboard Design

- **Modern UI**: Giao diện hiện đại với dark/light theme
- **Responsive**: Tối ưu cho mọi kích thước màn hình
- **Sidebar Navigation**: Điều hướng dễ dàng với sidebar
- **Breadcrumb**: Hiển thị vị trí hiện tại trong hệ thống

### Data Visualization

- **Interactive Charts**: Biểu đồ tương tác với Recharts
- **Data Tables**: Bảng dữ liệu với sorting, filtering, pagination
- **Metrics Cards**: Hiển thị các chỉ số quan trọng
- **Real-time Updates**: Cập nhật dữ liệu real-time

### Form Management

- **Form Validation**: Validation với Zod schema
- **File Upload**: Upload hình ảnh sản phẩm
- **Modal Dialogs**: Form trong modal để UX tốt hơn
- **Auto-save**: Tự động lưu draft khi nhập liệu

## 🔧 Scripts có sẵn

```bash
# Development
npm run dev              # Chạy development server
npm run dev --host       # Chạy với network access

# Build
npm run build            # Build production
npm run build --watch    # Build với watch mode

# Preview
npm run preview          # Preview production build
npm run preview --host   # Preview với network access

# Code Quality
npm run lint             # Chạy ESLint
npm run lint:fix         # Tự động sửa lỗi ESLint
```

## 🌐 Environment Variables

Tạo file `.env` trong thư mục `apps/admin/`:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_APP_URL=http://localhost:5173

# Admin Configuration
VITE_ADMIN_EMAIL=admin@memew.test
VITE_SHOP_NAME=Memew Shop

# Chat Configuration
VITE_CHAT_API_URL=ws://localhost:8080

# File Upload
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

## 🗄️ State Management

Ứng dụng sử dụng Zustand cho state management với các store:

### Account Store

```typescript
interface AccountState {
  account: Account | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
```

### Product Store

```typescript
interface ProductState {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: CreateProduct) => Promise<void>;
  updateProduct: (id: string, product: UpdateProduct) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}
```

### Order Store

```typescript
interface OrderState {
  orders: Order[];
  loading: boolean;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
}
```

## 📊 Dashboard Components

### Metrics Cards

- **Total Revenue**: Tổng doanh thu
- **Total Orders**: Tổng số đơn hàng
- **Total Products**: Tổng số sản phẩm
- **Total Customers**: Tổng số khách hàng

### Charts

- **Revenue Chart**: Biểu đồ doanh thu theo thời gian
- **Order Status Chart**: Biểu đồ trạng thái đơn hàng
- **Product Sales Chart**: Biểu đồ bán hàng theo sản phẩm

### Data Tables

- **Products Table**: Bảng quản lý sản phẩm
- **Orders Table**: Bảng quản lý đơn hàng
- **Customers Table**: Bảng quản lý khách hàng

## 🔐 Authentication

```typescript
// Login flow
const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/admin/login", { email, password });
    const { token, account } = response.data;

    localStorage.setItem("admin_token", token);
    setAccount(account);
    setIsAuthenticated(true);
  } catch (error) {
    throw new Error("Login failed");
  }
};
```

## 🚀 Deployment

### Vercel

```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy production
vercel --prod
```

### Netlify

```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

### Docker

```bash
# Build Docker image
docker build -t memew-admin .

# Run container
docker run -p 5173:5173 memew-admin
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

## 📱 Mobile Support

- **Responsive Design**: Tối ưu cho tablet và mobile
- **Touch-friendly**: Giao diện thân thiện với touch
- **Mobile Navigation**: Sidebar collapse trên mobile

## 🔗 Liên kết hữu ích

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [TanStack Table](https://tanstack.com/table)
- [Recharts](https://recharts.org)
- [Radix UI](https://www.radix-ui.com)

## 👨‍💻 Tác giả

**Jonny Tran**

- Email: jonnytran.working@gmail.com
- GitHub: [@jonny-tran](https://github.com/jonny-tran)
- Phone: 0869503259
