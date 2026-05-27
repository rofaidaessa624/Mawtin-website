import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import NotificationBell from '../components/NotificationBell';
import InstallmentsTable from '../components/InstallmentsTable';
import UnitUpdates from '../components/UnitUpdates';


const UserDashboard = ({ user, onLogout }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activePage, setActivePage] = useState('dashboard'); // dashboard, myUnits, installments, support, settings
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboard();
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

const fetchDashboard = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        const token = localStorage.getItem('user_token');

        if (!userData || !token) {
            onLogout();
            navigate('/');
            return;
        }

        // ✅ استخدم الرابط الصح مع التوكن
        const response = await api.get('/user/dashboard', {
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (response.data) {
            setDashboardData(response.data);
        }
    } catch (err) {
        console.error('Dashboard error:', err);
        setError('حدث خطأ في تحميل البيانات');
        if (err.response?.status === 401) {
            onLogout();
            navigate('/');
        }
    } finally {
        setLoading(false);
    }
};
    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900" dir="rtl">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-4 text-gray-400">جاري تحميل البيانات...</p>
                </div>
            </div>
        );
    }

    if (error || !dashboardData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900" dir="rtl">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-4">⚠️ {error || 'حدث خطأ في تحميل البيانات'}</div>
                    <button 
                        onClick={fetchDashboard} 
                        className="bg-emerald-700 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    const { client, unit, installments, installments_summary, unit_updates } = dashboardData;

    // حساب نسبة التقدم في الأقساط
    const paidPercentage = installments_summary?.total_installments > 0 
        ? (installments_summary.paid_count / installments_summary.total_installments) * 100 
        : 0;

    // قائمة الـ Sidebar
    const menuItems = [
        { id: 'dashboard', icon: '📊', label: 'لوحة التحكم' },
        { id: 'myUnits', icon: '🏠', label: 'وحداتي' },
        { id: 'installments', icon: '💰', label: 'الأقساط' },
        { id: 'support', icon: '📞', label: 'الدعم الفني' },
        { id: 'settings', icon: '⚙️', label: 'الإعدادات' },
    ];

    // عرض المحتوى حسب الصفحة النشطة
    const renderContent = () => {
        switch(activePage) {
            case 'myUnits':
                return (
                    <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-white mb-4">🏠 وحداتي</h2>
                        <div className="bg-gray-900 rounded-xl p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <p className="text-gray-400 mb-2">رقم الوحدة</p>
                                    <p className="text-2xl font-bold text-white">{unit?.unit_number}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-400 mb-2">اسم المشروع</p>
                                    <p className="text-2xl font-bold text-white">{unit?.project_name}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-400 mb-2">نوع الوحدة</p>
                                    <p className="text-2xl font-bold text-white">{unit?.unit_type === 'apartment' ? 'شقة' : unit?.unit_type}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
                                <div>
                                    <p className="text-gray-400 text-sm">المساحة</p>
                                    <p className="text-white font-semibold">{unit?.area} م²</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">عدد الغرف</p>
                                    <p className="text-white font-semibold">{unit?.bedrooms}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">عدد الحمامات</p>
                                    <p className="text-white font-semibold">{unit?.bathrooms}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">الموقع</p>
                                    <p className="text-white font-semibold">{unit?.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            
            case 'installments':
                return (
                    <InstallmentsTable installments={installments || []} unitNumber={unit?.unit_number} />
                );
            
            case 'support':
                return (
                    <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-white mb-4">📞 الدعم الفني</h2>
                        <div className="bg-gray-900 rounded-xl p-6">
                            <p className="text-gray-300 mb-4">للاستفسارات والدعم، يمكنك التواصل معنا عبر:</p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                    <span className="text-2xl">📧</span>
                                    <div>
                                        <p className="text-gray-400 text-sm">البريد الإلكتروني</p>
                                        <p className="text-white">support@motan.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                    <span className="text-2xl">📞</span>
                                    <div>
                                        <p className="text-gray-400 text-sm">رقم الهاتف</p>
                                        <p className="text-white">01001234567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                                    <span className="text-2xl">💬</span>
                                    <div>
                                        <p className="text-gray-400 text-sm">واتساب</p>
                                        <p className="text-white">01001234567</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            
            case 'settings':
                return (
                    <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-white mb-4">⚙️ الإعدادات</h2>
                        <div className="bg-gray-900 rounded-xl p-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-semibold">الاسم</p>
                                        <p className="text-gray-400 text-sm">{client?.full_name}</p>
                                    </div>
                                    <button className="text-emerald-500 hover:text-emerald-400">تعديل</button>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-semibold">البريد الإلكتروني</p>
                                        <p className="text-gray-400 text-sm">{client?.email}</p>
                                    </div>
                                    <button className="text-emerald-500 hover:text-emerald-400">تعديل</button>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-gray-700">
                                    <div>
                                        <p className="text-white font-semibold">رقم الهاتف</p>
                                        <p className="text-gray-400 text-sm">{client?.phone}</p>
                                    </div>
                                    <button className="text-emerald-500 hover:text-emerald-400">تعديل</button>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-white font-semibold">كلمة السر</p>
                                        <p className="text-gray-400 text-sm">••••••••</p>
                                    </div>
                                    <button className="text-emerald-500 hover:text-emerald-400">تغيير</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            
            default: // dashboard
                return (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">🏠</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{unit?.unit_number || '-'}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm">رقم الوحدة</h3>
                                <p className="text-white font-semibold">{unit?.project_name || '-'}</p>
                            </div>

                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">💰</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{installments_summary?.total_installments || 0}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm">إجمالي الأقساط</h3>
                                <p className="text-gray-300 text-sm">{installments_summary?.paid_count || 0} مدفوع / {installments_summary?.pending_count || 0} متبقي</p>
                            </div>

                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">📈</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{paidPercentage.toFixed(0)}%</span>
                                </div>
                                <h3 className="text-gray-400 text-sm">نسبة الإنجاز</h3>
                                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${paidPercentage}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-emerald-900/50 rounded-xl flex items-center justify-center">
                                        <span className="text-2xl">💳</span>
                                    </div>
                                    <span className="text-2xl font-bold text-white">{installments_summary?.total_remaining?.toLocaleString() || 0}</span>
                                </div>
                                <h3 className="text-gray-400 text-sm">المتبقي دفعة</h3>
                                <p className="text-white font-semibold text-sm">ج.م</p>
                            </div>
                        </div>

                        {/* Unit Info & Progress */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                                <h2 className="text-lg font-bold text-white mb-4">📋 معلومات الوحدة</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">المشروع</span>
                                        <span className="font-semibold text-white">{unit?.project_name}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">النوع</span>
                                        <span className="font-semibold text-white">{unit?.unit_type === 'apartment' ? 'شقة' : unit?.unit_type}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">المساحة</span>
                                        <span className="font-semibold text-white">{unit?.area} م²</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">الموقع</span>
                                        <span className="font-semibold text-white">{unit?.location}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-700">
                                        <span className="text-gray-400">السعر الإجمالي</span>
                                        <span className="font-semibold text-emerald-500">{unit?.total_price?.toLocaleString()} ج.م</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">المدفوع</span>
                                        <span className="font-semibold text-emerald-500">{installments_summary?.total_paid?.toLocaleString()} ج.م</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-2xl shadow-sm p-6">
                                <h2 className="text-lg font-bold text-white mb-4">📊 ملخص الأقساط</h2>
                                <div className="relative w-40 h-40 mx-auto mb-4">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle className="text-gray-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"/>
                                        <circle className="text-emerald-600" strokeWidth="10" strokeDasharray={`${paidPercentage * 2.51} 251.2`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50"/>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{paidPercentage.toFixed(0)}%</span>
                                    </div>
                                </div>
                                <div className="flex justify-around text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-white">{installments_summary?.total_installments || 0}</p>
                                        <p className="text-sm text-gray-400">إجمالي الأقساط</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-emerald-500">{installments_summary?.paid_count || 0}</p>
                                        <p className="text-sm text-gray-400">مدفوع</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-yellow-500">{installments_summary?.pending_count || 0}</p>
                                        <p className="text-sm text-gray-400">متبقي</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Installments */}
                        <div className="bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-white">📅 آخر الأقساط</h2>
                                <button 
                                    onClick={() => setActivePage('installments')}
                                    className="text-emerald-500 text-sm hover:text-emerald-400"
                                >
                                    عرض الكل →
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-800 border-b border-gray-700 rounded-2xl shadow-sm p-6">
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">رقم القسط</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">المبلغ</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">تاريخ الاستحقاق</th>
                                            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">الحالة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {installments?.slice(0, 5).map((item) => (
                                            <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                                <td className="py-3 px-4 text-white">{item.installment_number}</td>
                                                <td className="py-3 px-4 text-white">{item.amount?.toLocaleString()} ج.م</td>
                                                <td className="py-3 px-4 text-gray-300">{new Date(item.due_date).toLocaleDateString('ar-EG')}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        item.status === 'paid' ? 'bg-emerald-900 text-emerald-400' :
                                                        item.status === 'overdue' ? 'bg-red-900 text-red-400' : 'bg-yellow-900 text-yellow-400'
                                                    }`}>
                                                        {item.status === 'paid' ? 'مدفوع' : item.status === 'overdue' ? 'متأخر' : 'معلق'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Unit Updates */}
                  {unit_updates && unit_updates.length > 0 && (
    <div className="bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">🔄 تطورات الوحدة</h2>
        <div className="space-y-4">
            {unit_updates.slice(0, 5).map((update, idx) => (
                <div key={idx} className="p-4 bg-gray-900 rounded-xl">
                    <div className="flex gap-3 items-start">
                        <div className="w-10 h-10 bg-emerald-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-500">📢</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">{update.update_text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {new Date(update.created_at).toLocaleDateString('ar-EG', { 
                                    year: 'numeric', month: 'long', day: 'numeric' 
                                })}
                            </p>
                            {/* ✅ صور التطورات */}
{/* ✅ صور التطورات */}
{update.images && update.images.length > 0 && (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
        {update.images.map((img, imgIdx) => {

            // ✅ تنظيف الرابط
const getImageUrl = (path) => {
    if (!path) return '';

    let cleanPath = path.replace(/\\/g, '');

    // لو الرابط localhost بدليه بالدومين الحقيقي
    cleanPath = cleanPath.replace(
        'http://127.0.0.1:8000',
        'https://api.mawtin.net'
    );

    cleanPath = cleanPath.replace(
        'http://localhost:8000',
        'https://api.mawtin.net'
    );

    // لو الرابط كامل بالفعل
    if (cleanPath.startsWith('http')) {
        return cleanPath;
    }

    // إزالة slash زيادة
    cleanPath = cleanPath.replace(/^\/+/, '');

    return `https://api.mawtin.net/${cleanPath}`;
};// console.log("IMAGE OBJECT =>", img);
const imageUrl = getImageUrl(
    img.path || img.image_url || img.url
);
            return (
                <div
                    key={imgIdx}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-gray-800 border border-gray-700 cursor-pointer shadow-md hover:shadow-emerald-500/20 transition-all duration-300"
                    onClick={() => window.open(imageUrl, '_blank')}
                >
                    <img
                        src={imageUrl}
                        alt={`تطور الوحدة ${imgIdx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                            console.log('❌ IMAGE FAILED:', imageUrl);

                            // صورة بديلة لو فشل التحميل
                            e.target.src =
                                'https://via.placeholder.com/300x300?text=Image+Error';
                        }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white text-2xl transform scale-75 group-hover:scale-100 transition-all duration-200">
                            🔍
                        </span>
                    </div>
                </div>
            );
        })}
    </div>
)}




                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
)}



                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-900" dir="rtl">
            {/* Sidebar */}
            <aside className={`fixed top-0 right-0 h-full bg-gray-950 shadow-xl z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center text-white font-bold">م</div>
                            <span className="font-bold text-white">موطن العقارية</span>
                        </div>
                    )}
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
                        </svg>
                    </button>
                </div>

                <nav className="p-4">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActivePage(item.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 transition ${
                                activePage === item.id 
                                    ? 'bg-emerald-700 text-white' 
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-950/50 transition w-full">
                        <span className="text-xl">🚪</span>
                        {sidebarOpen && <span>تسجيل خروج</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-20'}`}>
                {/* Top Header */}
                <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-30">
                    <div className="flex justify-between items-center px-6 py-4">
                        <div className="flex items-center gap-4">
                            <NotificationBell notifications={dashboardData.notifications || []} />
                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm text-gray-400">مرحباً بعودتك</p>
                                    <p className="font-semibold text-white">{client?.full_name}</p>
                                </div>
                                <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold">
                                    {client?.full_name?.charAt(0)}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">لوحة التحكم</h1>
                            <p className="text-sm text-gray-400">نظرة عامة على حسابك ووحدتك</p>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-6">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;