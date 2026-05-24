import React, { useState } from 'react';
import api from '../services/api';

const ImageComments = ({ unitId, images }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setLoading(true);
        setMessage('');

        try {
            await api.post('/comments', {
                unit_id: unitId,
                image_url: selectedImage,
                comment: comment
            });
            setMessage('✅ تم إضافة تعليقك بنجاح');
            setComment('');
            setSelectedImage(null);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('❌ حدث خطأ في إضافة التعليق');
        } finally {
            setLoading(false);
        }
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">صور الوحدة</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`cursor-pointer border-2 rounded-lg overflow-hidden transition ${selectedImage === img ? 'border-indigo-500 shadow-lg' : 'border-transparent'}`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img
                            src={img}
                            alt={`صورة ${idx + 1}`}
                            className="w-full h-32 object-cover hover:opacity-75 transition"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                            }}
                        />
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                        <img 
                            src={selectedImage} 
                            alt="الصورة المختارة" 
                            className="w-40 h-40 object-cover rounded shadow"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                            }}
                        />
                        <div className="flex-1">
                            <form onSubmit={handleSubmitComment}>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="اكتب تعليقك على هذه الصورة..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    rows={3}
                                />
                                <div className="flex justify-end mt-2 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedImage(null)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
                                    >
                                        {loading ? 'جاري الإرسال...' : 'إرسال التعليق'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {message && (
                        <div className={`p-2 rounded text-center ${message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageComments;