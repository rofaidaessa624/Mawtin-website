import React, { useEffect, useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
}

const Team: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const isDark = document.documentElement.classList.contains("dark");

  const bottomImage = isDark
    ? "/assets/dark.jpeg"
    : "/assets/light.jpeg";

  const teamMembers: TeamMember[] = [
  
    {
      id: 1,
      name: "أحمد طارق",
      position: "رئيس مجلس الإدارة",
      bio: `أحد رواد الأعمال بمحافظة بني سويف، بدأ رحلته المهنية في مجموعة من الشركات الرائدة في مجال الإدارة والمشروعات داخل مصر والمملكة العربية السعودية. اكتسب من خلالها خبرة واسعة في إدارة الشركات والنهوض بالمشروعات الناشئة.

ويعد فهمه العميق لمفهوم الاستثمار من أبرز ما يميز مسيرته، حيث انعكس ذلك بوضوح في تنوع وتعدد أنشطته الاستثمارية رغم اختلاف مجالاتها. إذ نجح في تأسيس شركة فلاي كايرو لحجز تذاكر الطيران، ثم شركة فيجا سيدز في مجال البذور الزراعية.

ومع تطور رؤيته الاستثمارية، اتجه إلى قطاع التطوير العقاري، ليؤسس ويقود شركة موطن للتطوير العقاري كرئيس مجلس إدارتها، مقدمًا نموذجًا قائمًا على الرؤية الذكية، تنوع الاستثمارات، وبناء قيمة حقيقية طويلة المدى.`,
      image: "./assets/ahmed.jpg",
    },
      {
      id: 2,
      name: "محمد دسوقي",
      position: "الرئيس التنفيذي ",
      bio: `أحد أبرز رواد الأعمال والمتخصصين في القطاع العقاري بمحافظة بني سويف، حيث يجمع في مسيرته بين الحنكة الإدارية والرؤية التسويقية الثاقبة.

شغل منصب مدير المبيعات وعضو مجلس الإدارة في "شركة الغزالي للتطوير العقاري" لمدة 12 عامًا، ساهم خلالها في ترسيخ مكانة الشركة كواحدة من رواد الاستثمار العقاري في المنطقة.

وبفضل خبرته التي تمتد لأكثر من عقد، أصبح مرجعًا في ديناميكيات السوق العقاري داخل بني سويف وخارجها، معتمدًا على لغة الأرقام وتحليل احتياجات العملاء.

وقد توّج هذه الرحلة الطويلة من النجاحات بتأسيس "موطن للتطوير العقاري"، حيث يشغل منصب الرئيس التنفيذي، ليقود الشركة نحو فصل جديد من التميز.`,
      image: "/assets/mohamed.jpeg",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="team"
      className="py-32 bg-[var(--bg)] dark:bg-[#0b1220] relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            المؤسسون <span className="text-green-600"></span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            فريق القيادة الذي يقود رؤية موطن نحو مستقبل عقاري أفضل
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`group relative overflow-hidden rounded-3xl h-[540px] shadow-2xl transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >

              {/* IMAGE */}
              <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-contain transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* DARK BASE LAYER */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* DEFAULT INFO */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-black">{member.name}</h3>
                <p className="text-sm text-white/80">{member.position}</p>
              </div>

              {/* GREEN OVERLAY */}
              <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/95 transition-all duration-500 flex flex-col justify-center items-center text-center p-10">

                <span className="bg-[var(--bg)]/20 border border-white/40 text-white px-3 py-1 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition duration-500">
                  {member.position}
                </span>

                <h3 className="text-3xl font-black text-white mt-6 opacity-0 group-hover:opacity-100 transition duration-500 delay-100">
                  {member.name}
                </h3>

                <p className="text-white/95 text-sm leading-relaxed mt-6 max-w-md opacity-0 group-hover:opacity-100 transition duration-500 delay-200">
                  {member.bio}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* BOTTOM IMAGE */}
        <div className="mt-28 max-w-6xl mx-auto">

          <div className="rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src={bottomImage}
              className="w-full transition duration-700 group-hover:scale-105"
              alt="projects"
            />
          </div>

          <p className="text-center text-slate-600 dark:text-slate-400 mt-6 text-lg">
            تمثل مشاريعنا العمرانية رؤيتنا المستقبلية للسكن والاستثمار في بني سويف
          </p>

        </div>

      </div>
    </section>
  );
};

export default Team;