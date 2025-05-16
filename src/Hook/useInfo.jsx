import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useInfo = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const { refetch,data: userInfo = {} } = useQuery({
        queryKey: ['userInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data;
        }

    })
    
    return [refetch,userInfo]
};

export default useInfo;