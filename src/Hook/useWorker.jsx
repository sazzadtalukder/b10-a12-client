import React from 'react';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useWorker = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {data: isWorker,isPending: isWorkerLoading} = useQuery({
        queryKey: [user?.email,'isWorker'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/worker/${user?.email}`)
            return res.data?.Worker
        }
    })
    return [isWorker,isWorkerLoading]
};

export default useWorker;