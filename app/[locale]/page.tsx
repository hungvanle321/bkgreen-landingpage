import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import EquipmentSection from '@/components/EquipmentSection'
import HeroSection from '@/components/HeroSection'
import ProcessSection from '@/components/ProcessSection'
import ServicesSection from '@/components/ServicesSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <EquipmentSection />
      <ProcessSection />
      <ContactSection />
    </>
  )
}
