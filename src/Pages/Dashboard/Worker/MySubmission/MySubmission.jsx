import React from 'react';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MySubmission = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const {refetch: taskRefresh, data: submittedInfo = [] } = useQuery({
        queryKey: ['submittedInfo', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submittedInfo?email=${user?.email}`)
            return res.data;
        }

    })
    console.log(submittedInfo)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>

                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Payable Amount</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submittedInfo && submittedInfo?.map((task, indx) => <tr key={indx}>
                                <th>{indx + 1}</th>
                                <td>{task?.task_title}</td>
                                <td>{task?.payable_amount}</td>
                                <td>{task?.status}</td>
                                
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySubmission;