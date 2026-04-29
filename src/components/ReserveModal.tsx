import React, { useState } from 'react';

// ملاحظة: قمت بإزالة الاستيرادات غير الضرورية لتسهيل التشغيل، 
// ويمكنك إعادة استيراد validateForm إذا كنت ترغب في التحقق من عدد الأرقام أولاً.

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReserveModal: React.FC<ReserveModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nationalId: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // محاكاة عملية التحقق
    setTimeout(() => {
      setIsLoading(false);
      // إظهار الرسالة المطلوبة بغض النظر عن البيانات المدخلة
      setMessage('الرجاء الرجوع لشركة موطن للتأكد من صحة البيانات.');
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4"
      onClick={onClose}
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-8 relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-slate-400 hover:text-red-500 transition"
          aria-label="إغلاق النافذة"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="text-center mb-6">
            <h3 className="text-2xl font-black text-slate-800 dark:text-white" id="modal-title">
              تسجيل الدخول
            </h3>
            <p className="text-slate-500 text-sm mt-1">يرجى إدخال البيانات المطلوبة</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 mr-1">الرقم القومي</label>
            <input
                type="text"
                name="nationalId"
                placeholder="أدخل 14 رقم"
                value={formData.nationalId}
                onChange={handleChange}
                maxLength={14}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 border border-transparent focus:border-green-600 outline-none transition"
                required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 mr-1">كلمة المرور</label>
            <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 border border-transparent focus:border-green-600 outline-none transition"
                required
            />
          </div>

          {/* رسالة التنبيه في حال وجودها */}
          {message && (
            <div className="p-4 bg-orange-50 border-r-4 border-orange-500 rounded-lg text-orange-800 text-sm font-bold animate-pulse">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-green-600/20"
          >
            {isLoading ? 'جاري التحقق...' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReserveModal;