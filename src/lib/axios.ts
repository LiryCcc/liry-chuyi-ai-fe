import axios from 'axios';
import { DEEPSEEK_API_KEY } from '@/configs';

const axiosInstance = axios.create({
  baseURL: 'https://api.deepseek.com', // DeepSeek API 基础地址
  timeout: 10000
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('key',DEEPSEEK_API_KEY);
    config.headers['Authorization'] = `Bearer ${DEEPSEEK_API_KEY}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export default axiosInstance;
