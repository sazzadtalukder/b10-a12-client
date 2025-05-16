import React from 'react';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { refetch: re, data: totalUser = [] } = useQuery({
        queryKey: ['totalUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/totalUser`)
            return res.data;
        }

    })
    console.log(totalUser)
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
                const resDelete = await axiosSecure.delete(`/totalUser/${id}`)
                console.log(resDelete?.data)
                if (resDelete.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    re();

                }


            }
        });
    }
    
    const handleUpdate = async (e,id) => {
        const info = {
            role : e.target.value
        }
        const resStatusUpdate = await axiosSecure.patch(`/updateRole/${id}`,info)
        console.log('status change  data-->', resStatusUpdate.data)
        if(resStatusUpdate.data?.modifiedCount){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your role has been changed",
                showConfirmButton: false,
                timer: 1500
              });
              re();   
        }
        re();   
    }
    return (
        <div>
            {/* display_name, user_email, photo_url, role , coin and some actionable button */}

            <p className="text-xl md:text-2xl font-bold text-center sm:text-left">Manage Users</p>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">

                        <thead>

                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Name</th>
                               
                                <th>Coin</th>
                                <th>Role</th>
                                <th>Remove</th>
                                <th>Change Role</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                totalUser && totalUser?.map((task, indx) => <tr key={indx}>
                                    <th>
                                        {indx + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={task?.photoURL}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{task?.name}</div>
                                                <div className="text-sm opacity-50">{task?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    
                                    <td>{task?.coin}</td>
                                    <td>{task?.role}</td>
                                    <td><button onClick={() => handleDelete(task?._id)} className='btn btn-error'>Delete</button></td>
                                    <td>
                                        {/* <button onClick={() => handleUpdate(task?._id)} className='btn btn-error'>Update Role</button> */}
                                        <select  onChange={(e)=>handleUpdate(e,task?._id)} defaultValue="Pick a role" className="select select-primary">
                                            <option disabled={true}>Pick a role</option>
                                            <option value='admin'>Admin</option>
                                            <option value='buyer'>Buyer</option>
                                            <option value='worker'>Worker</option>
                                        </select>
                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
