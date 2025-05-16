// import React from 'react';
// import useAuth from '../Hook/useAuth';
// import { FaBell } from 'react-icons/fa';
// import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
// import useAxiosPublic from '../Hook/useAxiosPublic';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../Hook/useAxiosSecure';
// import useInfo from '../Hook/useInfo';

// const Dashboard = () => {
//     const { user } = useAuth()
//     const axiosPublic = useAxiosPublic()
//     const navigate = useNavigate()
//     const axiosSecure = useAxiosSecure()
//     const {refetch, data: coin  } = useQuery({
//         queryKey: ['coin', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users?email=${user?.email}`)
//             const coin = res.data.coin
//             return coin;
//         }

//     })
//     const [,userInfo] = useInfo()
//     if(1)
//         refetch();
//     // console.log('dashboard ', userInfo)
//     const isAdmin = true;
//     const isWorker = true;
//     const isBuyer = true;
//     return (
//         <div>
//             <div className='flex flex-col md:flex-row  justify-between items-center'>
//                 <div>
//                     <h2><Link to='/'>MicroWorker</Link></h2>
//                 </div>
//                 <div className=''>
//                     <div className='flex items-center justify-center gap-2'>
//                         {/* <p>Coin : {userInfo?.coin} | </p> */}
//                         <p>Coin : {coin}</p>
                       
//                         <span><img src={user?.photoURL} alt="" className='w-10 h-10 rounded-full' /></span></div>
//                     <div className='flex items-center gap-2'>
//                         <p className='uppercase'>{userInfo?.role} | </p>
//                         <span>{user?.displayName}</span>
//                     </div>
//                 </div>
//                 <div className='flex gap-2 items-center'>

//                     <span><FaBell /></span>
//                     <p>Notification</p>
//                 </div>
//             </div>
//             <section className='flex flex-col lg:flex-row'>
//                 <div className=' min-h-screen bg-orange-400 '>
//                     {/* dashboard for admin */}
//                 {
                    
//                     userInfo?.role == 'admin' && <>
//                          <ul className='menu p-4 w-full'><li><NavLink to='/dashboard/adminHome'>Admin Home</NavLink></li>
//                         <li>  <NavLink to='/dashboard/manageUsers'>Manage Users</NavLink></li>
//                         <li> <NavLink to='/dashboard/manageTasks'>Manage Tasks</NavLink></li></ul>
//                     </>
//                 }
//                 {/* dashboard for worker  */}
//                 {
//                     userInfo?.role == 'worker' && <>
//                        <ul className='menu p-4 w-full'>
//                        <li><NavLink to='/dashboard/workerHome'>Worker Home</NavLink></li>
//                         <li>  <NavLink to='/dashboard/taskList'>TaskList</NavLink></li>
//                         <li>   <NavLink to='/dashboard/mySubmissions'>My Submissions</NavLink></li>
//                         <li>  <NavLink to='/dashboard/withDrawals'>withdrawals</NavLink></li>
//                        </ul>
//                     </>
//                 }

//                 {/* dashboard for buyer  */}
//                 {
//                     userInfo?.role == 'buyer' && <>
//                         <ul className='menu p-4 w-full'>
//                         <li> <NavLink to='/dashboard/buyerHome'>Buyer Home</NavLink></li>
//                         <li><NavLink to='/dashboard/addNewTasks'>Add new Tasks</NavLink></li>
//                         <li><NavLink to='/dashboard/myTasks'>My Task’s</NavLink></li>
//                         <li><NavLink to='/dashboard/pay'>Purchase Coin</NavLink></li>
//                         </ul>

//                     </>
//                 }
//                 </div>

//                 <div className="flex-1 p-8">
//                 <Outlet></Outlet>
//             </div>

//             </section>
            
//         </div>
//     );
// };

// export default Dashboard;
import React, { useState } from 'react';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useAxiosSecure from '../Hook/useAxiosSecure';
import useAxiosPublic from '../Hook/useAxiosPublic';
import useInfo from '../Hook/useInfo';
import { useQuery } from '@tanstack/react-query';
import useAdmin from '../Hook/useAdmin';


const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [, userInfo] = useInfo();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { refetch, data: coin } = useQuery({
    queryKey: ['coin', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res.data.coin;
    },
  });

  if (userInfo) refetch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [isAdmin] = useAdmin()
  console.log(isAdmin)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md w-full px-4 py-3 flex flex-col lg:flex-row items-center justify-between">
        <div className="flex justify-between items-center w-full lg:w-auto">
          <h2 className="text-xl font-bold text-orange-500">
            <Link to="/">MicroWorker</Link>
          </h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-2xl text-gray-700"
            aria-label="Toggle Sidebar"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* User Info */}
        <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row items-center gap-3 text-sm lg:text-base">
          <div className="flex items-center gap-2">
          {!isAdmin && <p className="text-gray-600 font-medium">Available Coin: {coin}</p>}
            <img
              src={user?.photoURL}
              alt="avatar"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border"
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="uppercase text-gray-500">{userInfo?.role} |</p>
            <span className="font-semibold">{user?.displayName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBell className="text-orange-500" />
            <span>Notification</span>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 relative">
        {/* Sidebar Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`bg-orange-400 text-white w-64 lg:static fixed top-0 left-0 h-full z-40 p-4 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <nav className="space-y-3 mt-10">
            {userInfo?.role === 'admin' && (
              <>
                {/* <NavItem to="/dashboard/adminHome" label="Admin Home" onClick={toggleSidebar} /> */}
                <NavItem to="/dashboard/adminHome" label="Admin Home" onClick={toggleSidebar} />
                <NavItem to="/dashboard/manageUsers" label="Manage Users" onClick={toggleSidebar} />
                <NavItem to="/dashboard/manageTasks" label="Manage Tasks" onClick={toggleSidebar} />
              </>
            )}
            {userInfo?.role === 'worker' && (
              <>
                <NavItem to="/dashboard/workerHome" label="Worker Home" onClick={toggleSidebar} />
                <NavItem to="/dashboard/taskList" label="Task List" onClick={toggleSidebar} />
                <NavItem to="/dashboard/mySubmissions" label="My Submissions" onClick={toggleSidebar} />
                <NavItem to="/dashboard/withDrawals" label="Withdrawals" onClick={toggleSidebar} />
              </>
            )}
            {userInfo?.role === 'buyer' && (
              <>
                <NavItem to="/dashboard/buyerHome" label="Buyer Home" onClick={toggleSidebar} />
                <NavItem to="/dashboard/addNewTasks" label="Add New Tasks" onClick={toggleSidebar} />
                <NavItem to="/dashboard/myTasks" label="My Tasks" onClick={toggleSidebar} />
                <NavItem to="/dashboard/pay" label="Purchase Coin" onClick={toggleSidebar} />
                <NavItem to="/dashboard/paymentHistory" label="Payment History" onClick={toggleSidebar} />
              </>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Reusable NavItem component
const NavItem = ({ to, label, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded transition-all ${
        isActive ? 'bg-orange-500 font-semibold' : 'hover:bg-orange-300'
      }`
    }
    onClick={() => window.innerWidth < 1024 && onClick()}
  >
    {label}
  </NavLink>
);

export default Dashboard;
