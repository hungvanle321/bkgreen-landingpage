import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Droplets, Settings, Shield, Package, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Sản Phẩm - BK Green',
  description: 'BK Green cung cấp máy bơm, van, phụ kiện chất lượng cao cho hệ thống xử lý nước',
}

export default function ProductsPage() {
  const productCategories = [
    {
      id: 'pumps',
      title: 'Máy Bơm',
      icon: Droplets,
      description: 'Máy bơm chuyên dụng cho hệ thống xử lý nước',
      image: '/equipment-pump.jpg',
      products: [
        {
          name: 'Bơm Công Nghiệp',
          specs: 'Lưu lượng: 50-500 m³/h',
          description: 'Máy bơm công nghiệp hiệu suất cao'
        },
        {
          name: 'Bơm Nước Thải',
          specs: 'Lưu lượng: 20-200 m³/h',
          description: 'Chuyên dụng cho xử lý nước thải'
        }
      ]
    },
    {
      id: 'valves',
      title: 'Van',
      icon: Settings,
      description: 'Van điều áp và chống rò rỉ chất lượng cao',
      image: '/equipment-valve.jpg',
      products: [
        {
          name: 'Van Điều Áp',
          specs: 'Áp suất: 0-16 bar',
          description: 'Điều chỉnh áp suất chính xác'
        },
        {
          name: 'Van Chống Rò Rỉ',
          specs: 'Áp suất: 0-25 bar',
          description: 'Ngăn ngừa rò rỉ hiệu quả'
        }
      ]
    },
    {
      id: 'fire-safety',
      title: 'Phụ Kiện PCCC',
      icon: Shield,
      description: 'Thiết bị phòng cháy chữa cháy chuyên nghiệp',
      image: '/equipment-fire.jpg',
      products: [
        {
          name: 'Vòi Phun Nước',
          specs: 'Đường kính: 50-200mm',
          description: 'Vòi phun chữa cháy chuyên dụng'
        },
        {
          name: 'Hệ Thống Báo Cháy',
          specs: 'Phạm vi: 1000m²',
          description: 'Hệ thống báo cháy tự động'
        }
      ]
    }
  ]

  const featuredProducts = [
    {
      name: 'Bơm Công Nghiệp BK-P100',
      category: 'Máy Bơm',
      image: '/equipment-pump.jpg',
      specs: 'Lưu lượng: 100 m³/h | Áp suất: 50m',
      description: 'Máy bơm công nghiệp hiệu suất cao, tiết kiệm năng lượng'
    },
    {
      name: 'Van Điều Áp BK-V50',
      category: 'Van',
      image: '/equipment-valve.jpg',
      specs: 'Áp suất: 0-16 bar | Nhiệt độ: -10°C đến 80°C',
      description: 'Van điều áp chính xác, độ bền cao'
    },
    {
      name: 'Hệ Thống RO BK-RO2000',
      category: 'Hệ Thống RO',
      image: '/equipment-ro.jpg',
      specs: 'Công suất: 2000L/h | Tỷ lệ thu hồi: 75%',
      description: 'Hệ thống lọc nước RO công nghiệp'
    }
  ]

  const filters = {
    type: ['Máy Bơm', 'Van', 'Phụ Kiện PCCC', 'Hệ Thống RO'],
    application: ['Công nghiệp', 'Dân dụng', 'Thương mại']
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Sản Phẩm Của Chúng Tôi
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              BK Green cung cấp các sản phẩm chất lượng cao, tập trung vào máy bơm, van và phụ kiện, 
              bắt đầu từ các đối tác đáng tin cậy.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Sản Phẩm Nổi Bật
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <Card key={product.name} className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover"
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: '#007a3f' }}>
                      {product.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="text-sm font-mono">
                    {product.specs}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <Button asChild variant="outline" className="w-full" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                    <Link href="/lien-he" className="focus:outline-none focus:ring-0">Chi Tiết</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Danh Mục Sản Phẩm
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {productCategories.map((category) => (
              <Card key={category.id} className="h-full">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#1844a7' }}>
                      <category.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.products.map((product, index) => (
                      <div key={index} className="border-l-2 pl-3" style={{ borderColor: '#cc0000' }}>
                        <h4 className="font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">{product.specs}</p>
                        <p className="text-xs text-gray-500">{product.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="outline" className="w-full mt-4" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                    <Link href="/lien-he" className="focus:outline-none focus:ring-0">Tìm Hiểu Thêm</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bộ Lọc & Tìm Kiếm</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Loại Sản Phẩm</h4>
                    <div className="space-y-2">
                      {filters.type.map((item) => (
                        <label key={item} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2 text-sm text-gray-600">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Ứng Dụng</h4>
                    <div className="space-y-2">
                      {filters.application.map((item) => (
                        <label key={item} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="ml-2 text-sm text-gray-600">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Lọc</span>
                </Button>
              </div>
              <p className="text-gray-600">
                Sử dụng bộ lọc bên trái và thanh tìm kiếm để tìm sản phẩm phù hợp với nhu cầu của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Giải Pháp Liên Quan
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Khám phá các dịch vụ và dự án liên quan đến sản phẩm của chúng tôi
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href="/dich-vu" className="focus:outline-none focus:ring-0">Xem Dịch Vụ</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/du-an" className="focus:outline-none focus:ring-0">Xem Dự Án</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tìm Đại Lý
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Liên hệ với chúng tôi để tìm đại lý gần nhất và nhận tư vấn sản phẩm
            </p>
            <div className="mt-10">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href="/lien-he" className="focus:outline-none focus:ring-0">Liên Hệ Ngay</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}