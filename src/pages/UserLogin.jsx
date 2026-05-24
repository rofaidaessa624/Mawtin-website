import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UserLogin = ({ onLogin }) => {
    const [nationalId, setNationalId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/v1/client/login', {
                national_id: nationalId,
                password: password
            });

            if (response.data.token) {
                localStorage.setItem('user_token', response.data.token);
                localStorage.setItem('user_data', JSON.stringify(response.data.client));
                onLogin(response.data.client);
                
                // ✅ التوجيه للصفحة الرئيسية
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'حدث خطأ في تسجيل الدخول');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">تسجيل دخول العميل</h1>
                    <p className="text-gray-500 mt-2">برجاء إدخال البيانات الخاصة بك</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">الرقم القومي</label>
                        <input
                            type="text"
                            value={nationalId}
                            onChange={(e) => setNationalId(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="ادخل الرقم القومي (14 رقم)"
                            maxLength={14}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">كلمة السر</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            placeholder="********"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50 font-semibold"
                    >
                        {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserLogin;