import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <p>Error Route! Go back to <Link to='/'><span className='btn'>Home</span></Link></p>
        </div>
    );
};

export default ErrorPage;