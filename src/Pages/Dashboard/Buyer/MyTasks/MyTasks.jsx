// import React from 'react';
// import useAuth from '../../../../Hook/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../../Hook/useAxiosSecure';
// import useAxiosPublic from '../../../../Hook/useAxiosPublic';
// import Swal from 'sweetalert2';
// import useInfo from '../../../../Hook/useInfo';

// const MyTasks = () => {
//     const { user } = useAuth()
//     const axiosSecure = useAxiosSecure()
//     const axiosPublic = useAxiosPublic()
//     const [refetch,] = useInfo()
//     const {refetch: taskRefresh, data: taskInfo = [] } = useQuery({
//         queryKey: ['taskInfo', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/tasks?email=${user?.email}`)
//             return res.data;
//         }

//     })

//     const sortedMyTask = [...taskInfo.sort((a, b) => new Date(b.completion_date
//     ) - new Date(a.completion_date
//     ))]

//     const handleDelete = (id) => {

//         // console.log(res.data)

//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!"
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 const res = await axiosSecure.get(`/tasks/${id}`)
//                 const singleTask = res.data;
//                 const totalPayableCoin = singleTask.required_workers* singleTask.payable_amount;
//                 const info = {
//                     totalPayableCoin: totalPayableCoin
//                 }
//                 const resIncrement = await axiosSecure.patch(`/tasksIncrement?email=${user?.email}`,info)
//                 console.log('increment coin data-->',resIncrement.data)
//                 const resDelete = await axiosSecure.delete(`/tasks/${id}`)
//                 if (resDelete.data.deletedCount) {
//                     Swal.fire({
//                         title: "Deleted!",
//                         text: "Your file has been deleted.",
//                         icon: "success"
//                     });
//                     refetch();
//                     taskRefresh();
//                     // window.location.reload();
//                 }

//             }
//         });

//     }
   
//     return (
//         <div>
//             <p>My Task's</p>
//             <div className="overflow-x-auto">
//                 <table className="table">

//                     <thead>

//                         <tr>
//                             <th>#</th>
//                             <th>Title</th>
//                             <th>Deadline</th>
//                             <th>Payable Amount</th>
//                             <th>Update</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             sortedMyTask && sortedMyTask.map((task, indx) => <tr key={indx}>
//                                 <th>{indx + 1}</th>
//                                 <td>{task?.task_title}</td>
//                                 <td>{task?.completion_date}</td>
//                                 <td>{task?.payable_amount}</td>
//                                 <td><button className='btn btn-info'>Update</button></td>
//                                 <td><button onClick={() => handleDelete(task?._id)} className='btn btn-error'>Delete</button></td>
//                             </tr>)
//                         }


//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default MyTasks;
import React from 'react';
import useAuth from '../../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import useAxiosPublic from '../../../../Hook/useAxiosPublic';
import Swal from 'sweetalert2';
import useInfo from '../../../../Hook/useInfo';

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [refetch] = useInfo();

  const { refetch: taskRefresh, data: taskInfo = [] } = useQuery({
    queryKey: ['taskInfo', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks?email=${user?.email}`);
      return res.data;
    },
  });

  const sortedMyTask = [...taskInfo].sort(
    (a, b) => new Date(b.completion_date) - new Date(a.completion_date)
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.get(`/tasks/${id}`);
        const singleTask = res.data;

        const totalPayableCoin =
          singleTask.required_workers * singleTask.payable_amount;

        const info = {
          totalPayableCoin: totalPayableCoin,
        };

        const resIncrement = await axiosSecure.patch(
          `/tasksIncrement?email=${user?.email}`,
          info
        );

        const resDelete = await axiosSecure.delete(`/tasks/${id}`);
        if (resDelete.data.deletedCount) {
          Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
          refetch();
          taskRefresh();
        }
      }
    });
  };
const handleUpdate= (id)=>{
  console.log(id)
}
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Deadline</th>
              <th className="px-4 py-3 text-left">Payable Amount</th>
              <th className="px-4 py-3 text-left">Update</th>
              <th className="px-4 py-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedMyTask.length > 0 ? (
              sortedMyTask.map((task, idx) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{task?.task_title}</td>
                  <td className="px-4 py-2">{task?.completion_date}</td>
                  <td className="px-4 py-2">${task?.payable_amount}</td>
                  <td className="px-4 py-2">
                    <button className="btn btn-sm btn-info" onClick={()=>handleUpdate(task._id)}>Update</button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(task?._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;
