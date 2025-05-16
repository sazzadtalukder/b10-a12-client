import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../../assets/Home/1.jpg'
import image2 from '../../../assets/Home/2.png'
import image3 from '../../../assets/Home/3.jpg'

const Banner = () => {
    return (
        <div>
            
            <section className="relative h-screen py-10">
                <Carousel
                    autoPlay ={true}
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={true}
                    interval={2000}
                    stopOnHover={false}
                >
                    <div className="bg-black-500 h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url(${image1})` }}>
                        <div className="text-center bg-slate-500/40 p-4">
                            <h1 className="text-5xl  font-bold animate-fadeIn">Empower Your Taskforce</h1>
                            <p className="mt-4 text-lg">Connect with us, get tasks done fast.</p>
                        </div>
                    </div>
                    <div className="h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url(${image2})` }}>
                        <div className="text-center bg-slate-500/40 p-4">
                            <h1 className="text-5xl font-bold animate-fadeIn">Post. Complete. Reward.</h1>
                            <p className="mt-4 text-lg">Make your goals a reality with our microtask platform.</p>
                        </div>
                    </div>
                    <div className="h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url(${image3})` }}>
                        <div className="text-center bg-slate-500/40 p-4">
                            <h1 className="text-5xl font-bold animate-fadeIn">Where Tasks Meet Talent</h1>
                            <p className="mt-4 text-lg">Your gateway to efficient task completion.</p>
                        </div>
                    </div>
                </Carousel>
            </section>
        </div>
    );
};

export default Banner;