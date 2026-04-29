import React, { useEffect, useState } from "react";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="about"
      className="py-24 bg-[var(--bg)] dark:bg-[#0b1220] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 right-10 w-72 h-72 bg-green-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ================= TEXT ================= */}
          <div
            className={`transition-all duration-1000 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-green-600" />
              <span className="text-green-600 font-bold uppercase tracking-widest text-sm">
                قصتنا
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
              من نحن في <span className="text-green-600">موطن</span>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">

في موطن للتطوير العقاري، نرسخ مكانتنا كمرجعية رائدة وشاملة في قطاع التطوير العقاري ببني سويف. نتجاوز حدود البناء التقليدي لنقدم حلولًا عقارية متكاملة، بدءًا من الاستشارات المتعمقة وصولًا إلى تنفيذ مشاريع مبتكرة تضع معايير جديدة للجودة والقيمة. بقيادة  إدارة موطن الحكيمة ، نلتزم بتشكيل مستقبل عمراني مستدام، فكل مشروع هو بصمة تميز تعكس رؤيتنا الشمولية والتزامنا بالارتقاء بالمجتمع.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">

              {/* Vision */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-r-4 border-green-600 shadow-sm hover:shadow-md transition">
                <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
                  رؤيتنا
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                
أن نكون المرجعية العقارية الأولى في بني سويف، ونموذجًا يحتذى به في التطوير الشامل والمستدام، من خلال إرساء معايير جديدة للتميز والابتكار، والمساهمة الفاعلة في صياغة مستقبل عمراني يلبي تطلعات الأجيال.
                </p>
              </div>

              {/* Mission */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border-r-4 border-green-600 shadow-sm hover:shadow-md transition">
                <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">
                  رسالتنا
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">

قيادة التطوير العقاري الشامل، وتمكين عملائنا بقيمة حقيقية، لبناء مستقبل أفضل.
نحن في موطن، لا نبني مجرد عقارات، بل نصنع مجتمعات ونشكل مستقبلًا، فكل موطن هو قصة نجاح تبدأ برؤية وتكتمل بإنجاز شامل ومستقبل أفضل.                </p>
              </div>

            </div>
          </div>

          {/* ================= LUXURY IMAGE LAYOUT ================= */}
          <div
            className={`relative h-[600px] md:h-[700px] transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="grid grid-cols-12 grid-rows-12 gap-4 h-full">

              {/* MAIN IMAGE (Workers focus) */}
              <div className="col-span-8 row-span-12 relative overflow-hidden rounded-[2rem] shadow-2xl group">
                <img
                  src="/assets/6003402284903107689.jpg"
                  
                  alt="عمال البناء"
                  className="w-full h-full object-cover brightness-90 contrast-110 saturate-110 transition duration-1000 group-hover:scale-105"
                />

                {/* cinematic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* label */}
                <div className="absolute bottom-6 left-6 bg-black/60 text-white px-4 py-2 rounded-xl text-xs backdrop-blur-md">
                  فريق العمل أثناء التنفيذ
                </div>
              </div>

              {/* TOP RIGHT */}
              <div className="col-span-4 row-span-6 relative overflow-hidden rounded-2xl shadow-xl group">
                <img
                                    src="/assets/6003402284903107686.jpg"

                  alt="Site Progress"
                  className="w-full h-full object-cover brightness-90 contrast-110 transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* BOTTOM RIGHT */}
              <div className="col-span-4 row-span-6 relative overflow-hidden rounded-2xl shadow-xl group">
                <img
                  src="/assets/6003402284903107687.jpg"
                  alt="Engineering Quality"
                  className="w-full h-full object-cover brightness-90 contrast-110 transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-green-600/10" />

                <div className="absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-[10px] backdrop-blur-md">
                  جودة التنفيذ
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;