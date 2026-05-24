import React, { useState, useEffect } from 'react';
import api from '../services/api';

const NotificationBell = ({ notifications = [] }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [notifs, setNotifs] = useState(notifications);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('user_token');
            const res = await api.get('/notifications', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setNotifs(res.data.data);
                setUnreadCount(res.data.unread_count);
            }
        } catch (e) {
            console.error('Error fetching notifications:', e);
        }
    };

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('user_token');
            await api.post(`/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifs(prev => prev.map(n => n.id === id ? { ...n, is_read: 1 } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (e) {
            console.error(e);
        }
    };

    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem('user_token');
            await api.post('/notifications/read-all', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifs(prev => prev.map(n => ({ ...n, is_read: 1 })));
            setUnreadCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    const isUnread = (notif) => notif.is_read === 0 || notif.is_read === false;

    const getTypeColor = (type) => {
        switch(type) {
            case 'success': return 'text-emerald-400';
            case 'warning': return 'text-yellow-400';
            case 'installment': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

    const getTypeIcon = (type) => {
        switch(type) {
            case 'success': return '✅';
            case 'installment': return '💰';
            case 'warning': return '⚠️';
            default: return '📢';
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-2 rounded-lg hover:bg-gray-700 transition"
            >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {unreadCount}
                    </span>
                )}
            </button>

            {showDropdown && (
                <>
                    {/* خلفية شفافة للقفل عند النقر بره */}
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowDropdown(false)}
                    ></div>
                    
                    <div className="absolute left-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
                        <div className="flex justify-between items-center p-3 border-b border-gray-700 sticky top-0 bg-gray-800">
                            <h3 className="font-bold text-white">الإشعارات</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead} className="text-xs text-emerald-400 hover:text-emerald-300">
                                    تعليم الكل كمقروء
                                </button>
                            )}
                        </div>

                        {notifs.length === 0 ? (
                            <div className="p-6 text-center text-gray-400">
                                لا توجد إشعارات
                            </div>
                        ) : (
                            notifs.slice(0, 10).map((notif) => (
                                <div
                                    key={notif.id}
                                    onClick={() => markAsRead(notif.id)}
                                    className={`p-3 border-b border-gray-700 cursor-pointer transition ${
                                        isUnread(notif) ? 'bg-gray-700/50' : 'hover:bg-gray-700/30'
                                    }`}
                                >
                                    <div className="flex items-start gap-2">
                                        <span className={`text-lg ${getTypeColor(notif.type)}`}>
                                            {getTypeIcon(notif.type)}
                                        </span>
                                        <div className="flex-1">
                                            <p className={`text-sm ${isUnread(notif) ? 'text-white font-semibold' : 'text-gray-300'}`}>
                                                {notif.title}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">{notif.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(notif.created_at).toLocaleDateString('ar-EG', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        {isUnread(notif) && (
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationBell;