# BK Green Website

Website chính thức của CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN - Chuyên về xây dựng công trình cấp, thoát nước và xử lý nước thải.

## Công Nghệ Sử Dụng

- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety và better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Reusable UI components
- **Lucide React** - Beautiful icons
- **Zustand** - State management
- **ESLint** - Code linting

## Cài Đặt

1. Cài đặt dependencies:
```bash
yarn install
```

2. Chạy development server:
```bash
yarn dev
```

3. Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt.

## Cấu Trúc Dự Án

```
├── app/                    # App Router pages
│   ├── gioi-thieu/        # Trang giới thiệu
│   ├── dich-vu/           # Trang dịch vụ
│   ├── san-pham/          # Trang sản phẩm
│   ├── du-an/             # Trang dự án
│   ├── lien-he/           # Trang liên hệ
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Footer
│   ├── HeroSection.tsx   # Hero section
│   ├── AboutSection.tsx  # About section
│   ├── ServicesSection.tsx # Services section
│   ├── ProjectsSection.tsx # Projects section
│   └── ContactSection.tsx # Contact section
├── lib/                  # Utilities
│   ├── utils.ts         # Utility functions
│   └── stores.ts        # Zustand stores
├── public/              # Static assets
└── types/               # TypeScript types
```

## Tính Năng

- ✅ Responsive design (mobile-first)
- ✅ SEO optimized với metadata
- ✅ Accessibility features
- ✅ Vietnamese language support
- ✅ Modern UI với Shadcn components
- ✅ Contact form với validation
- ✅ Project showcase
- ✅ Service catalog
- ✅ Product listing

## Màu Sắc

- **Primary Red**: #cc0000
- **Primary Blue**: #1844a7
- **Primary Green**: #007a3f
- **Secondary White**: #ffffff
- **Secondary Gray**: #f5f5f5

## Deployment

Website được tối ưu cho deployment trên Vercel:

1. Push code lên GitHub
2. Connect repository với Vercel
3. Deploy tự động

## Hình Ảnh Cần Thêm

Bạn cần thêm các hình ảnh sau vào thư mục `/public`:

- `logo.png` - Logo công ty (hexagon với drop và leaf)
- `hero-bg.jpg` - Background cho hero section
- `project1.jpg`, `project2.jpg`, `project3.jpg` - Hình ảnh dự án
- `service1.jpg` đến `service6.jpg` - Hình ảnh dịch vụ
- `product1.jpg` đến `product6.jpg` - Hình ảnh sản phẩm

## Liên Hệ

- **Điện thoại**: 0931252511
- **Email**: dien.tran@bkgreen.vn
- **Địa chỉ**: 65 Lê Trung Nghĩa, P. Bảy Hiền, TP. Hồ Chí Minh

---

© 2025 BK Green. All rights reserved.
