import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import useAuth from '../../Hook/useAuth';

const AvailableCoin = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()
    const { refetch, data: coin } = useQuery({
        queryKey: ['coin', user?.email],
        queryFn: async () => {
          const res = await axiosSecure.get(`/users?email=${user?.email}`);
          return res.data.coin;
        },
      });
    console.log(coin)
    return (
        <div>
            Available Coin : {coin}
        </div>
    );
};

export default AvailableCoin;