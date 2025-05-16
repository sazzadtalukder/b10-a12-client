import React from 'react';
import { Link } from 'react-router-dom';

const Pay = () => {

    return (
        <div>
             <p className="text-xl md:text-2xl font-bold text-center sm:text-left py-5">Buy Coin!</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3' >
                <div className='p-2 border-2'>
                    <p className='p-10'>10 coins <br />= 1$</p>
                <Link to= {`/dashboard/purchaseCoin/${1}`}><button className='btn btn-primary'>Buy</button></Link>
                </div>
                <div className='p-2 border-2'>
                    <p className='p-10'>100 coins <br />= 10$</p>
                <Link to= {`/dashboard/purchaseCoin/${10}`}><button className='btn btn-primary'>Buy</button></Link>
                </div>
                <div className='p-2 border-2'>
                    <p className='p-10'>500 coins <br />= 50$</p>
                <Link to= {`/dashboard/purchaseCoin/${50}`}><button className='btn btn-primary'>Buy</button></Link>
                </div>
                <div className='p-2 border-2'>
                    <p className='p-10'>1000 coins <br /> = 100$</p>
                <Link to= {`/dashboard/purchaseCoin/${100}`}><button className='btn btn-primary'>Buy</button></Link>
                </div>
            
            
            </div>
        </div>
    );
};

export default Pay;