// src/pages/Home.jsx
import HeroSection from '../components/HeroSection'
import Team from '../components/Team'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="pt-20">
      <HeroSection />
      <Team/>
      <Footer/>
    </div>
  )
}