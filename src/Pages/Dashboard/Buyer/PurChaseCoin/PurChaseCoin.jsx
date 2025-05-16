import React, { useState } from 'react';
import CheckoutForm from './CheckoutForm';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT)
const PurChaseCoin = () => {
    const {value} = useParams();
    return (
        <div>
            <p className="text-xl md:text-2xl font-bold text-center sm:text-left py-5">Purchase Coin</p>
            <p className='py-4 text-left'>Enter Your Card Number and others info ...</p>

            <Elements stripe={stripePromise}>
               <CheckoutForm value={value}/>
            </Elements>
        </div>
    );
};

export default PurChaseCoin;