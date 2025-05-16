// import React from 'react';
// import useAuth from '../../../../Hook/useAuth';
// import useAxiosSecure from '../../../../Hook/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const AdminHome = () => {
//     const { user } = useAuth()
//     const axiosSecure = useAxiosSecure()
//     const { refetch, data: totalUser = [] } = useQuery({
//         queryKey: ['totalUser', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/totalUser?email=${user?.email}`)
//             return res.data;
//         }

//     })
//     const { refetch: refetch1, data: totalWorker = [] } = useQuery({
//         queryKey: ['totalWorker', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/totalWorker?email=${user?.email}`)
//             return res.data;
//         }

//     })
//     const { refetch: refetch2, data: totalBuyer = [] } = useQuery({
//         queryKey: ['totalBuyer', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/totalBuyer?email=${user?.email}`)
//             return res.data;
//         }

//     })
//     const { refetch: refetch3, data: totalAmount = [] } = useQuery({
//         queryKey: ['totalAmount', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/totalAmount`)
//             return res.data;
//         }

//     })

//     const { refetch: refetch4, data: totalRequest = [] } = useQuery({
//         queryKey: ['totalRequest', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/totalRequest`)
//             return res.data;
//         }

//     })
//     const totalPayments = totalAmount?.reduce((accu, current) => accu + (current?.price || 0), 0)
//     // console.log(totalRequest)
//     const totalCoin = totalUser?.reduce((accu, current) => accu + (current?.coin || 0), 0)
//     const handleSuccess = async (id) => {
//         const res = await axiosSecure.get(`/totalRequest/${id}`)
//         const singleWithdraw = res.data;
        
//         console.log(singleWithdraw)
//         const info = {
//             payable_amount: singleWithdraw?.withdrawal_amount*10,
//             worker_email: singleWithdraw?.worker_email

//         }
//         const resStatusApprove = await axiosSecure.patch(`/updateApprove/${id}`)
//         console.log('status change  data-->', resStatusApprove.data)
//         refetch4();
//         // modifiedCount
//         const resCoinDecrease = await axiosSecure.patch(`/decreaseCoin`, info)
//         console.log('Coin   data-->', resCoinDecrease.data)
       
//     }
//     return (
//         <div>
//             <p>Admin Home</p>
//             <div>
//                 <p>Total worker: {totalWorker.length}</p>
//                 <p>Total buyer: {totalBuyer.length}</p>
//                 <p>Total coin: {totalCoin}</p>
//                 <p>Total Payment : {totalPayments}</p>
//             </div>
//             <div>
//                 <div className="overflow-x-auto">
//                     <table className="table">

//                         <thead>

//                             <tr>
//                                 <th>#</th>
//                                 <th>Worker Name</th>
//                                 <th>Withdrawal amount</th>
//                                 <th>Payment system</th>
//                                 <th>Status</th>
//                                 <th>Action</th>

//                             </tr>
//                         </thead>
//                         <tbody>

//                             {
//                                 totalRequest && totalRequest?.map((task, indx) => <tr key={indx}>
//                                     <th>{indx + 1}</th>
//                                     <td>{task?.worker_name}</td>
//                                     <td>{task?.withdrawal_amount}</td>
//                                     <td>{task?.payment_system}</td>
//                                     <td>{task?.status}</td>
//                                     <td><button onClick={() => handleSuccess(task?._id)} className='btn btn-info'>Make Success</button></td>

//                                 </tr>)
//                             }


//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminHome;



import React from 'react';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Queries (React Query v5 object syntax)
  const { data: totalUser = [] } = useQuery({
    queryKey: ['totalUser', user?.email],
    queryFn: async () => (await axiosSecure.get(`/totalUser?email=${user?.email}`)).data,
  });

  const { data: totalWorker = [] } = useQuery({
    queryKey: ['totalWorker', user?.email],
    queryFn: async () => (await axiosSecure.get(`/totalWorker?email=${user?.email}`)).data,
  });

  const { data: totalBuyer = [] } = useQuery({
    queryKey: ['totalBuyer', user?.email],
    queryFn: async () => (await axiosSecure.get(`/totalBuyer?email=${user?.email}`)).data,
  });

  const { data: totalAmount = [] } = useQuery({
    queryKey: ['totalAmount'],
    queryFn: async () => (await axiosSecure.get(`/totalAmount`)).data,
  });

  const { data: totalRequest = [], refetch: refetchRequest } = useQuery({
    queryKey: ['totalRequest'],
    queryFn: async () => (await axiosSecure.get(`/totalRequest`)).data,
  });

  // Calculations
  const totalPayments = totalAmount?.reduce((acc, item) => acc + (item?.price || 0), 0);
  const totalCoin = totalUser?.reduce((acc, item) => acc + (item?.coin || 0), 0);

  // Success Handler
  const handleSuccess = async (id) => {
    const res = await axiosSecure.get(`/totalRequest/${id}`);
    const singleWithdraw = res.data;

    const info = {
      payable_amount: singleWithdraw?.withdrawal_amount * 10,
      worker_email: singleWithdraw?.worker_email,
    };

    await axiosSecure.patch(`/updateApprove/${id}`);
    await axiosSecure.patch(`/decreaseCoin`, info);
    refetchRequest();
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl md:text-2xl font-bold text-center sm:text-left">User summary</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Workers', value: totalWorker.length, color: 'text-orange-500' },
          { title: 'Total Buyers', value: totalBuyer.length, color: 'text-green-500' },
          { title: 'Total Available Coins', value: totalCoin, color: 'text-blue-500' },
          { title: 'Total Payments', value: `$${totalPayments.toFixed(2)}`, color: 'text-purple-500' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg p-4 text-center">
            <p className="text-base sm:text-lg font-semibold">{stat.title}</p>
            <p className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div>
      <h3 className="text-xl md:text-2xl font-bold sm:text-left py-5">Withdraw Request</h3>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        
        <table className="min-w-full text-sm sm:text-base text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs sm:text-sm">
            
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Payment System</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {totalRequest.map((task, index) => (
              <tr key={task._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{task?.worker_name}</td>
                <td className="px-4 py-2">{task?.withdrawal_amount}</td>
                <td className="px-4 py-2">{task?.payment_system}</td>
                <td className="px-4 py-2">{task?.status}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSuccess(task?._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Make Success
                  </button>
                </td>
              </tr>
            ))}
            {totalRequest.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No withdrawal requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
