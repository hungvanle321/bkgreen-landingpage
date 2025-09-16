import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Liên Hệ - BK Green',
  description: 'Liên hệ với BK Green để được tư vấn về dịch vụ xử lý nước, thiết bị PCCC và các giải pháp kỹ thuật',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
