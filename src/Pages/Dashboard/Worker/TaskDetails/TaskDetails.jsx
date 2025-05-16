// import React from 'react';
// import { useLoaderData, useParams } from 'react-router-dom';
// import useAxiosPublic from '../../../../Hook/useAxiosPublic';
// import useAxiosSecure from '../../../../Hook/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../../Hook/useAuth';
// import Swal from 'sweetalert2';

// const TaskDetails = () => {
//     // const task = useLoaderData();
//     // console.log(task)
//     const { id } = useParams();
//     console.log(id)
//     const { user } = useAuth()
//     const axiosSecure = useAxiosSecure();
//     const { refetch, data: task = {} } = useQuery({
//         queryKey: 'task',
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/taskDetails/${id}`)
//             return res.data
//         }
//     })
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const info = e.target.submissionDetails.value
//         console.log(info)
//         // task_id, task_title, payable_amount, worker_email, submission_details , worker_name , Buyer_name, Buyer_email, current_date, and a status ( pending ). 
//         const submittedInfo = {
//             task_id: task?._id,
//             task_title: task?.task_title,
//             payable_amount: task?.payable_amount,
//             worker_email: user?.email,
//             worker_name: user?.displayName,
//             Buyer_name: task?.Buyer_name,
//             Buyer_email: task?.email,
//             submission_details: info,
//             current_date: new Date().toISOString(),
//             status: 'pending'

//         }
//         const res = await axiosSecure.post(`/taskSubmitted`, submittedInfo)
//         console.log(res.data)
//         if (res?.data?.insertedId) {
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Your work has been saved",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         }
//     }
//     console.log(task)
//     return (
//         <div>

//             <div>
//                 <div className="hero bg-base-200 min-h-screen">
//                     <div className="hero-content flex-col lg:flex-row">
//                         <img
//                             src={task?.task_image_url}
//                         />
//                         <div>
//                             <p className="py-6">
//                                 {task?.task_title}
//                             </p>
//                             <p className="py-6">
//                                 Task Detail:{task?.task_detail}
//                             </p>
                           
//                             <p className="py-6">
//                                 Deadline: {task?.completion_date}
//                             </p>
                            
//                             <p className="py-6">
//                                 Payable amount: {task?.payable_amount}
//                             </p>
//                             <p className="py-6">
//                                 Required workers: {task?.required_workers}
//                             </p>
//                             <p className="text-5xl font-bold">{task?.Buyer_name}</p>
//                             <p className="py-6">
//                                 Buyer email: {task?.email}
//                             </p>
//                             <p className="py-6">
//                                 Submission info: {task?.submission_info}
//                             </p>
                            

//                             {/* <button className="btn btn-primary">Get Started</button> */}
//                         </div>
//                     </div>
//                 </div>
//                 <div>
//                     <form action="" onSubmit={handleSubmit}>
//                         {/* <label className="label">Email</label> */}
//                         <textarea name='submissionDetails' className="textarea" placeholder="Submission Details"></textarea>
//                         <input type="submit" value="Submit" />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskDetails;
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../Hook/useAuth';
import Swal from 'sweetalert2';

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: task = {}, isLoading } = useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/taskDetails/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = e.target.submissionDetails.value;

    const submittedInfo = {
      task_id: task?._id,
      task_title: task?.task_title,
      payable_amount: task?.payable_amount,
      worker_email: user?.email,
      worker_name: user?.displayName,
      Buyer_name: task?.Buyer_name,
      Buyer_email: task?.email,
      submission_details: info,
      current_date: new Date().toISOString(),
      status: 'pending',
    };

    const res = await axiosSecure.post(`/taskSubmitted`, submittedInfo);
    if (res?.data?.insertedId) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been submitted',
        showConfirmButton: false,
        timer: 1500,
      });
      e.target.reset();
    }
  };

  if (isLoading) {
    return <p className="text-center mt-20 text-lg text-gray-500">Loading task details...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Task Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-10 flex flex-col lg:flex-row gap-8">
        <img
          src={task?.task_image_url}
          alt={task?.task_title}
          className="w-full lg:w-1/2 h-64 object-cover rounded-xl"
        />
        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-bold text-blue-700">{task?.task_title}</h2>
          <p className="text-gray-600">{task?.task_detail}</p>
          <div className="text-sm space-y-1 text-gray-700">
            <p><strong>Deadline:</strong> {task?.completion_date}</p>
            <p><strong>Payable Amount:</strong> ${task?.payable_amount}</p>
            <p><strong>Required Workers:</strong> {task?.required_workers}</p>
            <p><strong>Buyer Name:</strong> {task?.Buyer_name}</p>
            <p><strong>Buyer Email:</strong> {task?.email}</p>
            <p><strong>Submission Instructions:</strong> {task?.submission_info}</p>
          </div>
        </div>
      </div>

      {/* Submission Form */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Submit Your Work</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="submissionDetails"
            rows="5"
            placeholder="Enter your submission details or proof here..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <input
            type="submit"
            value="Submit Task"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
          />
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
