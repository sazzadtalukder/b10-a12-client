import React from 'react';
import { Link, Links, NavLink } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';

const Nav = () => {
    const { user,userLogout } = useAuth()
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        {
            user?.email && <><li><NavLink to='/'>Dashboard</NavLink></li><li><NavLink to='/'>Available Token</NavLink></li></>
        }
        <li><NavLink>Join as Developer</NavLink></li></>
        const handleLogout =()=>{
            userLogout()
            .then(()=>{
                console.log('Logout Successfully')
            })
            .catch(er=>{
                console.log('log out er error -->',er)
            })
        }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost text-xl">MicroWorker</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user?.email ? <>
                            <div className="tooltip tooltip-bottom mr-2" data-tip={user?.displayName}>
                                <img src={user?.photoURL} alt="" className='w-10 h-10 rounded-full'/>
                            </div>
                            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                        </> : <>
                        <Link to='/login'><button className="btn btn-primary">Login</button></Link>
                        <Link to='/register'><button className="btn btn-error">Register</button></Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Nav;