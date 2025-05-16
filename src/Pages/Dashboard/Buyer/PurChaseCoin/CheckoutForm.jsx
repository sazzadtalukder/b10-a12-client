import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../../Hook/useAxiosSecure';
import useAuth from '../../../../Hook/useAuth';
import Swal from 'sweetalert2';
import useInfo from '../../../../Hook/useInfo';
const CheckoutForm = ({value}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState('')
    const axiosSecure = useAxiosSecure();
    const [clientSecret,setClientSecret] = useState('')
    const [transactionId,setTransactionId]= useState('')
    const {user} = useAuth()
    const [refetch,] = useInfo();
    useEffect(()=>{
        axiosSecure.post('/create-payment-intent',{price: value})
        .then(res=>{
            // console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    },[axiosSecure,value])
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
            setError(error.message)
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
        //confirm payment
        //create a PaymentIntent
        const {paymentIntent,error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            // console.log('Confirm Error',confirmError)
        }
        else{
            // console.log('PaymentIntent',paymentIntent)
            if(paymentIntent.status == "succeeded"){
                // console.log('transactionId',paymentIntent.id)
                setTransactionId(paymentIntent.id)
                const payment = {
                    email: user.email,
                    price: Number(value), 
                    transactionId: paymentIntent.id,
                    date: new Date(), //utc date convert. use moment js
                    // cartIds: cart.map(item._id),
                    // menuItemIds: cart.map(item=> item.menuId),
                    // status: 'pending'
                }
                const res = await  axiosSecure.post(`/payments?email=${user.email}`,payment)
                // console.log('payment saved', res.data)
                refetch();
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thank you for the payment",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    //   navigate('/dashboard/paymentHistory')
                }

            }
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-sm btn-primary my-5 py-5 font-bold' type="submit" disabled={!stripe}>
                    Pay
                </button>
                <p className='text-res-600'>{error}</p>
                {/* {
                    transactionId && <p className='text-green-600'>Your transaction id : {transactionId}</p>
                } */}
            </form>
        </div>
    );
};

export default CheckoutForm;