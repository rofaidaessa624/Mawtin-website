import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 text-white py-16 overflow-hidden border-t border-green-900/20">

      {/* GLOW BACKGROUND EFFECT */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative container mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* ABOUT */}
          <div className="group transition duration-500 hover:-translate-y-1">
            <h4 className="font-bold mb-4 text-white text-lg tracking-wide">
              عن موطن
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition">
              شركة رائدة في التطوير العقاري تقدم حلولاً سكنية وتجارية متكاملة بأعلى معايير الجودة.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-bold mb-4 text-white text-lg tracking-wide">
              روابط سريعة
            </h4>

            <ul className="space-y-3 text-slate-400 text-sm">
              {[
                { label: 'الرئيسية', href: '#home' },
                { label: 'المشاريع', href: '#projects' },
                { label: 'الفريق', href: '#team' },
                { label: 'اتصل بنا', href: '#contact' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative group inline-block transition hover:text-green-400"
                  >
                    <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-green-500 transition-all group-hover:w-full"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-bold mb-4 text-white text-lg tracking-wide">
              تابعنا
            </h4>

            <div className="flex gap-3 flex-wrap">

              {[
                { icon: 'facebook-f', color: 'hover:bg-blue-600' },
                { icon: 'youtube', color: 'hover:bg-red-600' },
                { icon: 'whatsapp', color: 'hover:bg-green-500' },
                { icon: 'instagram', color: 'hover:bg-pink-600' },
                { icon: 'tiktok', color: 'hover:bg-black' },
              ].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className={`w-11 h-11 bg-[var(--bg)]/5 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center transition duration-300 hover:scale-110 ${s.color}`}
                >
                  <i className={`fab fa-${s.icon}`}></i>
                </a>
              ))}

            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold mb-4 text-white text-lg tracking-wide">
              تواصل سريع
            </h4>

            <a
              href="tel:201055533321"
              className="inline-block text-slate-300 hover:text-green-400 transition text-sm"
            >
              01055533321
            </a>

            <div className="mt-4 text-slate-500 text-xs leading-relaxed">
              بني سويف - شرق النيل<br />
              إشارة تعليم صناعي<br />
              بجوار بنزينة التعاون (CPC)
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-slate-500 text-sm tracking-wide">
            © 2026 موطن للتطوير العقاري — جميع الحقوق محفوظة
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;