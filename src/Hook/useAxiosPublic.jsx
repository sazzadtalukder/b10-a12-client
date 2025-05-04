import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const axiosPublic = axios.create({
    baseURL : 'http://localhost:5000'
})

const useAxiosPublic = () => {
    // const navigate= useNavigate()
    return axiosPublic;
};

export default useAxiosPublic;