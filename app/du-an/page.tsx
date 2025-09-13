import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card'
import { Button } from 'components/ui/button'
import { MapPin, Calendar, Droplets, Building, Filter, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Dự Án - BK Green',
  description: 'BK Green đang triển khai các dự án đầu tiên, mang đến giải pháp nước sạch cho cộng đồng',
}

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Nhà Máy Nước Tóc Tiên - BRVT',
      location: 'Bà Rịa - Vũng Tàu',
      type: 'Nước cấp',
      status: 'Thử nghiệm',
      description: 'Dự án thử nghiệm hệ thống xử lý nước sạch cho khu vực Tóc Tiên, đang trong giai đoạn hoàn thiện.',
      image: '/service-wastewater.jpg',
      year: '2025',
      capacity: '500 m³/ngày'
    },
    {
      title: 'Nhà Máy Nước Hồ Đá Đen BRVT 2',
      location: 'Bà Rịa - Vũng Tàu',
      type: 'Nước cấp',
      status: 'Đang phát triển',
      description: 'Dự án nâng cấp hệ thống xử lý nước tại Hồ Đá Đen, mở rộng công suất và cải thiện chất lượng.',
      image: '/service-ro.jpg',
      year: '2025',
      capacity: '1000 m³/ngày'
    },
    {
      title: 'Nha May Nuoc Dankia 2',
      location: 'Lâm Đồng',
      type: 'Nước cấp',
      status: 'Tiềm năng',
      description: 'Dự án tiềm năng xây dựng nhà máy nước tại khu vực Dankia, đang trong giai đoạn khảo sát.',
      image: '/service-equipment.jpg',
      year: '2025',
      capacity: '800 m³/ngày'
    },
    {
      title: 'Hệ Thống Xử Lý Nước Thải KCN',
      location: 'TP. Hồ Chí Minh',
      type: 'Nước thải',
      status: 'Thiết kế',
      description: 'Thiết kế hệ thống xử lý nước thải cho khu công nghiệp, tập trung vào công nghệ xanh.',
      image: '/service-wastewater.jpg',
      year: '2025',
      capacity: '2000 m³/ngày'
    },
    {
      title: 'Nâng Cấp Hệ Thống RO Công Nghiệp',
      location: 'Đồng Nai',
      type: 'Nước cấp',
      status: 'Lập kế hoạch',
      description: 'Dự án nâng cấp hệ thống lọc nước RO cho nhà máy công nghiệp, tăng hiệu suất xử lý.',
      image: '/service-ro.jpg',
      year: '2025',
      capacity: '1500 m³/ngày'
    },
    {
      title: 'Hệ Thống PCCC Thông Minh',
      location: 'Bình Dương',
      type: 'PCCC',
      status: 'Nghiên cứu',
      description: 'Nghiên cứu và phát triển hệ thống phòng cháy chữa cháy thông minh, tích hợp công nghệ IoT.',
      image: '/service-equipment.jpg',
      year: '2025',
      capacity: 'Toàn diện'
    }
  ]

  const projectStats = [
    { label: 'Dự án đang triển khai', value: '3' },
    { label: 'Dự án hoàn thành', value: '0' },
    { label: 'Công suất thiết kế', value: '5.8K m³/ngày' },
    { label: 'Dịch vụ chuyên nghiệp', value: '24/7' }
  ]

  const filters = {
    industry: ['Nước cấp', 'Nước thải', 'PCCC'],
    region: ['BRVT', 'HCM', 'Lâm Đồng', 'Đồng Nai', 'Bình Dương'],
    status: ['Thử nghiệm', 'Đang phát triển', 'Tiềm năng', 'Thiết kế', 'Lập kế hoạch', 'Nghiên cứu']
  }

  const featuredProjects = projects.slice(0, 2)

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Lĩnh Vực Hoạt Động
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              BK Green đang triển khai các dự án đầu tiên, mang đến giải pháp nước sạch cho cộng đồng.
            </p>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {projectStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold" style={{ color: '#1844a7' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Dự Án Nổi Bật
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card key={project.title} className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-cover"
                    priority={true}
                    loading="eager"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-900">
                      {project.status}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: '#007a3f' }}>
                      {project.type}
                    </span>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Droplets className="h-4 w-4" />
                      <span>{project.capacity}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {project.description}
                  </CardDescription>
                  <Button asChild variant="outline" className="w-full" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                    <Link href="/lien-he" className="focus:outline-none focus:ring-0">Xem Chi Tiết</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Tất Cả Dự Án
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-900">
                      {project.status}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: '#007a3f' }}>
                      {project.type}
                    </span>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Droplets className="h-4 w-4" />
                      <span>{project.capacity}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm mb-4">
                    {project.description}
                  </CardDescription>
                  <Button asChild variant="outline" size="sm" className="w-full" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                    <Link href="/lien-he" className="focus:outline-none focus:ring-0">Chi Tiết</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Gửi Dự Án Của Bạn
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Có dự án cần tư vấn? Hãy liên hệ với chúng tôi để được hỗ trợ chuyên nghiệp
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href="/lien-he" className="focus:outline-none focus:ring-0">Liên Hệ Ngay</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/dich-vu" className="focus:outline-none focus:ring-0">Xem Dịch Vụ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}