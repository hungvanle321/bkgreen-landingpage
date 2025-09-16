"use client"

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useState } from 'react'


export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const t = useTranslations('process')

  const processSteps = [
    {
      step: '01',
      title: t('steps.survey.title'),
      description: t('steps.survey.description'),
      image: '/process-survey.jpg'
    },
    {
      step: '02', 
      title: t('steps.design.title'),
      description: t('steps.design.description'),
      image: '/process-design.jpg'
    },
    {
      step: '03',
      title: t('steps.installation.title'),
      description: t('steps.installation.description'),
      image: '/process-installation.jpg'
    },
    {
      step: '04',
      title: t('steps.maintenance.title'),
      description: t('steps.maintenance.description'),
      image: '/process-maintenance.jpg'
    }
  ]

  return (
    <section className="relative py-24 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/process-diagram.jpg)' }}>
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            data-aos="fade-up"
          >
            {t('title')}
          </h2>
          <p 
            className="mt-6 text-xl leading-8 text-gray-200"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div 
                key={step.step}
                className={`flex gap-6 p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  activeStep === index 
                    ? 'bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg scale-[1.02]' 
                    : 'hover:bg-white/10 bg-white/5'
                }`}
                onClick={() => setActiveStep(index)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="flex-shrink-0">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full text-white font-bold text-xl transition-all duration-300 ${
                    activeStep === index 
                      ? 'bg-primary-red' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}>
                    {step.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-3 transition-all duration-300 ${
                    activeStep === index ? 'text-white' : 'text-gray-200'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div 
            className="relative"
            data-aos="fade-left"
          >
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={processSteps[activeStep].image}
                alt={processSteps[activeStep].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="object-cover transition-all duration-700 ease-in-out"
                key={activeStep}
                priority={true}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2 transition-all duration-500">{processSteps[activeStep].title}</h3>
                <p className="text-gray-200 transition-all duration-500">{processSteps[activeStep].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
