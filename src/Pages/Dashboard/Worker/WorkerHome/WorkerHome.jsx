// import React from 'react';
// import useAuth from '../../../../Hook/useAuth';
// import useAxiosSecure from '../../../../Hook/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const WorkerHome = () => {
//     const { user } = useAuth()
//     const axiosSecure = useAxiosSecure()
//     const {refetch: taskRefresh, data: submittedInfo = [] } = useQuery({
//         queryKey: ['submittedInfo', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/submittedInfo?email=${user?.email}`)
//             return res.data;
//         }

//     })
//     const {refetch, data: pendingInfo = [] } = useQuery({
//         queryKey: ['pendingInfo', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/pendingInfo?email=${user?.email}`)
//             return res.data;
//         }

//     })
//     const {refetch: ref, data: approveInfo = [] } = useQuery({
//         queryKey: ['approveInfo', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/approveInfo?email=${user?.email}`)
//             return res.data;
//         }

//     })
    
//     const totalEarning = approveInfo?.reduce((accu , current)=> accu + current?.payable_amount  , 0)
//     console.log(totalEarning)
//     return (
//         <div>
//             <p>State</p>
//             <div>
//                     <p>Total Submission : {submittedInfo.length}</p>
//                     <p>Total pending submission : {pendingInfo.length}</p>
//                     <p>Total Earning : {totalEarning}</p>
//             </div>
//             <div>
//             <div className="overflow-x-auto">
//                 <table className="table">

//                     <thead>

//                         <tr>
//                             <th>#</th>
//                             <th>Title</th>
//                             <th>Payable Amount</th>
//                             <th>Buyer name</th>
//                             <th>Status</th>
                            
//                         </tr>
//                     </thead>
//                     <tbody>
                  
//                         {
//                             approveInfo && approveInfo?.map((task, indx) => <tr key={indx}>
//                                 <th>{indx + 1}</th>
//                                 <td>{task?.task_title}</td>
//                                 <td>{task?.payable_amount}</td>
//                                 <td>{task?.Buyer_name}</td>
//                                 <td>{task?.status}</td>
                                
//                             </tr>)
//                         }


//                     </tbody>
//                 </table>
//             </div><div className="overflow-x-auto">
//                 <table className="table">

//                     <thead>

//                         <tr>
//                             <th>#</th>
//                             <th>Title</th>
//                             <th>Payable Amount</th>
//                             <th>Buyer name</th>
//                             <th>Status</th>
                            
//                         </tr>
//                     </thead>
//                     <tbody>
                  
//                         {
//                             approveInfo && approveInfo?.map((task, indx) => <tr key={indx}>
//                                 <th>{indx + 1}</th>
//                                 <td>{task?.task_title}</td>
//                                 <td>{task?.payable_amount}</td>
//                                 <td>{task?.Buyer_name}</td>
//                                 <td>{task?.status}</td>
                                
//                             </tr>)
//                         }


//                     </tbody>
//                 </table>
//             </div>
//             </div>
//         </div>
//     );
// };

// export default WorkerHome;
import React from 'react';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const WorkerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: submittedInfo = [] } = useQuery({
    queryKey: ['submittedInfo', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submittedInfo?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: pendingInfo = [] } = useQuery({
    queryKey: ['pendingInfo', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/pendingInfo?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: approveInfo = [] } = useQuery({
    queryKey: ['approveInfo', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approveInfo?email=${user?.email}`);
      return res.data;
    },
  });

  const totalEarning = approveInfo?.reduce(
    (acc, current) => acc + current?.payable_amount,
    0
  );

  return (
    <div className="p-6 space-y-8">
      
      <p className="text-xl md:text-2xl font-bold text-center sm:text-left py-5">Stats</p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <p className="text-lg font-medium">Total Submissions</p>
          <p className="text-2xl font-bold">{submittedInfo.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <p className="text-lg font-medium">Pending Submissions</p>
          <p className="text-2xl font-bold">{pendingInfo.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <p className="text-lg font-medium">Total Earnings</p>
          <p className="text-2xl font-bold">${totalEarning.toFixed(2)}</p>
        </div>
      </div>

      {/* Approved Tasks Table */}
      <div>
      <p className="text-xl md:text-2xl font-bold text-center sm:text-left py-5">Approved Task</p>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="table w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Payable Amount</th>
                <th>Buyer Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {approveInfo.length > 0 ? (
                approveInfo.map((task, index) => (
                  <tr key={task._id} className="hover:bg-gray-50">
                    <td>{index + 1}</td>
                    <td>{task?.task_title}</td>
                    <td>${task?.payable_amount}</td>
                    <td>{task?.Buyer_name}</td>
                    <td className="capitalize">{task?.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No approved tasks yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkerHome;
