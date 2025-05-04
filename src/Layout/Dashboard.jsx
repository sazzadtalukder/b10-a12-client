import React from 'react';
import useAuth from '../Hook/useAuth';
import { FaBell } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hook/useAxiosSecure';

const Dashboard = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const {refetch, data: userInfo = {} } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data;
        }

    })
    if(1)
        refetch();
    console.log('dashboard ', userInfo)
    const isAdmin = true;
    const isWorker = true;
    const isBuyer = true;
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div>
                    <h2><Link to='/'>MicroWorker</Link></h2>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex items-center gap-2'>
                        <p>Coin : {userInfo?.coin} | </p>
                        <span><img src={user?.photoURL} alt="" className='w-10 h-10 rounded-full' /></span></div>
                    <div className='flex items-center gap-2'>
                        <p className='uppercase'>{userInfo?.role} | </p>
                        <span>{user?.displayName}</span>
                    </div>
                </div>
                <div >

                    <span><FaBell /></span>
                    <p>Notification</p>
                </div>
            </div>
            <section className='flex'>
                <div className='w-64 min-h-screen bg-orange-400 '>
                    {/* dashboard for admin */}
                {
                    
                    userInfo?.role == 'admin' && <>
                         <ul className='menu p-4 w-full'><li><NavLink to='/dashboard/adminHome'>Admin Home</NavLink></li>
                        <li>  <NavLink to='/dashboard/manageUsers'>Manage Users</NavLink></li>
                        <li> <NavLink to='/dashboard/manageTask'>Manage Task</NavLink></li></ul>
                    </>
                }
                {/* dashboard for worker  */}
                {
                    userInfo?.role == 'worker' && <>
                       <ul className='menu p-4 w-full'>
                       <li><NavLink to='/dashboard/workerHome'>Worker Home</NavLink></li>
                        <li>  <NavLink to='/dashboard/taskList'>TaskList</NavLink></li>
                        <li>   <NavLink to='/dashboard/mySubmissions'>My Submissions</NavLink></li>
                        <li>  <NavLink to='/dashboard/withdrawals'>withdrawals</NavLink></li>
                       </ul>
                    </>
                }

                {/* dashboard for buyer  */}
                {
                    userInfo?.role == 'buyer' && <>
                        <ul className='menu p-4 w-full'>
                        <li> <NavLink to='/dashboard/buyerHome'>Buyer Home</NavLink></li>
                        <li><NavLink to='/dashboard/addNewTasks'>Add new Tasks</NavLink></li>
                        <li><NavLink to='/dashboard/myTasks'>My Task’s</NavLink></li>
                        <li><NavLink to='/dashboard/purchaseCoin'>Purchase Coin</NavLink></li>
                        </ul>

                    </>
                }
                </div>

                <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>

            </section>
            
        </div>
    );
};

export default Dashboard;