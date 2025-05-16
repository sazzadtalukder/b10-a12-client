import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hook/useAxiosSecure';

const BestWorker = () => {
    const axiosSecure = useAxiosSecure()
    const { data: totalWorker = [] } = useQuery({
        queryKey: ['totalWorker'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/totalWorker`)
            return res.data
        }
    });
    
    const sortedWorker = [...totalWorker].sort((a,b)=> b.coin - a.coin).slice(0,6)
    // console.log(sortedWorker)
    return (
        <div className='py-10'>
            <p className="text-2xl md:text-3xl font-bold text-center  py-5">Best Worker</p>
            <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8  justify-items-center'>
                            {
                                    sortedWorker && sortedWorker?.map((worker,indx)=>
                                        <div key={indx} className='bg-white rounded-2xl p-4 shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02]'>
                                            <div className='w-64 h-64 rounded-full'>
                                                <img src={worker?.photoURL} alt="" className='w-64 h-64 rounded-full'/>
                                            </div>
                                            <p className='py-5 font-bold text-2xl'>Coin: {worker?.coin}</p>
                                        </div>
                                    )
                            }
                           
                    </div>
            </div>
        </div>
    );
};

export default BestWorker;