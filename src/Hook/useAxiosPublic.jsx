import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const axiosPublic = axios.create({
    baseURL : 'https://b10a12-server-side-two.vercel.app'
})

const useAxiosPublic = () => {
    // const navigate= useNavigate()
    return axiosPublic;
};

export default useAxiosPublic;