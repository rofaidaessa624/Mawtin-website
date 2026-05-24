import React, { useState } from 'react';

interface Notification {
    type: string;
    title: string;
    message: string;
    days_left?: number;
}

interface NotificationBellProps {
    notifications: Notification[];
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.length;

    const getNotificationIcon = (type: string) => {
        switch(type) {
            case 'installment_reminder':
                return '💰';
            case 'unit_update':
                return '🏠';
            default:
                return '🔔';
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition"
                aria-label="الإشعارات"
            >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                    <div className="p-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-800">الإشعارات</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notif, idx) => (
                                <div key={idx} className="p-3 border-b border-gray-100 hover:bg-gray-50 transition">
                                    <div className="flex items-start gap-2">
                                        <span className="text-xl">{getNotificationIcon(notif.type)}</span>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{notif.title}</p>
                                            <p className="text-sm text-gray-600">{notif.message}</p>
                                            {notif.days_left !== undefined && (
                                                <p className="text-xs text-red-500 mt-1">
                                                    ⏰ متبقي {notif.days_left} يوم
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-gray-500">
                                📭 لا توجد إشعارات جديدة
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;