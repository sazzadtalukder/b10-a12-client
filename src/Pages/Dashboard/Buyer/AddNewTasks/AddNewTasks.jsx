import React from 'react';
import useAxiosPublic from '../../../../Hook/useAxiosPublic';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useInfo from '../../../../Hook/useInfo';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../Hook/useAuth';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api =`https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddNewTasks = () => {
    const userInfo = useInfo();
    const navigate = useNavigate()
    const {user} = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure()
    const onSubmit =async( data) => {
        console.log(data);
        const imageFile = {image: data.task_image_url[0]}
        const res = await axiosPublic.post(image_hosting_api,imageFile,{
            headers: {
                "content-type":"multipart/form-data"
            }
        })
        
        // console.log(res.data)
        if(res.data?.success){
            const taskItem = {
                task_title: data?.task_title,
                task_detail: data?.task_detail,
                required_workers: Number(data?.required_workers),
                payable_amount: Number(data?.payable_amount),
                completion_date : data?.completion_date ,
                submission_info: data?.submission_info,
                task_image_url: res.data?.data?.display_url,
                email:user?.email,
                Buyer_name: user?.displayName
            }
            const totalPayableAmount = data.required_workers*data.payable_amount;
           if(totalPayableAmount>userInfo.coin){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Not available Coin.  Purchase Coin",
                // footer: '<a href="#">Why do I have this issue?</a>'
              });
              navigate('/')
           }
           else{
                const taskRes = await axiosSecure.post('/tasks',taskItem);
                console.log(taskRes.data)
                if(taskRes.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Task has been saved",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                const coinAmount = {
                    totalPayableAmount: totalPayableAmount
                }
                // console.log(totalPayableAmount)
                const coinUpdateRes = await axiosSecure.patch(`/tasks?email=${user?.email}`,coinAmount);
                console.log(coinUpdateRes.data.modifiedCount)
                navigate('/dashboard/myTasks')
           }
            // const taskRes = await axiosSecure.post('/menu',menuItem)
            // console.log(taskRes.data)
            
        }
    };
    return (
        <div>
             <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                        <label className="label">Task Title</label>
                        <input type="text" className="input w-full" placeholder="Task Title" {...register("task_title", {required: true})} />
                        <label className="label">Task Detail</label>
                        <textarea className="textarea" placeholder="Task Detail" {...register("task_detail", {required: true})}></textarea>
                        <label className="label">Total Worker</label>
                        <input type="number" className="input w-full" placeholder="Total number of workers" {...register("required_workers", {required: true})} />
                        <label className="label">Amount for each worker</label>
                        <input type="number" className="input w-full" placeholder="Amount pay to each worker" {...register("payable_amount", {required: true})} />
                        <label className="label">Deadline for completing task</label>
                        <input type="date" className="input w-full" placeholder="Deadline" {...register("completion_date", {required: true})} />
                        
                        <label className="label">Submission info </label>
                        <textarea className="textarea" placeholder="Submission info" {...register("submission_info", {required: true})}></textarea>
                        <label className="label">Task Image </label>
                        <input type="file" className="file-input"  {...register("task_image_url", {required: true})}/>
                        <button type='submit' className='btn '>Add Task<FaUtensils/></button>
                    </fieldset>



                    
                </form>
            </div>
        </div>
    );
};

export default AddNewTasks;