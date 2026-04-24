import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      id: 0,
      question: 'الأسعار بتبدأ من كام ؟ وهل في تفاوض في السعر ؟',
      answer:
        'خليني ارد عليك بأجابة السؤال الثاني عندنا في موطن الأسعار غير قابلة للتفاوض نهائيا ، أما بالنسبة للسؤال الأول :لو تقصد سعر المتر فبيختلف علي حسب الحي ، ولو تقصد سعر الشقة بالتأكيد بيختلف حسب المساحة وموقع الحي .',
    },
    {
      id: 1,
      question: 'هل فيه تقسيط؟ وهل الأفضل التقسيط علي مدة طويلة ولا سنة بس ؟',
      answer:
        'ايوه فيه انظمة تقسيط بتختلف حسب المقدم المدفوع ، القسط علي مدة طويلة بيزود من سعر الشقة وده بيخلي ربحها بيقل في اعادة البيع .',
    },
    {
      id: 2,
      question: 'هل الوحدات بتتسلم تشطيب كامل؟',
      answer:
        'بشكل عام احنا بنبيع الشقق علي الطوب لكن بنسلمك المداخل والواجهة والسلم متشطبين ، ولكن ممكن تتعاقد علي تشطيب شقتك "كامل - نصف تشطيب".',
    },
    {
      id: 3,
      question: 'ايه اللي بيميز موطن عن غيرها؟',
      answer:
        'أحب أقولك اكتر حاجة مميزة عندنا مواقع المشاريع الاستراتيجية ، بمعني اصح موقع الفيلا ينفع سكن او استثمار ، من الآخر يعني قيمة مقابل سعر .',
    },
  ];

  return (
    <section id="faq" className="py-28 bg-[var(--bg)] transition-colors duration-500">
      <div className="container mx-auto px-4 max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-[var(--text)]">
            الأسئلة <span className="text-[#5fa046]">الشائعة</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            كل ما تود معرفته عن خدماتنا وإجراءات التعاقد
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl overflow-hidden border transition-all duration-300 shadow-sm ${
                activeId === item.id
                  ? 'border-[#5fa046] shadow-lg'
                  : 'border-slate-200 dark:border-slate-700'
              } bg-slate-50 dark:bg-slate-800/70 backdrop-blur`}
            >
              <button
                className="w-full flex items-center justify-between p-8 text-right hover:bg-slate-100 dark:hover:bg-slate-700/40 transition"
                onClick={() =>
                  setActiveId(activeId === item.id ? null : item.id)
                }
              >
                <span className="text-xl md:text-2xl font-bold text-[var(--text)]">
                  {item.question}
                </span>

                <span
                  className={`w-10 h-10 rounded-full bg-[#5fa046]/10 text-[#5fa046] flex items-center justify-center transition-transform duration-300 ${
                    activeId === item.id ? 'rotate-180' : ''
                  }`}
                >
                  <i className="fas fa-chevron-down"></i>
                </span>
              </button>

              {activeId === item.id && (
<div className="px-8 pb-8 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;