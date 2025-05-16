import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const LiveTaskFeed = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch: refetchAgain, data: totalTask = [] } = useQuery({
        queryKey: ['totalTask'],
        queryFn: async () => {
          const res = await axiosSecure(`/tasks`);
          return res.data;
        },
      });
console.log(totalTask)
 

  return (
    <section className="bg-gray-50 py-12 px-4 md:px-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">🔥 Live Task Feed</h2>
      <p className="text-center text-gray-600 mb-10">
        Check out the latest micro-tasks available right now!
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {totalTask.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No active tasks available.</p>
        ) : (
            totalTask.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-1">💰 <span className="font-medium">{task.pay_per_worker} Coins</span></p>
              <p className="text-sm text-gray-600 mb-1">📅 Complete by: <span className="font-medium">{task.completion_date}</span></p>
              <p className="text-sm text-gray-600 mb-4">🧑‍💼 Buyer: <span className="font-medium">{task.buyer_name}</span></p>
              <Link
                to={`/dashboard/taskDetails/${task?._id}`}
                className="inline-block mt-auto text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl"
              >
                View Task
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default LiveTaskFeed;
