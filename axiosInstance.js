// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://demo.ohtel.in/api', // Set your base URL here
});

export default axiosInstance;