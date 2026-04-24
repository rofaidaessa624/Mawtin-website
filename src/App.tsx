import { useState, useEffect } from 'react';import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ReserveModal from './components/ReserveModal';
import ProgressBar from './components/ProgressBar';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    const enableDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(enableDark);

    if (enableDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;

      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }

      return newTheme;
    });
  };

  return (
    <div
      dir="rtl"
      lang="ar"
      className="min-h-screen transition-colors duration-500 bg-[var(--bg)] text-[var(--text)]"
    >
      <ProgressBar />

      <Navigation
        isDark={isDark}
        toggleTheme={toggleTheme}
        onReserveClick={() => setShowReserveModal(true)}
      />

      <Hero isDark={isDark} />
      <About />
      <Projects />
      <Team />
      <FAQ />
      <Contact />
      <Footer />

      <ReserveModal
        isOpen={showReserveModal}
        onClose={() => setShowReserveModal(false)}
      />
    </div>
  );
}

export default App;