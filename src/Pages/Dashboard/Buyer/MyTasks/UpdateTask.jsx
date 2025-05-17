import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { FaUtensils } from 'react-icons/fa';

const UpdateTask = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const { refetch, data: taskInfo } = useQuery({
        queryKey: ['taskInfo'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/${id}`);
            return res.data;
        },
    });
    console.log(taskInfo)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        const taskItem = {
            task_title: data?.task_title,
            task_detail: data?.task_detail,
            submission_info: data?.submission_info,
        }
        const taskRes = await axiosSecure.patch(`/taskUpdate/${id}`, taskItem);
        console.log(taskRes.data)
        if (taskRes.data.modifiedCount) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your Task has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }

        navigate('/dashboard/myTasks')

    };
    return (
        <div>
            <p>Update Your Task</p>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                        <label className="label">Task Title</label>
                        <input defaultValue={taskInfo?.task_title} type="text" className="input w-full" placeholder="Task Title" {...register("task_title", { required: true })} />
                        <label className="label">Task Detail</label>
                        <textarea defaultValue={taskInfo?.task_detail} className="textarea" placeholder="Task Detail" {...register("task_detail", { required: true })}></textarea>

                        <label className="label">Submission info </label>
                        <textarea defaultValue={taskInfo?.submission_info} className="textarea" placeholder="Submission info" {...register("submission_info", { required: true })}></textarea>

                        <button type='submit' className='btn '>Update Task<FaUtensils /></button>
                    </fieldset>




                </form>
            </div>
        </div>
    );
};

export default UpdateTask;