import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Droplets, Settings, Filter, Zap, Package, CheckCircle, ArrowRight, Clock, Shield, Award, Users, Phone, Mail, MapPin, Building, Wrench, Globe } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Dịch Vụ - BK Green',
  description: 'BK Green cung cấp giải pháp xử lý nước thải, nước cấp và hệ thống RO - Dịch vụ chuyên nghiệp',
}

export default function ServicesPage() {
  const services = [
    {
      icon: Droplets,
      title: 'Xử Lý Nước Thải',
      description: 'Cung cấp giải pháp và thi công cho tòa nhà, khu công nghiệp trong các dự án ban đầu.',
      features: [
        'Thiết kế hệ thống xử lý nước thải',
        'Thi công và lắp đặt chuyên nghiệp',
        'Vận hành và bảo trì hệ thống',
        'Tư vấn kỹ thuật chuyên sâu'
      ],
      image: '/service-wastewater.jpg'
    },
    {
      icon: Settings,
      title: 'Vận Hành Hệ Thống',
      description: 'Dịch vụ vận hành nước thải và nước cấp, đang phát triển.',
      features: [
        'Vận hành hệ thống liên tục',
        'Bảo trì định kỳ',
        'Giám sát từ xa',
        'Báo cáo chi tiết'
      ],
      image: '/service-operation.jpg'
    },
    {
      icon: Filter,
      title: 'Hệ Thống RO',
      description: 'Thi công hệ thống xử lý nước RO với công nghệ hiện đại.',
      features: [
        'Thiết kế hệ thống RO tối ưu',
        'Lắp đặt chuyên nghiệp',
        'Bảo trì và thay thế linh kiện',
        'Tối ưu hóa hiệu suất'
      ],
      image: '/service-ro.jpg'
    },
    {
      icon: Zap,
      title: 'Tủ Điện & SCADA',
      description: 'Cung cấp giải pháp tự động hóa cho các dự án mới.',
      features: [
        'Thiết kế tủ điện điều khiển',
        'Hệ thống SCADA hiện đại',
        'Tự động hóa quy trình',
        'Giám sát và điều khiển từ xa'
      ],
      image: '/service-electrical.jpg'
    },
    {
      icon: Package,
      title: 'Phân Phối Thiết Bị',
      description: 'Phân phối máy bơm, van, phụ kiện ngành nước và PCCC.',
      features: [
        'Máy bơm chuyên dụng',
        'Van và phụ kiện chất lượng',
        'Thiết bị PCCC hiện đại',
        'Tư vấn lựa chọn thiết bị'
      ],
      image: '/service-equipment.jpg'
    }
  ]

  const filters = {
    industry: ['Nhà ở', 'Công nghiệp'],
    type: ['Nước thải', 'Nước cấp']
  }

  const projectProcess = [
    {
      step: '01',
      title: 'Khảo Sát & Phân Tích',
      description: 'Đánh giá hiện trạng và phân tích nhu cầu cụ thể của dự án',
      image: '/process-survey.jpg'
    },
    {
      step: '02',
      title: 'Thiết Kế & Lập Kế Hoạch',
      description: 'Thiết kế chi tiết hệ thống và lập kế hoạch triển khai',
      image: '/process-design.jpg'
    },
    {
      step: '03',
      title: 'Thi Công & Lắp Đặt',
      description: 'Thi công chuyên nghiệp với đội ngũ kỹ thuật giàu kinh nghiệm',
      image: '/process-installation.jpg'
    },
    {
      step: '04',
      title: 'Vận Hành & Bảo Trì',
      description: 'Hỗ trợ vận hành và bảo trì định kỳ hệ thống',
      image: '/process-maintenance.jpg'
    }
  ]

  const technologies = [
    {
      title: 'Hệ Thống RO',
      description: 'Công nghệ lọc nước thẩm thấu ngược tiên tiến',
      image: '/service-ro.jpg',
      features: ['Tỷ lệ thu hồi cao', 'Tiết kiệm năng lượng', 'Chất lượng nước ổn định']
    },
    {
      title: 'SCADA & Tự Động Hóa',
      description: 'Hệ thống giám sát và điều khiển từ xa',
      image: '/service-electrical.jpg',
      features: ['Giám sát 24/7', 'Điều khiển tự động', 'Báo cáo chi tiết']
    },
    {
      title: 'Thiết Bị PCCC',
      description: 'Hệ thống phòng cháy chữa cháy chuyên nghiệp',
      image: '/service-equipment.jpg',
      features: ['Phát hiện sớm', 'Chữa cháy hiệu quả', 'Tuân thủ tiêu chuẩn']
    }
  ]

  const caseStudies = [
    {
      title: 'Dự Án Khu Công Nghiệp',
      industry: 'Công nghiệp',
      description: 'Hệ thống xử lý nước thải 2000m³/ngày cho khu công nghiệp',
      image: '/service-wastewater.jpg',
      results: ['Giảm 95% ô nhiễm', 'Tiết kiệm 30% chi phí', 'Vận hành ổn định']
    },
    {
      title: 'Nhà Máy Nước Sạch',
      industry: 'Nước cấp',
      description: 'Hệ thống RO công nghiệp cho nhà máy nước sạch',
      image: '/service-ro.jpg',
      results: ['Công suất 1000m³/h', 'Chất lượng nước cao', 'Bảo trì dễ dàng']
    },
    {
      title: 'Tòa Nhà Thương Mại',
      industry: 'Thương mại',
      description: 'Hệ thống PCCC và xử lý nước cho tòa nhà cao tầng',
      image: '/service-equipment.jpg',
      results: ['An toàn tuyệt đối', 'Tuân thủ quy định', 'Chi phí hợp lý']
    }
  ]

  const supportServices = [
    {
      icon: Clock,
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ kỹ thuật hỗ trợ 24/7 cho mọi vấn đề',
      image: '/service-operation.jpg'
    },
    {
      icon: Shield,
      title: 'Bảo Hành Dài Hạn',
      description: 'Bảo hành toàn diện cho tất cả thiết bị và hệ thống',
      image: '/service-consulting.jpg'
    },
    {
      icon: Users,
      title: 'Đào Tạo Vận Hành',
      description: 'Đào tạo nhân viên vận hành và bảo trì hệ thống',
      image: '/service-operation.jpg'
    }
  ]

  const faqItems = [
    {
      question: 'Thời gian thi công một dự án thường mất bao lâu?',
      answer: 'Thời gian thi công phụ thuộc vào quy mô dự án, thường từ 2-6 tháng cho các dự án vừa và nhỏ.'
    },
    {
      question: 'BK Green có hỗ trợ bảo trì sau khi hoàn thành dự án?',
      answer: 'Có, chúng tôi cung cấp dịch vụ bảo trì định kỳ và hỗ trợ kỹ thuật 24/7.'
    },
    {
      question: 'Chi phí dịch vụ được tính như thế nào?',
      answer: 'Chi phí được tính dựa trên quy mô dự án, công nghệ sử dụng và yêu cầu cụ thể của khách hàng.'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Dịch Vụ Của Chúng Tôi
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              BK Green cung cấp các giải pháp xử lý nước thải, nước cấp và hệ thống RO, 
              bắt đầu với các dự án nhỏ và đang mở rộng dịch vụ tại Việt Nam.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Danh Mục Dịch Vụ
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {services.map((service, index) => (
              <Card key={service.title} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="aspect-video lg:aspect-square relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#007a3f' }}>
                          <service.icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base mb-4">
                        {service.description}
                      </CardDescription>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4" style={{ color: '#007a3f' }} />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild variant="outline" className="w-full" style={{ borderColor: '#cc0000', color: '#cc0000' }}>
                      <Link href="/lien-he" className="flex items-center justify-center space-x-2 focus:outline-none focus:ring-0">
                        <span>Tìm Hiểu Thêm</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Thành Tựu Bền Vững */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hướng Tới Tương Lai Xanh
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Chúng tôi đang xây dựng các giải pháp tiết kiệm năng lượng trong các dự án đầu tiên, 
              hướng tới một tương lai bền vững cho nguồn nước Việt Nam.
            </p>
          </div>
        </div>
      </section>

      {/* Quy Trình Dự Án */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Quy Trình Dự Án
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Quy trình chuyên nghiệp từ khảo sát đến vận hành, đảm bảo chất lượng và hiệu quả
            </p>
          </div>
          <div className="space-y-16">
            {projectProcess.map((process, index) => (
              <div key={process.step} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={process.image}
                      alt={process.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      className="object-cover"
                    />
                    {/* Step Number */}
                    <div className="absolute top-6 left-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 backdrop-blur-sm shadow-lg">
                        <span className="text-2xl font-bold" style={{ color: '#cc0000' }}>{process.step}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-1 rounded-full" style={{ backgroundColor: '#007a3f' }}></div>
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Bước {process.step}</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 leading-tight">{process.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {process.description}
                    </p>
                    <div className="pt-4">
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200">
                        <span className="text-sm font-medium text-gray-700">Quy trình chuyên nghiệp</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Công Nghệ Sử Dụng */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Công Nghệ Sử Dụng
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Áp dụng công nghệ tiên tiến và thiết bị hiện đại cho mọi dự án
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <Card key={tech.title} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white overflow-hidden">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={tech.image}
                    alt={tech.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">{tech.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tech.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tech.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" style={{ color: '#007a3f' }} />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Case Studies
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Các dự án tiêu biểu và kết quả đạt được
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.title} className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-900">
                      {study.industry}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl" style={{ color: '#1844a7' }}>
                    {study.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {study.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Kết quả đạt được:</h4>
                    <ul className="space-y-2">
                      {study.results.map((result, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4" style={{ color: '#007a3f' }} />
                          <span className="text-sm text-gray-600">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bảo Hành & Hỗ Trợ */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Bảo Hành & Hỗ Trợ
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Cam kết hỗ trợ toàn diện cho khách hàng
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {supportServices.map((service) => (
              <Card key={service.title} className="h-full text-center hover:shadow-lg transition-shadow border-0 bg-white overflow-hidden">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 mb-4 mx-auto">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl" style={{ color: '#1844a7' }}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Dịch Vụ */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Giải đáp các thắc mắc phổ biến về dịch vụ của chúng tôi
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg" style={{ color: '#1844a7' }}>
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {item.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Cần Tư Vấn Dịch Vụ?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href="/lien-he" className="focus:outline-none focus:ring-0">Liên Hệ Ngay</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/du-an" className="focus:outline-none focus:ring-0">Xem Dự Án</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}