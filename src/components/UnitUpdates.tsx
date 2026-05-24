import React from 'react';

interface UnitUpdate {
    id: number;
    update_text: string;
    images: string[] | null;
    created_at: string;
}

interface UnitUpdatesProps {
    updates: UnitUpdate[];
    unitNumber: string;
}

const UnitUpdates: React.FC<UnitUpdatesProps> = ({ updates, unitNumber }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">تطورات الوحدة {unitNumber}</h2>
            {updates && updates.length > 0 ? (
                <div className="space-y-4">
                    {updates.map((update, index) => (
                        <div key={update.id || index} className="border-b border-gray-200 pb-4 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm text-gray-500">
                                    {new Date(update.created_at).toLocaleDateString('ar-EG')}
                                </span>
                            </div>
                            <p className="text-gray-700">{update.update_text}</p>
                            {update.images && update.images.length > 0 && (
                                <div className="flex gap-2 mt-2 flex-wrap">
                                    {update.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={`تحديث ${idx + 1}`}
                                            className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-75 transition"
                                            onClick={() => window.open(img, '_blank')}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    لا توجد تطورات للوحدة حتى الآن
                </div>
            )}
        </div>
    );
};

export default UnitUpdates;