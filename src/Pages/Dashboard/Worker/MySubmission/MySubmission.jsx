import React, { useEffect, useState } from 'react';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MySubmission = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(2)


    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { refetch, data: allTask = [] } = useQuery({
        queryKey: ['taskCount'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/taskCount?email=${user?.email}`)
            return res.data;
        }

    })

    const count = allTask.length
    const { refetch: taskRefresh, data: submittedInfo = [] } = useQuery({
        queryKey: ['submittedInfo', user?.email, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submittedInfo?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`)
            return res.data;
        }

    })


    // console.log(submittedInfo.length)

    // const count = submittedInfo?.length
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()]
    // console.log(pages)

    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(1);
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    }
    console.log('total data', submittedInfo)
    console.log('count', count)
    console.log('numberOfPages-->', numberOfPages)
    console.log('itemsPerPage-->', itemsPerPage)
    console.log('currentPage-->', currentPage)
    console.log('pagesLength-->', pages.length)



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
            {/* <div className='pagination'>

                <p>Current Page: {currentPage}</p>
                <button onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page => <button className={currentPage == page + 1 ? 'selected' : undefined} key={page} onClick={() => setCurrentPage(page + 1)}>{page + 1}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
                <select onChange={handleItemsPerPage} value={itemsPerPage} name="" id=""  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>
            </div> */}
            <div className="pagination flex flex-col md:flex-row items-center justify-between gap-4 mt-6 p-4 border rounded-lg shadow-sm bg-white">

                <p className="text-gray-700 font-medium">
                    Current Page: <span className="text-blue-600">{currentPage}</span>
                </p>

                <div className="flex items-center gap-2 flex-wrap">
                    <button
                        onClick={handlePrevPage}
                        className="px-3 py-1 rounded-md border bg-gray-100 hover:bg-gray-200 text-sm"
                    >
                        Prev
                    </button>

                    {pages.map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`px-3 py-1 rounded-md text-sm border ${currentPage === page + 1
                                    ? 'bg-blue-600 text-white font-semibold'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            {page + 1}
                        </button>
                    ))}

                    <button
                        onClick={handleNextPage}
                        className="px-3 py-1 rounded-md border bg-gray-100 hover:bg-gray-200 text-sm"
                    >
                        Next
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="itemsPerPage" className="text-sm text-gray-600 font-medium">
                        Items per page:
                    </label>
                    <select
                        onChange={handleItemsPerPage}
                        value={itemsPerPage}
                        id="itemsPerPage"
                        className="border px-2 py-1 rounded-md text-sm"
                    >
                        
                        <option value="2">2</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>


        </div>
    );
};

export default MySubmission;