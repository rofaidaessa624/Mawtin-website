export const validateForm = (formData: Record<string, string>) => {
  let isValid = true;

  if (formData.name && formData.name.trim().length < 3) {
    showFieldError('الاسم يجب أن يكون 3 أحرف على الأقل');
    isValid = false;
  }

  if (formData.phone && !/^01[0-2]\d{8}$/.test(formData.phone.trim())) {
    showFieldError('رقم الهاتف غير صحيح');
    isValid = false;
  }

  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    showFieldError('البريد الإلكتروني غير صحيح');
    isValid = false;
  }

  return isValid;
};

export const showFieldError = (errorMessage: string) => {
  console.error(errorMessage);
};

export const showToast = (message: string, type: 'success' | 'error' = 'success') => {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-8 right-8 px-6 py-4 rounded-lg text-white font-bold shadow-lg z-50 transition-all ${
    type === 'error' ? 'bg-red-500' : 'bg-green-500'
  }`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};