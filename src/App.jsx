import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// مكونات الموقع العادي
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ReserveModal from './components/ReserveModal';
import ProgressBar from './components/ProgressBar';

// مكونات داشبورد المستخدم
import UserLogin from './pages/UserLogin';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Dark Mode
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

  // Check Auth
  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const userData = localStorage.getItem('user_data');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
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

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
  };

  const WebsiteLayout = () => (
    <div dir="rtl" lang="ar" className="min-h-screen transition-colors duration-500 bg-[var(--bg)] text-[var(--text)]">
      <ProgressBar />
      <Navigation
        isDark={isDark}
        toggleTheme={toggleTheme}
        onReserveClick={() => setShowReserveModal(true)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
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
        onLoginSuccess={handleLogin}
      />
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/user/dashboard" />
            ) : (
              <UserLogin onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/user/dashboard"
          element={
            isAuthenticated ? (
              <UserDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/user/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;