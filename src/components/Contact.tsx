import React, { useState } from 'react';
import { validateForm, showToast } from '../utils/validation';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm(formData)) {
      setIsLoading(true);

      setTimeout(() => {
        showToast('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');

        // 👇 جلب الرسائل القديمة
        const oldMessages = JSON.parse(
          localStorage.getItem('contactMessages') || '[]'
        );

        // 👇 إنشاء رسالة جديدة
        const newMessage = {
          ...formData,
          date: new Date().toISOString(),
        };

        // 👇 تحديث القائمة
        const updatedMessages = [newMessage, ...oldMessages];

        // 👇 حفظ في localStorage
        localStorage.setItem(
          'contactMessages',
          JSON.stringify(updatedMessages)
        );

        // تنظيف الفورم
        setFormData({ name: '', phone: '', message: '' });
        setIsLoading(false);
      }, 1500);
    }
  };

  const phoneNumber = '201055533321';
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  const mapLink = 'https://maps.app.goo.gl/7VaE7jBkeodat5J7A';

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* INFO SIDE */}
          <div>
    <h2 className="text-4xl font-black mb-8 leading-tight">
  تواصل مع <span className="text-green-600">خبيرنا</span> العقاري
</h2>
            <div className="space-y-6">

              {/* PHONE */}
              <a
                href={`tel:${phoneNumber}`}
                className="flex gap-6 items-center group"
              >
                <div className="w-12 h-12 bg-green-600/10 group-hover:bg-green-600 text-green-600 group-hover:text-white rounded-xl flex items-center justify-center transition">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-500">اتصل بنا</p>
                  <p className="font-bold text-lg hover:text-green-600 transition">
                    01055533321
                  </p>
                </div>
              </a>

              {/* LOCATION */}
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="flex gap-6 items-center group"
              >
                <div className="w-12 h-12 bg-blue-600/10 group-hover:bg-blue-600 text-blue-600 group-hover:text-white rounded-xl flex items-center justify-center transition">
                  <i className="fas fa-map-marker-alt"></i>
                </div>

                <div>
                  <p className="text-sm text-slate-500">عنواننا</p>

                  <p className="font-bold text-lg leading-relaxed">
                    بني سويف - شرق النيل - إشارة تعليم صناعي
                    <span className="block text-sm text-slate-600 dark:text-slate-400 font-medium">
                      بجوار بنزينة التعاون (CPC) - أعلى توكيل قطونيل
                    </span>
                  </p>

                  <span className="text-green-600 text-sm font-bold hover:underline">
                    فتح على الخريطة (GPS)
                  </span>
                </div>
              </a>

              {/* WHATSAPP */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex gap-6 items-center group"
              >
                <div className="w-12 h-12 bg-green-500/10 group-hover:bg-green-500 text-green-500 group-hover:text-white rounded-xl flex items-center justify-center transition">
                  <i className="fab fa-whatsapp text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-500">واتساب</p>
                  <p className="font-bold text-lg hover:text-green-500 transition">
                    تواصل مباشر
                  </p>
                </div>
              </a>

            </div>
          </div>

          {/* FORM SIDE */}
          <div className="bg-[var(--bg)] dark:bg-slate-800 p-8 rounded-4xl shadow-xl">

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="الاسم"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 outline-none focus:ring-2 focus:ring-green-600"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 outline-none focus:ring-2 focus:ring-green-600"
                required
              />

              <textarea
                name="message"
                placeholder="رسالتك"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 outline-none focus:ring-2 focus:ring-green-600"
                rows={4}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
                {isLoading ? 'جاري الإرسال...' : 'إرسال الطلب'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;