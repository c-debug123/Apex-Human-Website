import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div style={{
      background: '#0A0A0F',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <Nav />
      <Hero />
      <Footer />
    </div>
  )
}
