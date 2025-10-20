# Deploy Admin App lên Vercel

## ✅ Cấu hình đã hoàn thành

### Files cấu hình:
- `vercel.json` (root) - Cấu hình Vercel cho monorepo
- `.vercelignore` (root) - Loại trừ files không cần thiết
- `turbo.json` - Cấu hình Turborepo với outputs

### Cấu hình Vercel:
```json
{
  "buildCommand": "turbo run build --filter=admin",
  "outputDirectory": "apps/admin/dist",
  "installCommand": "npm install",
  "framework": "vite",
  "devCommand": "turbo run dev --filter=admin"
}
```

## 🚀 Cách deploy

### Bước 1: Tạo project mới trên Vercel
1. Vào [vercel.com](https://vercel.com)
2. Import project từ GitHub repository
3. **Root Directory**: Để trống (sử dụng root)

### Bước 2: Cấu hình Project Settings
- **Framework Preset**: Vite
- **Build Command**: `turbo run build --filter=admin`
- **Output Directory**: `apps/admin/dist`
- **Install Command**: `npm install`

### Bước 3: Deploy
- Nhấn **Deploy**
- Vercel sẽ build và deploy app admin thành công

## 🔧 Troubleshooting

### Nếu gặp lỗi "No Next.js version detected":
- Đảm bảo `framework: "vite"` trong `vercel.json`
- Xóa tất cả file `vercel.json` khác ngoài root

### Nếu gặp lỗi "Cannot read file tsconfig.json":
- Đảm bảo chạy từ root directory
- Sử dụng `turbo run build --filter=admin`

## 📊 Kết quả
- ✅ Build thành công với 0 lỗi TypeScript
- 📦 Bundle size: ~1.1MB
- 🎯 Output: `apps/admin/dist/`
- 🌐 URL riêng biệt với app web
