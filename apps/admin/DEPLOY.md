# Deploy Admin App lên Vercel

## Cấu hình hiện tại

- **Framework**: Vite + React
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Cách deploy

### 1. Tạo project mới trên Vercel

1. Vào [vercel.com](https://vercel.com)
2. Import project từ GitHub repository
3. Chọn **Root Directory**: `apps/admin`

### 2. Cấu hình Project Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Environment Variables (nếu cần)

Thêm các biến môi trường cần thiết trong Vercel dashboard.

### 4. Deploy

Nhấn **Deploy** và chờ quá trình build hoàn tất.

## Files cấu hình

- `vercel.json`: Cấu hình Vercel
- `.vercelignore`: Loại trừ files không cần thiết
- `package.json`: Scripts và dependencies

## Lưu ý

- App admin sẽ có URL riêng biệt với app web
- Đảm bảo backend có thể truy cập URL admin để xem giao diện
- Build size hiện tại ~1.1MB (có thể tối ưu bằng code splitting)
