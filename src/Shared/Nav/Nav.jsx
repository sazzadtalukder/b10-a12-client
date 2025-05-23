// import React from 'react';
// import { Link, Links, NavLink } from 'react-router-dom';
// import useAuth from '../../Hook/useAuth';

// const Nav = () => {
//     const { user,userLogout } = useAuth()
//     const links = <>
//         <li><NavLink to='/'>Home</NavLink></li>
//         {
//             user?.email && <><li><NavLink to='/dashboard'>Dashboard</NavLink></li><li><NavLink to='/'>Available Token</NavLink></li></>
//         }
//         <li><NavLink>Join as Developer</NavLink></li></>
//         const handleLogout =()=>{
//             userLogout()
//             .then(()=>{
//                 console.log('Logout Successfully')
//             })
//             .catch(er=>{
//                 console.log('log out er error -->',er)
//             })
//         }
//     return (
//         <div>
//             <div className="navbar bg-base-100 shadow-sm">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//                         </div>
//                         <ul
//                             tabIndex={0}
//                             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//                             {links}
//                         </ul>
//                     </div>
//                     <Link to='/' className="btn btn-ghost text-xl">MicroWorker</Link>
//                 </div>
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu menu-horizontal px-1">
//                         {links}
//                     </ul>
//                 </div>
//                 <div className="navbar-end">
//                     {
//                         user?.email ? <>
//                             <div className="tooltip tooltip-bottom mr-2" data-tip={user?.displayName}>
//                                 <img src={user?.photoURL} alt="" className='w-10 h-10 rounded-full'/>
//                             </div>
//                             <button onClick={handleLogout} className="btn btn-primary">Logout</button>
//                         </> : <>
//                         <Link to='/login'><button className="btn btn-primary">Login</button></Link>
//                         <Link to='/register'><button className="btn btn-error">Register</button></Link>
//                         </>
//                     }
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Nav;
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAdmin from '../../Hook/useAdmin';

const Nav = () => {
  const { user, userLogout } = useAuth();

  const handleLogout = () => {
    userLogout()
      .then(() => {
        // console.log('Logout Successfully');
      })
      .catch((err) => {
        // console.log('Logout error -->', err);
      });
  };
  const axiosSecure = useAxiosSecure()
  
   const { data: singleUser  } = useQuery({
      queryKey: ['singleUser', user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/users?email=${user?.email}`)
        console.log(res.data);
        return res.data
    },
    });
    console.log(singleUser)
  const links = (
    <>
      <li><NavLink to='/' className="font-semibold">Home</NavLink></li>
      {user?.email && (
        <>
          <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
          {singleUser?.role == 'admin' ? '' : <li><NavLink to='/availableCoin'>Available Coin : {singleUser?.coin}</NavLink></li>}
          
        </>
      )}
      <li><NavLink to='https://github.com/sazzadtalukder/b10-a12-client'>Join as Developer</NavLink></li>
    </>
  );

  return (
    <div className="shadow-sm bg-white sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo & mobile menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {links}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost text-xl font-bold text-orange-500">MicroWorker</Link>
        </div>

        {/* Desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
        </div>

        {/* Auth section */}
        <div className="navbar-end gap-3">
          {user?.email ? (
            <>
              <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                <img src={user?.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full border" />
              </div>
              <button onClick={handleLogout} className="btn btn-sm btn-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to='/login'>
                <button className="btn btn-sm btn-primary">Login</button>
              </Link>
              <Link to='/register'>
                <button className="btn btn-sm btn-error">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
