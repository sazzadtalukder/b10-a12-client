import React from 'react';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageTasks = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { refetch: re, data: totalTask = [] } = useQuery({
        queryKey: ['totalTask'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/totalTask`)
            return res.data;
        }

    })
    console.log(totalTask)
    const handleDelete = (id) => {

        // console.log(res.data)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // const res = await axiosSecure.get(`/tasks/${id}`)
                // const singleTask = res.data;
                // const totalPayableCoin = singleTask.required_workers * singleTask.payable_amount;
                // const info = {
                //     totalPayableCoin: totalPayableCoin
                // }
                // const resIncrement = await axiosSecure.patch(`/tasksIncrement?email=${user?.email}`, info)
                // console.log('increment coin data-->', resIncrement.data)
                const resDelete = await axiosSecure.delete(`/tasks/${id}`)
                if (resDelete.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    re();

                    // window.location.reload();
                }


            }
        });
    }

    return (
        <div>
            <p className="text-xl md:text-2xl font-bold text-center sm:text-left">Manage Tasks</p>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">

                        <thead>

                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Title</th>
                                <th>Required Worker</th>
                                <th>Payable Amount</th>
                                <th>End Date</th>
                                <th>Delete</th>

                                
                            </tr>
                        </thead>
                        <tbody>

                            {
                                totalTask && totalTask?.map((task, indx) => <tr key={indx}>
                                    <th>
                                        {indx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={task?.task_image_url}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{task?.task_title}</div>
                                                {/* <div className="text-sm opacity-50">{task?.email}</div> */}
                                            </div>
                                        </div>
                                    </td>


                                    <td>{task?.required_workers}</td>
                                    <td>{task?.payable_amount}</td>
                                    <td>{task?.completion_date}</td>
                                    <td><button onClick={() => handleDelete(task?._id)} className='btn btn-error'>Delete</button></td>
                                    
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageTasks;
