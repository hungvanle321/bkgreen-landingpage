import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function EquipmentSection() {
  const equipment = [
    {
      title: 'Máy Bơm Công Nghiệp',
      description: 'Các loại máy bơm chuyên dụng cho hệ thống xử lý nước',
      image: '/equipment-pump.jpg',
      category: 'Thiết bị chính'
    },
    {
      title: 'Van Công Nghiệp',
      description: 'Van điều khiển, van an toàn cho hệ thống nước',
      image: '/equipment-valve.jpg',
      category: 'Phụ kiện'
    },
    {
      title: 'Thiết Bị PCCC',
      description: 'Hệ thống phòng cháy chữa cháy chuyên nghiệp',
      image: '/equipment-fire.jpg',
      category: 'An toàn'
    },
    {
      title: 'Hệ Thống RO',
      description: 'Thiết bị lọc nước RO công nghiệp',
      image: '/equipment-ro.jpg',
      category: 'Xử lý nước'
    }
  ]

  return (
    <section className="py-16 bg-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-primary-red/5"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            data-aos="fade-up"
          >
            Thiết Bị & Sản Phẩm
          </h2>
          <p 
            className="mt-6 text-lg leading-8 text-gray-600"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Chúng tôi cung cấp đầy đủ các thiết bị và sản phẩm chất lượng cao cho hệ thống xử lý nước
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {equipment.map((item, index) => (
            <div 
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden relative">
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover object-center"
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="text-xs font-semibold text-white uppercase tracking-wide mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
