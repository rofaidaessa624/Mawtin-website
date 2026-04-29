import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  status: 'sold' | 'construction' | 'available' | 'soon';
  pdf: string;
  location: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'مشروع ٤١ حي الأزهر',
      description: 'مشروع مميز في موقع استراتيجي داخل حي الأزهر.',
      image: '/assets/7b2a677b-4642-4346-a394-568fc358ef59/6005654084716792869.jpg',
      status: 'sold',
      pdf: '/brochures/Brochure Villa 41 al azhar 3.pdf',
      location: 'https://maps.app.goo.gl/F2Gja5DCQFpj2u348?g_st=iw',
    },
    {
      id: 2,
      title: 'مشروع ٩١٢ الحي الرابع',
      description: 'وحدات سكنية متكاملة بمساحات متنوعة وتشطيب مميز.',
      image: '/assets/961b644c-3b40-43a9-a908-5587b99747e9/6005654084716792870.jpg',
      status: 'available',
      pdf: '/brochures/Brochure Villa 912 al azhar 3.pdf',
      location: 'https://maps.app.goo.gl/HHoGmBkRAmgvWgWYA?g_st=iw',
    },
    {
      id: 3,
      title: 'مشروع ٣ حي الأزهر',
      description: 'مشروع يجمع بين الموقع المميز وسهولة الوصول.',
      image: '/assets/3378899a-8433-4b5e-9738-c110097dfd39/6005654084716792869.jpg',
      status: 'sold',
      pdf: '/brochures/Brochure Villa 3 al azhar 3.pdf',
      location: 'https://maps.app.goo.gl/Zfh9R1p9gug58kum8?g_st=iw',
    },
    {
      id: 4,
      title: 'مشروع ١٤ الحي الخامس (طريق الأربع حارات)',
      description: 'فيلات ومشروعات راقية بتصميم عصري وموقع حيوي.',
      image: '/assets/88344759-e888-45f5-9d3a-31abd157c8de/6005654084716792867.jpg',
      status: 'soon',
      pdf: '/brochures/project-14.pdf',
      location: 'https://maps.app.goo.gl/XYu6SoYTFuA7iuQe7?g_st=iw',
    },
  ];

  const statusText = {
    sold: 'تم البيع',
    construction: 'تحت الإنشاء',
    available: 'متاح الحجز',
    soon: 'قريباً',
  };

  const statusColor = {
    sold: 'bg-red-600',
    construction: 'bg-yellow-500',
    available: 'bg-[#5fa046]',
    soon: 'bg-[#5fa046]',
  };

  return (
    <section
      id="projects"
      className="py-24 bg-[var(--bg)] dark:bg-[#0b1220] transition-colors duration-500"
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">
            مشاريعنا <span className="text-[#5fa046]">الرائدة</span>
          </h2>

          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            نختار أفضل المواقع لنقدم مشاريع عقارية تليق بعملائنا
          </p>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-[var(--card)] dark:bg-[#111827] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >

              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">

                <img
                  src={project.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* OVERLAY */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition
                  ${project.status === 'soon'
                      ? 'bg-black/40'
                      : 'bg-black/0 group-hover:bg-black/40'
                    }`}
                >
                  <span
                    className={`px-4 py-2 text-white text-sm font-bold rounded-full transition
                    ${statusColor[project.status]}
                    ${project.status === 'soon'
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                      }`}
                  >
                    {statusText[project.status]}
                  </span>
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-white">
                  {project.title}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-2">

                  {/* PDF */}
                  <a
                    href={project.pdf}
                    target="_blank"
                    className="flex-1 bg-[#5fa046] hover:bg-[#4e8a3a] text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition"
                  >
                    <i className="fas fa-file-pdf"></i>
                    الكتيب
                  </a>

                  {/* LOCATION */}
                  <a
                    href={project.location}
                    target="_blank"
                    className="w-11 h-11 bg-slate-100 dark:bg-[#0f172a] text-slate-700 dark:text-white flex items-center justify-center rounded-xl hover:bg-[#5fa046] hover:text-white transition"
                  >
                    <i className="fas fa-location-dot"></i>
                  </a>

                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Projects;