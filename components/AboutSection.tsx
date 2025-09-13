import { Droplets, Building, Users, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
// import { motion } from 'framer-motion'

export default function AboutSection() {
  const features = [
    {
      icon: Droplets,
      title: 'Chuyên Môn Cao',
      description: 'Đội ngũ kỹ sư có kiến thức chuyên sâu và kinh nghiệm thực tế trong lĩnh vực xử lý nước'
    },
    {
      icon: Building,
      title: 'Công Nghệ Tiên Tiến',
      description: 'Áp dụng các giải pháp công nghệ hiện đại và thiết bị chất lượng cao'
    },
    {
      icon: Users,
      title: 'Đội Ngũ Nhiệt Tình',
      description: 'Nhân viên trẻ, năng động, có tinh thần học hỏi và phát triển không ngừng'
    },
    {
      icon: Award,
      title: 'Cam Kết Chất Lượng',
      description: 'Luôn đặt chất lượng và sự hài lòng của khách hàng lên hàng đầu'
    }
  ]

  return (
    <section className="py-16 bg-secondary-gray">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:min-h-[600px] items-start lg:items-center">
          <div 
            data-aos="fade-right"
            className="flex flex-col justify-center"
          >
            <h2 
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Về BK Green
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-lg leading-8 text-gray-600">
                <strong>CÔNG TY CỔ PHẦN KỸ THUẬT BK GREEN</strong> là một công ty trẻ, năng động chuyên về 
                xây dựng công trình cấp nước, thoát nước và xử lý nước thải. Chúng tôi được thành lập với 
                tầm nhìn trở thành đối tác tin cậy trong lĩnh vực kỹ thuật nước tại Việt Nam.
              </p>
              
              <p className="text-lg leading-8 text-gray-600">
                Với đội ngũ kỹ sư trẻ, nhiệt tình và có chuyên môn cao, chúng tôi mang đến những <strong>giá trị thực sự</strong> cho khách hàng thông qua việc áp dụng công nghệ hiện đại 
                và dịch vụ tận tâm. Từ hệ thống xử lý nước thải công nghiệp đến hệ thống cấp nước sinh hoạt, 
                chúng tôi cam kết chất lượng và hiệu quả tối ưu.
              </p>
              
              <p className="text-lg leading-8 text-gray-600">
                Với phương châm <strong>&ldquo;Tạo ra giá trị thực sự&rdquo;</strong>, BK Green luôn nỗ lực học hỏi, 
                phát triển và ứng dụng các giải pháp kỹ thuật tiên tiến, góp phần bảo vệ môi trường và 
                mang lại những giải pháp bền vững cho cộng đồng.
              </p>
            </div>
            <div className="mt-8">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/about-company.jpg"
                  alt="Công ty BK Green - Đội ngũ kỹ sư chuyên nghiệp"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover"
                  priority={true}
                  loading="eager"
                />
              </div>
            </div>
          </div>
          <div 
            data-aos="fade-left"
            className="flex flex-col justify-center lg:justify-start"
          >
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex flex-col">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary-blue">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <dt className="mt-4 text-lg font-semibold leading-7 text-gray-900">
                      {feature.title}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </dd>
                  </CardContent>
                </Card>
                </div>
              </div>
            ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
