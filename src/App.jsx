import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileTabBar from './components/MobileTabBar';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certificates />
        <Resume />
        <Contact />
      </main>
      <Footer />
      <MobileTabBar />
    </MotionConfig>
  );
}
