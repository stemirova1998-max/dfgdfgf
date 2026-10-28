import Header from './components/Header'
import Hero from './components/Hero'
import Advantages from './components/Advantages'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Reviews from './components/Reviews'
import Booking from './components/Booking'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Advantages />
        <Services />
        <Portfolio />
        <About />
        <Reviews />
        <Booking />
      </main>
      <Footer />
    </>
  )
}

export default App
