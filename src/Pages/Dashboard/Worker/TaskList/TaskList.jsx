// import React from 'react';
// import useAxiosSecure from '../../../../Hook/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';

// const TaskList = () => {
//     const axiosSecure = useAxiosSecure();
//     const { refetch, data: taskList = []} = useQuery({
//         queryKey: ['taskList'],
//         queryFn: async ()=>{
//             const res = await axiosSecure.get('/tasksGreater')
//             return res.data
//         }
//     })
//     console.log(taskList)
//     // axiosSecure.get('/tasksGreater')
//     // .then(res=>console.log('task where required worker more than 0',res.data))
//     return (
//         <div>
//             <p>Task List</p>
//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
//             {
//                 taskList.map((task,index)=><div className="card bg-base-100 shadow-sm" key={index}>
//                 <figure>
//                     <img
//                         src={task?.task_image_url}
//                         alt="Task" />
//                 </figure>
//                 <div className="card-body">
//                     <h2 className="card-title">{task?.task_title}</h2>
//                    <p>Deadline: {task?.completion_date}</p>
//                    <p>Payable Amount: {task?.payable_amount}</p>
//                    <p>Required Worker: {task?.required_workers}</p>
//                    <p>Buyer Name: {task?.Buyer_name}</p>
//                     <div className="card-actions justify-end">
//                         <Link to={`/dashboard/taskDetails/${task?._id}`}><button className="btn btn-primary">View Details</button></Link>
//                     </div>
//                 </div>
//             </div>)
//             }
//             </div>
//         </div>
//     );
// };

// export default TaskList;
import React from 'react';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const axiosSecure = useAxiosSecure();

  const { data: taskList = [], isLoading } = useQuery({
    queryKey: ['taskList'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tasksGreater');
      return res.data;
    },
  });

  return (
    <div className="px-4 py-8 lg:px-12">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-blue-600 mb-2">Available Micro Tasks</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Pick a task, complete it, and earn coins. All tasks are verified and time-bound.
        </p>
      </div>

      {/* Loading or Empty States */}
      {isLoading ? (
        <p className="text-center text-lg text-gray-500">Loading tasks...</p>
      ) : taskList.length === 0 ? (
        <p className="text-center text-lg text-gray-400">No tasks currently available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {taskList.map((task, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02]"
            >
              {/* Image */}
              <img
                src={task?.task_image_url}
                alt={task?.task_title}
                className="w-full h-48 object-cover"
              />

              {/* Card Body */}
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{task?.task_title}</h3>

                <div className="flex items-center gap-2 flex-wrap text-sm text-gray-600">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    Deadline: {task?.completion_date}
                  </span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    ${task?.payable_amount}
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                    {task?.required_workers} Worker(s)
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  <strong>Buyer:</strong> {task?.Buyer_name}
                </p>

                <div className="text-right mt-4">
                  <Link to={`/dashboard/taskDetails/${task?._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
