import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ReserveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (userData: any) => void;
}

const ReserveModal: React.FC<ReserveModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nationalId: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | 'info'>('info');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // مسح الرسالة عند تغيير البيانات
    setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // التحقق من صحة الرقم القومي (14 رقم)
    if (formData.nationalId.length !== 14) {
      setMessage('الرقم القومي يجب أن يتكون من 14 رقم');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.mawtin.net/api/v1/client/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          national_id: formData.nationalId,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // حفظ التوكين والبيانات في localStorage
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.client));
        
        setMessage('تم تسجيل الدخول بنجاح! جاري التحويل...');
        setMessageType('success');
        
        // استدعاء دالة النجاح إذا وجدت
        if (onLoginSuccess) {
          onLoginSuccess(data.client);
        }
        
        // إغلاق المودال بعد نصف ثانية
        setTimeout(() => {
          onClose();
          // التحويل إلى لوحة التحكم
          navigate('/user/dashboard');
        }, 1000);
      } else {
        setMessage(data.message || 'الرقم القومي أو كلمة المرور غير صحيحة');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('حدث خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً');
      setMessageType('error');
    } finally {
      setIsLoading(false);
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
        className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl p-8 relative animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 left-6 text-slate-400 hover:text-red-500 transition"
          aria-label="إغلاق النافذة"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-slate-800 dark:text-white" id="modal-title">
            تسجيل الدخول
          </h3>
          <p className="text-slate-500 text-sm mt-1">يرجى إدخال الرقم القومي وكلمة المرور</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-right" dir="rtl">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 mr-1">
              الرقم القومي
            </label>
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
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 mr-1">
              كلمة المرور
            </label>
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

          {/* رسالة التنبيه */}
          {message && (
            <div
              className={`p-4 border-r-4 rounded-lg text-sm font-bold animate-pulse ${
                messageType === 'error'
                  ? 'bg-red-50 border-red-500 text-red-800'
                  : messageType === 'success'
                  ? 'bg-green-50 border-green-500 text-green-800'
                  : 'bg-orange-50 border-orange-500 text-orange-800'
              }`}
            >
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