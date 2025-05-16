import React from 'react';
import Banner from '../Banner/Banner';
import BestWorker from '../BestWorker/BestWorker';
import Testimonial from '../Testimonial/testimonial';
import QuickHelpFAQ from '../QuickHelpFAQ/QuickHelpFAQ';
import LiveTaskFeed from '../LiveTask/LiveTask';
import HowItWorks from '../HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
           
            <div className='my-10'>
            <Banner></Banner>
            </div>
           <div className='my-10'>
           <BestWorker></BestWorker>
           </div>
           <Testimonial></Testimonial>
           <QuickHelpFAQ></QuickHelpFAQ>
           <LiveTaskFeed></LiveTaskFeed>
           <HowItWorks></HowItWorks>
            

           
        </div>
    );
};

export default Home;