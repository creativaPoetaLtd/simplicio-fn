
import './App.css'
import About from './components/About/About'
import Approach from './components/Approach/Approach'
import Contact from './components/Contact/Contact'
import FAQ from './components/FAQ/FAQ'
import Features from './components/Feature/Feature'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import NavBar from './components/Navbar/Navbar'

function App() {
  return (
    <>
      <NavBar />
      <Home />
      <About />
      <Features />
      <Approach />
      <Contact />
      <FAQ />
      <Footer />
    </>
  )
}

export default App
