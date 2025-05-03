import React from 'react';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { createUser, updateUserProfile,userGoogleLogin } = useAuth()
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const handleGoogle = ()=>{
        userGoogleLogin()
        .then(result=>{
            console.log(result.user)
            const userInfo = {
                name: result.user.displayName,
                email: result.user.email
            }
            axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database', res.data);
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
        .catch(er=>{
            console.log(er)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: er.code,
              });
        })
    }
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        const userInfo = {
            name: data.name, 
            email: data.email, 
        }
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                               if(res.data.insertedId){
                                reset();
                                console.log('user added -->',res.data)
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "Register Success",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate(location?.state ? location.state : '/')
                               }
                               
                            })
                    })
            })
            .catch(err => {
                console.log(err)
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
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input name='name' type="text" className="input" placeholder="Name" {...register("name", { required: true })}/>
                                {errors.name && <span>This field is required</span>}
                                <label className="label">PhotURL</label>
                                <input name='photoURL' type="url" className="input" placeholder="PhotoURL" {...register("photoURL", { required: true })}/>
                                {errors.name && <span>This field is required</span>}
                                <label className="label">Email</label>
                                <input name='email' type="email" className="input" placeholder="Email" {...register("email", { required: true })}/>
                                {errors.name && <span>This field is required</span>}
                                <label className="label">Password</label>
                                <input name='password' type="password" className="input" placeholder="Password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/ })} />
                                {errors.password?.type === "required" && (
                                    <p className='text-red-600'>Password is required</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className='text-red-600'>Password must be one lowercase, one uppercase, one digit, one symbol </p>
                                )}
                                <button type='submit' className="btn btn-neutral mt-4">Register</button>
                                <p>Already have an account? <Link to='/login'><span className='text-red-600'>Login!</span></Link></p>
                            </fieldset>
                            
                        </form>
                        <button onClick={handleGoogle} className='btn'>Google</button>
                        <button></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;