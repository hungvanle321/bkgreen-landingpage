import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { InteractiveSection } from '@/components/InteractiveSection'
import { SimpleSection } from '@/components/SimpleSection'
import { SimpleFlipSection } from '@/components/SimpleFlipSection'
import { WobbleCard } from '@/components/ui/wobble-card'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { FocusCards } from '@/components/ui/focus-cards'
import { Globe, Leaf, Droplets, Target, Lightbulb, Award, Users, Building, CheckCircle, ArrowRight, Phone, Mail, MapPin, Clock, Shield, Zap, Settings, Star, TrendingUp, Heart, Eye, GraduationCap, Briefcase, Award as AwardIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Giới Thiệu - BK Green',
  description: 'Công ty Cổ phần Kỹ thuật BK Green - Giải pháp nước sạch mới, xây dựng công trình cấp thoát nước',
}

export default function AboutPage() {
  // Icon mapping function
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      'Award': Award,
      'Users': Users,
      'Building': Building,
      'Shield': Shield,
      'Zap': Zap,
      'Settings': Settings,
      'Star': Star,
      'TrendingUp': TrendingUp,
      'Heart': Heart,
      'Eye': Eye,
      'GraduationCap': GraduationCap,
      'Briefcase': Briefcase,
      'CheckCircle': CheckCircle,
      'Target': Target,
      'Lightbulb': Lightbulb,
      'Globe': Globe,
      'Leaf': Leaf,
      'Droplets': Droplets
    }
    return iconMap[iconName] || Star
  }
  const stats = [
    {
      icon: "Users",
      title: 'Đội ngũ chuyên gia',
      description: 'Với hơn 15 năm kinh nghiệm trong lĩnh vực kỹ thuật nước, đội ngũ kỹ sư của chúng tôi được đào tạo chuyên sâu và có chứng chỉ quốc tế. Chúng tôi cam kết mang đến những giải pháp tối ưu nhất cho mọi dự án.'
    },
    {
      icon: "Award",
      title: 'Cam kết chất lượng',
      description: 'Chúng tôi tuân thủ nghiêm ngặt các tiêu chuẩn quốc tế ISO 9001:2015 và áp dụng quy trình kiểm soát chất lượng 3 cấp độ. Mỗi sản phẩm và dịch vụ đều được kiểm tra kỹ lưỡng trước khi giao đến khách hàng.'
    },
    {
      icon: "Leaf",
      title: 'Tập trung bền vững',
      description: 'BK Green tiên phong trong việc phát triển các giải pháp xanh, thân thiện với môi trường. Chúng tôi sử dụng công nghệ tiết kiệm năng lượng và tái chế nước thải, góp phần bảo vệ môi trường bền vững cho tương lai.'
    }
  ]

  const coreValues = [
    {
      icon: "Target",
      title: 'Chất lượng',
      description: 'Đặt chất lượng lên hàng đầu trong mọi dự án'
    },
    {
      icon: "Lightbulb",
      title: 'Đổi mới',
      description: 'Áp dụng công nghệ hiện đại và sáng tạo'
    },
    {
      icon: "Droplets",
      title: 'Bền vững',
      description: 'Phát triển bền vững và bảo vệ môi trường'
    },
    {
      icon: "Users",
      title: 'Hỗ trợ khách hàng',
      description: 'Đồng hành cùng khách hàng trong suốt dự án'
    }
  ]

  const leadership = [
    {
      id: 'tran-dien',
      title: 'Ông Trần Bá Điền',
      subtitle: 'Giám đốc điều hành',
      description: 'Kỹ sư môi trường với hơn 15 năm kinh nghiệm trong lĩnh vực xử lý nước thải và quản lý dự án',
      image: '/director.jpg',
      icon: Users,
      details: {
        title: 'Kinh Nghiệm & Thành Tựu',
        content: [
          '15+ năm kinh nghiệm trong xử lý nước thải',
          'Quản lý hơn 50 dự án quy mô lớn',
          'Chứng chỉ PMP - Quản lý dự án chuyên nghiệp',
          'Thạc sĩ Kỹ thuật Môi trường',
          'Chuyên gia tư vấn cho nhiều doanh nghiệp lớn'
        ]
      }
    }
  ]


  const certifications = [
    {
      title: 'Chứng Nhận Chất Lượng',
      description: 'Tuân thủ các tiêu chuẩn quốc tế về chất lượng và an toàn',
      image: '/service-consulting.jpg'
    },
    {
      title: 'Bằng Cấp Kỹ Thuật',
      description: 'Đội ngũ kỹ sư được đào tạo chuyên sâu và có chứng chỉ hành nghề',
      image: '/service-operation.jpg'
    },
    {
      title: 'Giấy Phép Hoạt Động',
      description: 'Đầy đủ giấy phép kinh doanh và hoạt động trong lĩnh vực môi trường',
      image: '/service-equipment.jpg'
    }
  ]

  const facilities = [
    {
      title: 'Văn Phòng Chính',
      description: 'Trụ sở chính tại TP. Hồ Chí Minh với đầy đủ tiện nghi',
      image: '/about-company.jpg'
    },
    {
      title: 'Xưởng Sản Xuất',
      description: 'Xưởng sản xuất và lắp ráp thiết bị chuyên nghiệp',
      image: '/service-equipment.jpg'
    },
    {
      title: 'Phòng Thí Nghiệm',
      description: 'Phòng thí nghiệm kiểm tra chất lượng nước hiện đại',
      image: '/service-ro.jpg'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Company Overview */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">
            <div className="space-y-8">
              <div>
                <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
                  <Heart className="mr-2 h-3 w-3" />
                  Về Chúng Tôi
                </Badge>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  BK Green
                </h2>
              </div>
              <div className="space-y-6">
                <p className="text-lg leading-8 text-gray-600">
                  Công ty Cổ phần Kỹ thuật BK Green là một công ty mới được thành lập với mục tiêu mang đến 
                  giải pháp nước cấp và nước thải bền vững tại Việt Nam.
                </p>
                <p className="text-lg leading-8 text-gray-600">
                  Chúng tôi bắt đầu hành trình của mình với đội ngũ chuyên gia giàu kinh nghiệm và tầm nhìn dài hạn 
                  về một tương lai nơi nguồn nước được bảo vệ và quản lý một cách bền vững.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <WobbleCard>
                  <GlowingEffect color="rgba(0, 122, 63, 0.3)">
                    <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="p-6 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Tăng Trưởng</h3>
                        <p className="text-sm text-gray-600">Phát triển bền vững</p>
                      </CardContent>
                    </Card>
                  </GlowingEffect>
                </WobbleCard>
                <WobbleCard>
                  <GlowingEffect color="rgba(24, 68, 167, 0.3)">
                    <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100">
                      <CardContent className="p-6 text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-600">
                          <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Môi Trường</h3>
                        <p className="text-sm text-gray-600">Thân thiện sinh thái</p>
                      </CardContent>
                    </Card>
                  </GlowingEffect>
                </WobbleCard>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/about-company.jpg"
                  alt="Về công ty BK Green"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover"
                  priority={true}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-green-500 opacity-20"></div>
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-gradient-to-br from-green-500 to-blue-500 opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
              <Star className="mr-2 h-4 w-4" />
              Điểm Mạnh
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
              Tại Sao Chọn BK Green?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những lý do khiến chúng tôi trở thành đối tác đáng tin cậy trong lĩnh vực kỹ thuật nước
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => {
              const IconComponent = getIcon(stat.icon)
              const backgroundImages = [
                '/service-equipment.jpg',
                '/service-consulting.jpg', 
                '/service-ro.jpg',
                '/service-wastewater.jpg',
                '/service-electrical.jpg',
                '/service-operation.jpg'
              ]
              const bgImage = backgroundImages[index % backgroundImages.length]
              
              return (
                <div
                  key={index}
                  className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={bgImage}
                      alt={stat.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 group-hover:from-black/60 group-hover:via-black/50 group-hover:to-black/60 transition-all duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4 mt-1">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white leading-tight">
                        {stat.title}
                      </h3>
                    </div>
                    
                    <div className="flex-1 flex items-center">
                      <p className="text-white/90 leading-relaxed text-sm">
                        {stat.description}
                      </p>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"></div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#cc0000' }}>
              <Heart className="mr-2 h-3 w-3" />
              Cam Kết
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Cam Kết Của Chúng Tôi
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto">
              BK Green hướng tới bảo vệ nguồn nước và tối ưu hóa năng lượng thông qua các giải pháp hiện đại. 
              Chúng tôi cam kết phát triển bền vững ngay từ những bước đầu tiên.
            </p>
          </div>
          
          {/* Main commitment showcase - Based on BK Green Logo Meaning */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* BK - Kỹ thuật/Công nghệ - Đỏ */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-electrical.jpg"
                  alt="Kỹ Thuật & Công Nghệ"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Red Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-red-500/70 to-red-700/80 group-hover:from-red-600/70 group-hover:via-red-500/60 group-hover:to-red-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Settings className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Kỹ Thuật & Công Nghệ</h3>
                <p className="text-white/90 leading-relaxed">
                  Ứng dụng công nghệ tiên tiến và kỹ thuật chuyên sâu trong mọi dự án
                </p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Green - Môi Trường - Xanh */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-wastewater.jpg"
                  alt="Môi Trường Bền Vững"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Green Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-500/70 to-green-700/80 group-hover:from-green-600/70 group-hover:via-green-500/60 group-hover:to-green-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Môi Trường Bền Vững</h3>
                <p className="text-white/90 leading-relaxed">
                  Cam kết bảo vệ môi trường và phát triển bền vững cho tương lai xanh
                </p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Nước - Dương/Aqua */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-ro.jpg"
                  alt="Giải Pháp Nước"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Cyan/Blue Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/80 via-blue-500/70 to-blue-700/80 group-hover:from-cyan-600/70 group-hover:via-blue-500/60 group-hover:to-blue-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Droplets className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Giải Pháp Nước</h3>
                <p className="text-white/90 leading-relaxed">
                  Chuyên về xử lý nước cấp, nước thải và các giải pháp nước toàn diện
                </p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom highlight bar - Logo Meaning Summary */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-green-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
            <Card className="relative border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Kỹ Thuật & Công Nghệ</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Môi Trường Bền Vững</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Giải Pháp Nước Toàn Diện</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section with Simple Flip Cards */}
      <SimpleFlipSection
        title="Những Giá Trị Định Hướng"
        subtitle="Những nguyên tắc cốt lõi dẫn dắt mọi hoạt động và quyết định của chúng tôi"
        items={[
          {
            id: "quality",
            title: "Chất lượng",
            content: [
              "Đặt chất lượng lên hàng đầu",
              "Tuân thủ tiêu chuẩn quốc tế",
              "Kiểm soát chất lượng nghiêm ngặt"
            ]
          },
          {
            id: "innovation",
            title: "Đổi mới",
            content: [
              "Áp dụng công nghệ tiên tiến",
              "Nghiên cứu phát triển liên tục",
              "Sáng tạo trong giải pháp"
            ]
          },
          {
            id: "sustainability",
            title: "Bền vững",
            content: [
              "Bảo vệ môi trường",
              "Phát triển bền vững",
              "Sử dụng tài nguyên hiệu quả"
            ]
          },
          {
            id: "customer-support",
            title: "Hỗ trợ khách hàng",
            content: [
              "Đồng hành suốt dự án",
              "Dịch vụ chăm sóc tận tâm",
              "Hỗ trợ kỹ thuật 24/7"
            ]
          }
        ]}
        className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100"
      />


      {/* Partners & Technology with Flip Cards */}
      <InteractiveSection
        title="Định Hướng Phát Triển"
        subtitle="BK Green đang xây dựng nền tảng vững chắc để trở thành đối tác đáng tin cậy trong lĩnh vực kỹ thuật nước"
        badge={{
          text: "Tầm Nhìn",
          icon: "Globe"
        }}
        items={[
          {
            id: 'tech-foundation',
            title: 'Nền Tảng Công Nghệ',
            description: 'Xây dựng hệ thống công nghệ hiện đại và đáng tin cậy',
            image: '/service-electrical.jpg',
            icon: "Settings",
            details: {
              title: 'Công Nghệ & Thiết Bị',
              content: [
                'Đầu tư vào thiết bị xử lý nước chất lượng cao',
                'Hệ thống giám sát và vận hành hiện đại',
                'Quy trình kiểm soát chất lượng nghiêm ngặt',
                'Đào tạo đội ngũ kỹ thuật chuyên sâu',
                'Xây dựng hệ thống quản lý dự án hiệu quả'
              ]
            }
          },
          {
            id: 'partnership-building',
            title: 'Xây Dựng Đối Tác',
            description: 'Phát triển mạng lưới đối tác chiến lược và bền vững',
            image: '/service-operation.jpg',
            icon: "Users",
            details: {
              title: 'Mạng Lưới Đối Tác',
              content: [
                'Tìm kiếm nhà cung cấp thiết bị uy tín',
                'Xây dựng quan hệ với đối tác công nghệ',
                'Phát triển mạng lưới nhà thầu phụ',
                'Hợp tác với các viện nghiên cứu',
                'Mở rộng quan hệ đối tác trong tương lai'
              ]
            }
          },
          {
            id: 'innovation-focus',
            title: 'Tập Trung Đổi Mới',
            description: 'Đầu tư vào nghiên cứu và phát triển giải pháp bền vững',
            image: '/service-ro.jpg',
            icon: "Zap",
            details: {
              title: 'Nghiên Cứu & Phát Triển',
              content: [
                'Nghiên cứu công nghệ xử lý nước tiên tiến',
                'Phát triển giải pháp thân thiện môi trường',
                'Ứng dụng công nghệ số trong vận hành',
                'Đầu tư vào đào tạo và phát triển nhân lực',
                'Xây dựng thư viện kiến thức chuyên môn'
              ]
            }
          }
        ]}
        className="py-20 bg-white"
      />

      {/* Leadership Team */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Users className="mr-2 h-4 w-4" />
              Ban Lãnh Đạo
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Đội Ngũ Lãnh Đạo
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto">
              Đội ngũ chuyên gia giàu kinh nghiệm, dẫn dắt BK Green hướng tới tương lai bền vững
            </p>
          </div>
          <FocusCards className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member) => (
              <Card key={member.id} className="group h-full border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="text-sm font-medium">Chuyên gia hàng đầu</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {member.title}
                  </CardTitle>
                  <CardDescription className="text-base font-semibold text-blue-600">
                    {member.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  <div className="mt-4 flex justify-center">
                    <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </FocusCards>
        </div>
      </section>

      {/* Tầm Nhìn, Sứ Mệnh & Giá Trị */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
              <Heart className="mr-2 h-3 w-3" />
              Định Hướng
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Tầm Nhìn, Sứ Mệnh & Giá Trị
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto">
              Những nguyên tắc cốt lõi và định hướng phát triển của BK Green
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tầm Nhìn - Xanh lá */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/about-company.jpg"
                  alt="Tầm Nhìn"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Green Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-500/70 to-green-700/80 group-hover:from-green-600/70 group-hover:via-green-500/60 group-hover:to-green-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Tầm Nhìn</h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  Trở thành công ty dẫn đầu trong lĩnh vực kỹ thuật nước tại Việt Nam và khu vực Đông Nam Á, 
                  được công nhận về khả năng đổi mới công nghệ và cam kết bền vững môi trường.
                </p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Sứ Mệnh - Đỏ */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-consulting.jpg"
                  alt="Sứ Mệnh"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Red Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/80 via-red-500/70 to-red-700/80 group-hover:from-red-600/70 group-hover:via-red-500/60 group-hover:to-red-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Sứ Mệnh</h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  Cung cấp các giải pháp kỹ thuật nước toàn diện, từ thiết kế, thi công đến vận hành, 
                  đáp ứng mọi nhu cầu từ hộ gia đình đến các dự án công nghiệp quy mô lớn.
                </p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Giá Trị - Xanh dương */}
            <div className="group relative h-96 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src="/service-operation.jpg"
                  alt="Giá Trị"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                  className="object-cover"
                />
              </div>
              
              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-500/70 to-blue-700/80 group-hover:from-blue-600/70 group-hover:via-blue-500/60 group-hover:to-blue-700/70 transition-all duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-center text-white">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Giá Trị</h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  Chất lượng vượt trội, đổi mới sáng tạo, bền vững môi trường và hỗ trợ khách hàng tận tâm. 
                  Chúng tôi cam kết mang đến những giá trị thực sự cho cộng đồng và xã hội.
                </p>
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom highlight bar */}
          <div className="relative mt-12">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-red-600/10 to-blue-600/10 rounded-2xl blur-xl"></div>
            <Card className="relative border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Tầm Nhìn</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Sứ Mệnh</span>
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Giá Trị</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Shield className="mr-2 h-4 w-4" />
              Chứng Nhận
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Chứng Nhận & Bằng Cấp
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Đảm bảo chất lượng và tuân thủ các tiêu chuẩn quốc tế
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <Card key={cert.title} className="group h-full border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <CardTitle className="text-lg font-bold mb-2">
                      {cert.title}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      {cert.description}
                    </CardDescription>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" style={{ backgroundColor: '#007a3f' }}>
              <Building className="mr-2 h-3 w-3" />
              Cơ Sở Vật Chất
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Cơ Sở Vật Chất
            </h2>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ thống cơ sở vật chất hiện đại, đáp ứng mọi nhu cầu sản xuất và nghiên cứu
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {facilities.map((facility) => (
              <Card key={facility.title} className="group h-full border-0 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={facility.image}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
                  <div className="absolute top-4 right-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <CardTitle className="text-xl font-bold mb-2">
                      {facility.title}
                    </CardTitle>
                    <CardDescription className="text-white/90">
                      {facility.description}
                    </CardDescription>
                  </div>
                </div>
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
              Bắt Đầu Hành Trình Cùng BK Green
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất cho dự án của bạn
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <Link href="/lien-he" className="focus:outline-none focus:ring-0">
                  Liên Hệ Ngay
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/dich-vu" className="focus:outline-none focus:ring-0">
                  Xem Dịch Vụ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}