import React from 'react';
import useAdmin from '../Hook/useAdmin';
import useAuth from '../Hook/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Component/Loading';

const AdminRoute = ({children}) => {
    const {user,loading} = useAuth()
    const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation()
    if(loading || isAdminLoading)
        return <Loading></Loading>
    if(user || isAdmin)
        return children;
    return <Navigate to='/login' state={location?.pathname}></Navigate>
};

export default AdminRoute;