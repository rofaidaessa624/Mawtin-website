import React, { useState } from 'react';
import { validateForm, showToast } from '../utils/validation';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReserveModal: React.FC<ReserveModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        showToast('تم حجز استشارتك بنجاح! سنتواصل معك قريباً.');
        setFormData({ name: '', phone: '' });
        setIsLoading(false);
        onClose();
      }, 1500);
    }
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
        className="bg-[var(--bg)] dark:bg-slate-800 w-full max-w-xl rounded-4xl p-10 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 left-8 text-slate-400 hover:text-red-500 transition"
          aria-label="إغلاق النافذة"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
        <h3 className="text-2xl font-black mb-2 text-green-600" id="modal-title">
          حجز استشارة مجانية
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">تواصل معنا الآن للحصول على استشارة مجانية من خبرائنا</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="الاسم الكامل"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 outline-none focus:ring-2 focus:ring-green-600 transition"
            required
            aria-label="الاسم"
          />
          <input
            type="tel"
            name="phone"
            placeholder="رقم الهاتف"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 outline-none focus:ring-2 focus:ring-green-600 transition"
            required
            aria-label="رقم الهاتف"
          />
          <select className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700 outline-none focus:ring-2 focus:ring-green-600 transition" aria-label="اختر المشروع">
            <option>-- اختر المشروع الذي تهتم به --</option>
            <option>مشروع ٩١٢ الحي الرابع</option>
            <option>فيلا ١٤ الحي الخامس</option>
          </select>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all duration-300"
          >
            {isLoading ? 'جاري التأكيد...' : 'تأكيد الحجز'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReserveModal;