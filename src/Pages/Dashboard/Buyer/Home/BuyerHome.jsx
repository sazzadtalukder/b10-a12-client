// import React from 'react';
// import useAxiosSecure from '../../../../Hook/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../../Hook/useAuth';
// import Swal from 'sweetalert2';

// const BuyerHome = () => {
//     const { user } = useAuth()
//     const axiosSecure = useAxiosSecure();
//     const { refetch, data: submittedTask = [] } = useQuery({
//         queryKey: ['submittedTask'],
//         queryFn: async () => {
//             const res = await axiosSecure(`/submittedTask?email=${user?.email}`)
//             return res.data

//         }
//     })
//     const { refetch: refetchAgain, data: totalTask = [] } = useQuery({
//         queryKey: ['totalTask'],
//         queryFn: async () => {
//             const res = await axiosSecure(`/tasks?email=${user?.email}`)
//             return res.data

//         }
//     })
//     const pendingWorker = totalTask.reduce((accu , current)=> accu + current?.required_workers  , 0)
//     const totalPayment = totalTask.reduce((accu , current)=> accu + (current?.required_workers *current?.payable_amount)  , 0)
//     console.log(totalPayment)
//     const handleReject = async (id) => {
//         const res = await axiosSecure.get(`/submittedTask/${id}`)
//         const singleTask = res.data;
//         console.log(singleTask)
//         const info = {
//             status: 'rejected'
//         }
//         const resStatusUpdate = await axiosSecure.patch(`/submittedTask/${id}`, info)
//         console.log('status change  data-->', resStatusUpdate.data.modifiedCount)

//         const resWorkerUpdate = await axiosSecure.patch(`/updateWorker/${singleTask?.task_id}`)
//         console.log('worker required field   data-->', resWorkerUpdate.data)
//         refetch();
//         refetchAgain();
//     }
//     const handleApprove = async (id) => {
//         const res = await axiosSecure.get(`/submittedTask/${id}`)
//         const singleTask = res.data;
//         console.log(singleTask)
//         const info = {
//             payable_amount: singleTask?.payable_amount,
//             worker_email: singleTask?.worker_email

//         }
//         const resStatusUpdate = await axiosSecure.patch(`/updateStatus/${id}`)
//         console.log('status change  data-->', resStatusUpdate.data)
//         // modifiedCount
//         const resCoinUpdate = await axiosSecure.patch(`/updateCoin`, info)
//         console.log('Coin   data-->', resCoinUpdate.data)
//         refetch();
//         refetchAgain();
//     }
//     return (
//         <div>
//             <p>States</p>
//             <div>
//                 <p>Total tasks: {totalTask?.length}</p>
//                 <p>Pending tasks : {pendingWorker}</p>
//                 <p>Total  payment paid : {totalPayment}</p>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Worker Name</th>
//                             <th>Task Title</th>
//                             <th>Payable Amount</th>
//                             <th>View Submission</th>
//                             <th>Approve</th>
//                             <th>Reject</th>
//                         </tr>
//                     </thead>
                    



//                     <tbody>
//                         {
//                             submittedTask && submittedTask?.map((task, indx) => <tr key={indx}>
//                                 <th>{indx + 1}</th>
//                                 <td>{task?.worker_name}</td>
//                                 <td>{task?.task_title}</td>
//                                 <td>{task?.payable_amount}</td>
//                                 <td>

//                                     <button className="'btn btn-error" onClick={() => document.getElementById('my_modal_5').showModal()}>View Details</button>
//                                     <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
//                                         <div className="modal-box">
//                                             <h3 className="font-bold text-lg">Hello!</h3>
            
//                                             <p className="py-4">{task?.task_title}</p>
//                                             <p className="py-4">{task?.submission_details}</p>
//                                             <p className="py-4">{task?.payable_amount}</p>
//                                             <p className="py-4">{task?.worker_name}</p>
//                                             <p className="py-4">{task?.worker_email}</p>
//                                             <p className="py-4">{task?.Buyer_name}</p>
//                                             <p className="py-4">{task?.Buyer_email}</p>
//                                             <p className="py-4">{task?.status}</p>
//                                             <p className="py-4">{task?.submission_details}</p>
//                                             <p className="py-4">Submitted Date: {task?.current_date}</p>
//                                             <div className="modal-action">
//                                                 <form method="dialog">
//                                                     {/* if there is a button in form, it will close the modal */}
//                                                     <button className="btn">Close</button>
//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </dialog>

//                                 </td>

//                                 <td><button onClick={() => handleApprove(task?._id)} className='btn btn-info'>Approve</button></td>
//                                 <td><button onClick={() => handleReject(task?._id)} className='btn btn-error'>Reject</button></td>
//                             </tr>)
//                         }


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default BuyerHome;


import React from 'react';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hook/useAuth';
import Swal from 'sweetalert2';

const BuyerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: submittedTask = [] } = useQuery({
    queryKey: ['submittedTask'],
    queryFn: async () => {
      const res = await axiosSecure(`/submittedTask?email=${user?.email}`);
      return res.data;
    },
  });

  const { refetch: refetchAgain, data: totalTask = [] } = useQuery({
    queryKey: ['totalTask'],
    queryFn: async () => {
      const res = await axiosSecure(`/tasks?email=${user?.email}`);
      return res.data;
    },
  });

  const pendingWorker = totalTask.reduce(
    (acc, curr) => acc + curr?.required_workers,
    0
  );

  const totalPayment = totalTask.reduce(
    (acc, curr) => acc + curr?.required_workers * curr?.payable_amount,
    0
  );

  const handleReject = async (id) => {
    const res = await axiosSecure.get(`/submittedTask/${id}`);
    const singleTask = res.data;

    const info = { status: 'rejected' };
    await axiosSecure.patch(`/submittedTask/${id}`, info);
    await axiosSecure.patch(`/updateWorker/${singleTask?.task_id}`);

    refetch();
    refetchAgain();
  };

  const handleApprove = async (id) => {
    const res = await axiosSecure.get(`/submittedTask/${id}`);
    const singleTask = res.data;

    const info = {
      payable_amount: singleTask?.payable_amount,
      worker_email: singleTask?.worker_email,
    };

    await axiosSecure.patch(`/updateStatus/${id}`);
    await axiosSecure.patch(`/updateCoin`, info);

    refetch();
    refetchAgain();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div>
      <p className="text-xl md:text-2xl font-bold text-center sm:text-left">Summary</p>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="text-sm text-gray-500">Total Task Added</h4>
          <p className="text-xl font-bold text-orange-500">{totalTask?.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="text-sm text-gray-500">Still Required Workers</h4>
          <p className="text-xl font-bold text-blue-500">{pendingWorker}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h4 className="text-sm text-gray-500">Total Payment Paid</h4>
          <p className="text-xl font-bold text-green-600">${totalPayment}</p>
        </div>
      </div>

      {/* Table Section */}
      
      <div className="overflow-x-auto bg-white rounded-xl shadow">
      <div>
      <p className="text-xl md:text-2xl font-bold text-center sm:text-left py-5">Task Review</p>
      </div>
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Task Title</th>
              <th className="px-4 py-3 text-left">Payable Amount</th>
              <th className="px-4 py-3 text-left">View</th>
              <th className="px-4 py-3 text-left">Approve</th>
              <th className="px-4 py-3 text-left">Reject</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submittedTask.map((task, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{task?.worker_name}</td>
                <td className="px-4 py-2">{task?.task_title}</td>
                <td className="px-4 py-2">${task?.payable_amount}</td>
                <td className="px-4 py-2">
                  <button
                    className="btn btn-sm btn-outline btn-info"
                    onClick={() =>
                      document.getElementById(`modal-${idx}`).showModal()
                    }
                  >
                    View
                  </button>
                  <dialog id={`modal-${idx}`} className="modal">
                    <div className="modal-box max-w-lg">
                      <h3 className="text-lg font-bold mb-2">
                        Task: {task?.task_title}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><strong>Submission:</strong> {task?.submission_details}</p>
                        <p><strong>Payable:</strong> ${task?.payable_amount}</p>
                        <p><strong>Worker:</strong> {task?.worker_name} ({task?.worker_email})</p>
                        <p><strong>Buyer:</strong> {task?.Buyer_name} ({task?.Buyer_email})</p>
                        <p><strong>Status:</strong> {task?.status}</p>
                        <p><strong>Date:</strong> {task?.current_date}</p>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleApprove(task?._id)}
                    className="btn btn-sm btn-success"
                  >
                    Approve
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleReject(task?._id)}
                    className="btn btn-sm btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {submittedTask.length === 0 && (
          <p className="p-4 text-center text-gray-500">No submissions yet.</p>
        )}
      </div>
    </div>
  );
};

export default BuyerHome;
