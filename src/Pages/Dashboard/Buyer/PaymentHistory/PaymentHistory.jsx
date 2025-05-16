import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';

const PaymentHistory = () => {
    const {user}= useAuth();
    const axiosSecure = useAxiosSecure()
    const {refetch, data: purchaseInfo = [] } = useQuery({
        queryKey: ['purchaseInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/purchaseInfo?email=${user?.email}`)
            return res.data;
        }

    })
    
//    console.log(purchaseInfo)
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 ">#</th>
                            
                            
                            <th className="px-4 py-3 ">Amount</th>
                            <th className="px-4 py-3 ">Coin</th>
                            <th className="px-4 py-3 ">Date</th>
                            <th className="px-4 py-3 ">Transaction ID</th>
                            
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {purchaseInfo.length > 0 ? (
                            purchaseInfo.map((task, idx) => (
                                <tr key={task._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{task?.price}$</td>
                                    <td className="px-4 py-2">{task?.price * 10}</td>
                                    <td className="px-4 py-2">{task?.date.split('T')[0]}</td>
                                    <td className="px-4 py-2">{task?.transactionId}</td>
                                    
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 text-gray-500">
                                    No Purchase found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;