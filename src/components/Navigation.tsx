import React, { useState, useEffect } from "react";

interface NavigationProps {
  isDark: boolean;
  toggleTheme: () => void;
  onReserveClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isDark,
  toggleTheme,
  onReserveClick,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "الرئيسية", href: "#home" },
    { label: "من نحن", href: "#about" },
    { label: "المشاريع", href: "#projects" },
    { label: "الفريق", href: "#team" },
    { label: "الأسئلة", href: "#faq" },
    { label: "اتصل بنا", href: "#contact" },
  ];

  // ✅ smooth scroll
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setShowMobileMenu(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "py-2 px-6" : "py-4 px-10"
      }`}
    >
      <div className="max-w-[1400px] mx-auto">

        {/* NAV BAR */}
        <div
          className={`rounded-[2rem] px-8 py-3 flex justify-between items-center backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "bg-white/70 dark:bg-[#0b1220]/70 shadow-xl"
              : "bg-transparent"
          }`}
        >

          {/* LOGO */}
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-4">
           <img
  src="/assets/logo-removebg-preview.png"
  className="w-20 h-16 object-contain"
/>

            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                موطن
              </h1>
              <p className="text-xs text-[#5fa046] font-bold tracking-widest">
                للتطوير العقاري
              </p>
            </div>
          </a>

          {/* LINKS */}
          <div className="hidden lg:flex items-center gap-10 text-slate-700 dark:text-slate-200">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative font-bold text-lg hover:text-[#5fa046] transition"
              >
                {link.label}

                {/* underline hover */}
                <span className="absolute right-0 -bottom-1 w-0 h-[2px] bg-[#5fa046] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">

            {/* THEME */}
            <button
              onClick={toggleTheme}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#111827] text-slate-700 dark:text-white hover:bg-[#5fa046] hover:text-white transition"
            >
              <i className={`fas fa-${isDark ? "sun" : "moon"}`} />
            </button>

            {/* CTA */}
            <button
              onClick={onReserveClick}
              className="hidden md:flex bg-[#5fa046] hover:bg-[#4e8a3a] text-white px-6 py-2.5 rounded-xl font-bold transition"
            >
              تسجيل دخول
            </button>

            {/* MOBILE */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-[#111827] text-slate-700 dark:text-white"
            >
              <i className={`fas fa-${showMobileMenu ? "xmark" : "bars"}`} />
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 bg-white dark:bg-[#0b1220] rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-4 text-slate-800 dark:text-white">

              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-bold py-3 px-4 rounded-xl hover:bg-[#5fa046]/10 transition"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={onReserveClick}
                className="w-full bg-[#5fa046] text-white py-3 rounded-xl font-bold mt-4"
              >
                تسجيل دخول
              </button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;