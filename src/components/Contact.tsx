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

      // ✅ تحويل الرقم لصيغة دولية (مصر)
      const phoneNumber = '201210779372';

      // ✅ تجهيز الرسالة
      const message = encodeURIComponent(
        `🔥 طلب جديد من الموقع\n\n👤 الاسم: ${formData.name}\n📞 الهاتف: ${formData.phone}\n\n💬 الرسالة:\n${formData.message}`
      );

      // ✅ فتح واتساب
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

      showToast('تم تحويلك إلى واتساب');

      setFormData({ name: '', phone: '', message: '' });
      setIsLoading(false);
    }
  };

  const mapLink = 'https://maps.app.goo.gl/7VaE7jBkeodat5J7A';

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-4xl font-black mb-8 leading-tight">
              تواصل مع <span className="text-green-600">خبيرنا</span> العقاري
            </h2>

            <div className="space-y-6">

              <a href="tel:01210779372" className="flex gap-6 items-center group">
                <div className="w-12 h-12 bg-green-600/10 group-hover:bg-green-600 text-green-600 group-hover:text-white rounded-xl flex items-center justify-center transition">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-500">اتصل بنا</p>
                  <p className="font-bold text-lg">01210779372</p>
                </div>
              </a>

              <a href={mapLink} target="_blank" rel="noreferrer" className="flex gap-6 items-center group">
                <div className="w-12 h-12 bg-blue-600/10 group-hover:bg-blue-600 text-blue-600 group-hover:text-white rounded-xl flex items-center justify-center transition">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p className="text-sm text-slate-500">عنواننا</p>
                  <p className="font-bold text-lg">
                    بني سويف - شرق النيل
                  </p>
                </div>
              </a>

            </div>
          </div>

          <div className="bg-[var(--bg)] dark:bg-slate-800 p-8 rounded-4xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="الاسم"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl"
              />

              <input
                type="tel"
                name="phone"
                placeholder="رقم الهاتف"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl"
              />

              <textarea
                name="message"
                placeholder="رسالتك"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full p-4 rounded-xl"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-4 rounded-xl"
              >
                {isLoading ? 'جاري التحويل...' : 'إرسال'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;