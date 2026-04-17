import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { Stats } from '@/components/landing/Stats'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { ActiveRequests } from '@/components/landing/ActiveRequests'
import { WhyAmpara } from '@/components/landing/WhyAmpara'
import { Testimonials } from '@/components/landing/Testimonials'
import { ForSupporters } from '@/components/landing/ForSupporters'
import { TrustSecurity } from '@/components/landing/TrustSecurity'
import { FinalCTA } from '@/components/landing/FinalCTA'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <ActiveRequests />
        <WhyAmpara />
        <Testimonials />
        <ForSupporters />
        <TrustSecurity />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
