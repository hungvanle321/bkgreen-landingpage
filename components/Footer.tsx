import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Mobile Logo Section */}
        <div className="flex flex-col items-center mb-8 lg:hidden">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg mb-4">
            <Image 
              src="/logo-transparent-square.svg" 
              alt="BK Green Logo" 
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>
          <h2 className="text-2xl font-bold text-white">BK GREEN</h2>
          <p className="text-sm text-gray-300 text-center mt-2">
            CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN
          </p>
          <p className="text-sm text-gray-300 text-center">
            GIẢI PHÁP NƯỚC TOÀN DIỆN
          </p>
        </div>

        {/* Mobile Contact Section - Full Width */}
        <div className="lg:hidden mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-center mb-4">Liên Hệ</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-5 w-5 text-primary-red" />
                <span className="text-lg text-white font-medium">0931252511</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-primary-red" />
                <span className="text-lg text-white font-medium">dien.tran@bkgreen.vn</span>
              </div>
              <div className="flex items-start justify-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-red mt-1" />
                <span className="text-sm text-gray-300 text-center">
                  517B Lê Trọng Tấn, Tây Thạnh, TP. HCM
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop Company Info */}
          <div className="space-y-4 hidden lg:block">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <Image 
                  src="/logo-transparent-square.svg" 
                  alt="BK Green Logo" 
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <span className="text-xl font-bold">BK GREEN</span>
            </div>
            <p className="text-sm text-gray-300">
              CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN
            </p>
            <p className="text-sm text-gray-300">
              GIẢI PHÁP NƯỚC TOÀN DIỆN
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link href="/dich-vu" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/du-an" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Dự Án
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dịch Vụ</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Xử lý nước thải</li>
              <li>Hệ thống RO</li>
              <li>Thiết bị PCCC</li>
              <li>Vận hành hệ thống</li>
            </ul>
          </div>

          {/* Desktop Contact Info */}
          <div className="space-y-4 hidden lg:block">
            <h3 className="text-lg font-semibold">Liên Hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-red" />
                <span className="text-sm text-gray-300">0931252511</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-red" />
                <span className="text-sm text-gray-300">dien.tran@bkgreen.vn</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary-red mt-0.5" />
                <span className="text-sm text-gray-300">
                  517B Lê Trọng Tấn, Tây Thạnh, TP. HCM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://fb.com/profile.php?id=61579638492742" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://linkedin.com/company/bk-green" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 BK Green. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
