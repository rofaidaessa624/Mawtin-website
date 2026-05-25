import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.mawtin.net/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// إضافة التوكين لكل الطلبات
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('user_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// معالجة الأخطاء
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user_token');
            localStorage.removeItem('user_data');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default api;