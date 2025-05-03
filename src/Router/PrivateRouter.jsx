import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Component/Loading';

const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading)
        return <Loading></Loading>
    if(user)
        return children;
    return <Navigate to='/login' state={location?.pathname}></Navigate>
};

export default PrivateRouter;