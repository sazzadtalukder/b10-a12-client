import React from 'react';
import useAuth from '../../../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import useAxiosPublic from '../../../../Hook/useAxiosPublic';
import Swal from 'sweetalert2';

const MyTasks = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    
    const { refetch,data: taskInfo = [] } = useQuery({
        queryKey: ['taskInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks?email=${user?.email}`)
            return res.data;
        }

    })

    const sortedMyTask = [...taskInfo.sort((a, b) => new Date(b.completion_date
    ) - new Date(a.completion_date
    ))]

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
                const res = await axiosSecure.get(`/tasks/${id}`)
                const singleTask = res.data;
                const totalPayableCoin = singleTask.required_workers* singleTask.payable_amount;
                const info = {
                    totalPayableCoin: totalPayableCoin
                }
                const resIncrement = await axiosSecure.patch(`/tasksIncrement?email=${user?.email}`,info)
                console.log('increment coin data-->',resIncrement.data)
                const resDelete = await axiosSecure.delete(`/tasks/${id}`)
                if (resDelete.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                    // window.location.reload();
                }

            }
        });

    }
   
    return (
        <div>
            <p>My Task's</p>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>

                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Deadline</th>
                            <th>Payable Amount</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedMyTask && sortedMyTask.map((task, indx) => <tr key={indx}>
                                <th>{indx + 1}</th>
                                <td>{task?.task_title}</td>
                                <td>{task?.completion_date}</td>
                                <td>{task?.payable_amount}</td>
                                <td><button className='btn btn-info'>Update</button></td>
                                <td><button onClick={() => handleDelete(task?._id)} className='btn btn-error'>Delete</button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTasks;