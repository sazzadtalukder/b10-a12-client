import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useBuyer = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: isBuyer,isPending: isBuyerLoading} = useQuery({
        queryKey: [user?.email,'isBuyer'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/buyer/${user?.email}`)
            return res.data?.Buyer
        }
    })
    return [isBuyer,isBuyerLoading]
};

export default useBuyer;