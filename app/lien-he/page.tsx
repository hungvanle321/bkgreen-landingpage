import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Building } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Liên Hệ - BK Green',
  description: 'Liên hệ với BK Green để được tư vấn và hỗ trợ tốt nhất về giải pháp nước sạch',
}

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Điện thoại',
      value: '0931252511',
      description: 'Liên hệ trực tiếp để được tư vấn'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'dien.tran@bkgreen.vn',
      description: 'Gửi email cho chúng tôi'
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      value: 'TP. Hồ Chí Minh',
      description: 'Văn phòng chính tại HCM'
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      value: '8:00 - 17:00',
      description: 'Thứ 2 - Thứ 6 hàng tuần'
    }
  ]

  const requestTypes = [
    'Tư vấn dự án',
    'Báo giá sản phẩm',
    'Hỗ trợ kỹ thuật',
    'Hợp tác kinh doanh',
    'Khác'
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => (
              <Card key={info.title} className="h-full text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: '#1844a7' }}>
                    <info.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg" style={{ color: '#1844a7' }}>
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold text-gray-900 mb-2">{info.value}</p>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Gửi Tin Nhắn
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Công ty
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full"
                    placeholder="Nhập tên công ty"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full"
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
                    Loại yêu cầu *
                  </label>
                  <select
                    id="requestType"
                    name="requestType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Chọn loại yêu cầu</option>
                    {requestTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tin nhắn *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full"
                    placeholder="Nhập nội dung tin nhắn..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full flex items-center justify-center space-x-2"
                  style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}
                >
                  <Send className="h-5 w-5" />
                  <span>Gửi Tin Nhắn</span>
                </Button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
                Văn Phòng
              </h2>
              
              {/* Map Placeholder */}
              <div className="mb-8">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Google Maps sẽ được tích hợp tại đây</p>
                    <p className="text-sm text-gray-500 mt-1">TP. Hồ Chí Minh</p>
                  </div>
                </div>
              </div>

              {/* Additional Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" style={{ color: '#007a3f' }} />
                    <span>Hỗ Trợ Khách Hàng</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Hotline hỗ trợ</p>
                      <p className="text-gray-600">0931252511</p>
                      <p className="text-sm text-gray-500">Từ 8:00 - 17:00 (T2-T6)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Email hỗ trợ</p>
                      <p className="text-gray-600">dien.tran@bkgreen.vn</p>
                      <p className="text-sm text-gray-500">Phản hồi trong 24h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Câu Hỏi Thường Gặp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Bắt Đầu Dự Án Của Bạn
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Sẵn sàng triển khai dự án xử lý nước? Hãy liên hệ với chúng tôi ngay hôm nay
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" style={{ backgroundColor: '#cc0000', borderColor: '#cc0000' }}>
                <a href="tel:0931252511" className="focus:outline-none focus:ring-0">Gọi Ngay: 0931252511</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="mailto:dien.tran@bkgreen.vn" className="focus:outline-none focus:ring-0">Gửi Email</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}