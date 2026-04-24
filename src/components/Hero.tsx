import React, { useState, useEffect } from "react";

interface HeroProps {
  isDark?: boolean;
}

const darkImg = "./src/assets/hero-dark.jpeg";
const lightImg = "./src/assets/hero-light.jpeg";

const Hero: React.FC<HeroProps> = ({ isDark = true }) => {
  const [experience, setExperience] = useState(0);
  const [clients, setClients] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const currentImage = isDark ? darkImg : lightImg;

  // smoother counter animation
  useEffect(() => {
    let start: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // smoother easing

      setExperience(Math.floor(12 * ease));
      setClients(Math.floor(100 * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // image preload for smooth fade
  useEffect(() => {
    const img = new Image();
    img.src = currentImage;
    img.onload = () => setLoaded(true);
  }, [currentImage]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">

        {/* Main Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out
          ${loaded ? "opacity-100 scale-105" : "opacity-0 scale-110"} blur-[0px]`}
          style={{
            backgroundImage: `url(${currentImage})`,
          }}
        />

        {/* Soft overlay */}
        <div className={`absolute inset-0 transition-colors duration-700 ${
          isDark ? "bg-black/25" : "bg-black/5"
        }`} />

        {/* extra smooth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 text-center z-10 relative">

        <div className="inline-block px-3 py-1 rounded-full bg-green-800/60 text-white text-xs font-bold mb-4 backdrop-blur-md">
          رواد التطوير العقاري في بني سويف
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight drop-shadow-2xl">
          بيتك <span className="text-green-500">ومطرحك</span>
        </h1>

        <p className="text-sm md:text-lg text-slate-100 mb-8 max-w-2xl mx-auto">
          نقدم لك وحدات سكنية وتجارية تجمع بين الرفاهية العالمية والروح المصرية الأصيلة.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">

          <a
            href="#projects"
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all hover:-translate-y-1 shadow-lg"
          >
            استعرض المشاريع
          </a>

          <a
            href="#contact"
            className="bg-[var(--bg)]/10 border border-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-[var(--bg)] hover:text-black transition-all backdrop-blur-md"
          >
            تواصل معنا
          </a>

        </div>

        <div className="flex flex-wrap justify-center gap-4">

          <div className="bg-[var(--bg)]/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl min-w-[150px] transition hover:scale-105 duration-300">
            <div className="text-4xl font-black text-green-500">
              {experience}+
            </div>
            <p className="text-slate-300 text-xs mt-1">سنة خبرة</p>
          </div>

          <div className="bg-[var(--bg)]/5 backdrop-blur-xl border border-white/10 p-5 rounded-3xl min-w-[150px] transition hover:scale-105 duration-300">
            <div className="text-4xl font-black text-white">
              {clients}+
            </div>
            <p className="text-slate-300 text-xs mt-1">عميل يثق بنا</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;