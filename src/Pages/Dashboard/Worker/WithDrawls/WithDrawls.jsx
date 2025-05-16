import React, { useState } from 'react';
import useInfo from '../../../../Hook/useInfo';
import useAuth from '../../../../Hook/useAuth';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import Swal from 'sweetalert2';

const WithDrawls = () => {
    const {user} = useAuth()
    const [, userInfo] = useInfo();
    const [coin, setCoin] = useState(0)
    const [paymentSystem, setPaymentSystem] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    // console.log(userInfo)
    
    const withDrawalAmount = userInfo?.coin / 20
    const withdrawAmount = (coin / 20).toFixed(2);
    const isCoinValid = coin > 0 && coin <= userInfo?.coin;
    // console.log(coin, paymentSystem,accountNumber,withdrawAmount);
    const axiosSecure = useAxiosSecure()
    const handleWithDraw = async(e)=>{
        e.preventDefault()
        
        const withdrawInfo = {
            worker_email : user?.email,
            worker_name : user?.displayName,
            withdrawal_amount: withdrawAmount,
            payment_system: paymentSystem,
            withdraw_date: new Date().toISOString(),
            status: 'pending'
        }
        const res = await axiosSecure.post('/withdrawRequest',withdrawInfo)
        // console.log(res.data)
        const updateInfo = {
            coin : coin,
        }
        // if(res.data.insertedId){
        //     const res = await axiosSecure.patch(`/withdrawRequest?email=${user?.email}`,updateInfo)
        //     console.log(res.data)
        //     if(res.data.modifiedCount){
        //         Swal.fire({
        //             position: "top-end",
        //             icon: "success",
        //             title: "Your work has been saved",
        //             showConfirmButton: false,
        //             timer: 1500
        //           });
        //     }
        // }

    }
    return (
        <>
            <div>
                <p>Total Coin {userInfo?.coin}</p>
                <p>Withdrawal Amount: {withDrawalAmount}$</p>
            </div>
            <div>
                <form className="card-body">
                    <fieldset className="fieldset">
                        <label className="label font-medium">Coin To Withdraw</label>
                        <input
                            type="number"
                            value={coin}
                            onChange={(e) => setCoin(Number(e.target.value))}
                            className="w-full mt-1 p-2 border rounded-md"

                        />
                        {coin > userInfo?.coin && (
                            <p className="text-red-500 text-sm">Cannot exceed your total coin balance.</p>
                        )}

                        <label className="label font-medium">Withdraw Amount ($)</label>
                        <input
                            type="text"
                            
                            value={withdrawAmount}
                            readOnly
                            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
                        />

                        <label className="label font-medium">Select Payment System</label>
                        <select
                            
                            value={paymentSystem}
                            defaultValue='Select Payment System'
                            onChange={(e) => setPaymentSystem(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md"
                        >
                            <option >Select a category</option>
                            <option>Bkash</option>
                            <option>Rocket</option>
                            <option>Nagad</option>
                            <option>Upay</option>
                        </select>
                        <label className="label">Password</label>
                        <label className="label font-medium">Account Number</label>
                        <input
                            type="text"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md"
                        />
                        {isCoinValid ? (
                            <button
                                onClick={handleWithDraw}
                                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Withdraw
                            </button>
                        ) : (
                            <p className="text-center text-red-600 font-semibold">Insufficient coin</p>
                        )}
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default WithDrawls;