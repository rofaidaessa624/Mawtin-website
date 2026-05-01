import { useState, ChangeEvent, FormEvent } from 'react';

/**
 * ملاحظة: تم تحديث الكود ليتوافق مع TypeScript وحل أخطاء الـ build.
 * تم إزالة استيراد React غير المستخدم وتحديد أنواع البيانات للمدخلات والأحداث.
 */

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showInternalToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // تحقق بسيط
    if (!formData.name || !formData.phone) {
      showInternalToast('يرجى ملء الحقول المطلوبة');
      return;
    }

    setIsLoading(true);

    // ✅ تحويل الرقم لصيغة دولية (مصر)
    const phoneNumber = '201055533321';

    // ✅ تجهيز الرسالة
    const message = encodeURIComponent(
      `🔥 طلب جديد من الموقع\n\n👤 الاسم: ${formData.name}\n📞 الهاتف: ${formData.phone}\n\n💬 الرسالة:\n${formData.message}`
    );

    // محاكاة تأخير بسيط للتحويل
    setTimeout(() => {
      try {
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        showInternalToast('تم تحويلك إلى واتساب');
        setFormData({ name: '', phone: '', message: '' });
      } catch (err) {
        showInternalToast('عذراً، حدث خطأ أثناء التحويل');
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  const mapLink = 'https://maps.app.goo.gl/7VaE7jBkeodat5J7A';

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 rtl" dir="rtl">
      <div className="container mx-auto px-4">
        
        {/* التنبيه (Toast) العائم */}
        {toast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-2xl shadow-2xl animate-bounce">
            {toast}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* الجزء النصي */}
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight text-slate-900 dark:text-white">
              تواصل مع <span className="text-green-600 dark:text-green-500">خبيرنا</span> العقاري
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md">
              نحن هنا لمساعدتك في العثور على بيت أحلامك. تواصل معنا مباشرة عبر الهاتف أو قم بزيارة مكتبنا.
            </p>

            <div className="space-y-6">
              {/* الهاتف */}
              <a href="tel:01055533321" className="flex gap-6 items-center group">
                <div className="w-14 h-14 bg-green-600/10 group-hover:bg-green-600 text-green-600 group-hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">اتصل بنا</p>
                  <p className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-green-600 transition-colors">01055533321</p>
                </div>
              </a>

              {/* العنوان */}
              <a href={mapLink} target="_blank" rel="noreferrer" className="flex gap-6 items-center group">
                <div className="w-14 h-14 bg-blue-600/10 group-hover:bg-blue-600 text-blue-600 group-hover:text-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500 font-medium">عنواننا</p>
                  <p className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    بني سويف - شرق النيل
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* صندوق الفورم */}
          <div className="bg-white dark:bg-slate-900 p-8 lg:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 mr-1">الاسم الكامل</label>
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم بالكامل"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-600 dark:focus:border-green-500 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 mr-1">رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="01xxxxxxxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-600 dark:focus:border-green-500 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 mr-1">كيف يمكننا مساعدتك؟</label>
                <textarea
                  name="message"
                  placeholder="أكتب استفسارك هنا..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-green-600 dark:focus:border-green-500 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 ${
                  isLoading 
                  ? 'bg-slate-400 cursor-not-allowed text-white' 
                  : 'bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white shadow-green-200 dark:shadow-none'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري التحويل...
                  </>
                ) : (
                  <>
                    <i className="fab fa-whatsapp text-xl"></i>
                    إرسال عبر واتساب
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default App;