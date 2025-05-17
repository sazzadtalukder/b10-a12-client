import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hook/useAxiosPublic';

const Login = () => {
    const { userLogin, userGoogleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic()
    const handleGoogle = () => {
        userGoogleLogin()
            .then(result => {
                // console.log(result.user)
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            // console.log('user added to the database', res.data);
                            // Swal.fire({
                            //     position: "top-end",
                            //     icon: "success",
                            //     title: "User added to the database",
                            //     showConfirmButton: false,
                            //     timer: 1500
                            // });
                            navigate(location?.state ? location.state : '/')
                        }
                    })
                navigate(location?.state ? location.state : '/')
            })
            .catch(er => {
                // console.log(er)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: er.code,
                });
            })
    }
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        userLogin(email, password)
            .then((result) => {
                // console.log(result.user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location.state : '/')
            })
            .catch(er => {
                // console.log(er)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: er.code,
                });
            })

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleLogin}>
                        <h1 className="text-5xl font-bold">Login now!</h1>
                            <fieldset className="fieldset">

                                <label className="label">Email</label>
                                <input name='email' type="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input name='password' type="password" className="input" placeholder="Password" />
                                <button type='submit' className="btn btn-neutral mt-4">Login</button>
                                <p>Don't have an account? <Link to='/register'><span className='text-red-600'>Register</span></Link></p>
                            </fieldset>

                        </form>
                        <button onClick={handleGoogle} className='btn'>Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;