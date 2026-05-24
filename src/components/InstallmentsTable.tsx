import React from 'react';

interface Installment {
    id: number;
    installment_number: number;
    amount: number;
    due_date: string;
    paid_date: string | null;
    status: 'paid' | 'pending' | 'overdue';
    notes: string | null;
    updated_at: string;
    paid_amount: number;
}

interface InstallmentsTableProps {
    installments: Installment[];
    unitNumber: string;
}

const InstallmentsTable: React.FC<InstallmentsTableProps> = ({ installments, unitNumber }) => {
    const getStatusBadge = (status: string) => {
        const statuses = {
            paid: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            overdue: 'bg-red-100 text-red-800'
        };
        const texts = {
            paid: 'مدفوع',
            pending: 'معلق',
            overdue: 'متأخر'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statuses[status as keyof typeof statuses] || statuses.pending}`}>
                {texts[status as keyof typeof texts] || status}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">جدول الأقساط - الوحدة {unitNumber}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم القسط</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المبلغ</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المدفوع</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ الاستحقاق</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ السداد</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {installments.map((installment) => (
                            <tr key={installment.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {installment.installment_number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {Number(installment.amount).toLocaleString()} ج.م
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 font-semibold">
                                    {Number(installment.paid_amount || 0).toLocaleString()} ج.م
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(installment.due_date).toLocaleDateString('ar-EG')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {installment.status === 'paid' 
                                        ? new Date(installment.updated_at).toLocaleDateString('ar-EG')
                                        : 'لم يتم السداد بعد'
                                    }
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(installment.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {installments.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    لا توجد أقساط لعرضها
                </div>
            )}
        </div>
    );
};

export default InstallmentsTable;