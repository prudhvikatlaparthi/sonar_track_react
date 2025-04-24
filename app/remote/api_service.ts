import axios, { AxiosRequestConfig } from 'axios';

const ApiCall = async (endPoint: string, options: AxiosRequestConfig = {}) => {
    const baseURL = 'http://devops.effiasoft.org:114/api/';
    const url = `${baseURL}${endPoint}`;
    console.log('API URL:', url); // Log the API URL for debugging
    console.log('API Options:', options); // Log the options for debugging
    try {
        const response = await axios({
            url,
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            data: options.data || null, // Request body
            params: options.params || null, // Query parameters
        });
        console.log('API Response:', response.data); // Log the response data for debugging
        return response.data; // Return the response data
    } catch (error: any) {
        console.error('API Error:', error); // Log the error for debugging
        throw new Error(error.response?.data?.message || error.message || 'Something went wrong');
    }
};

export default ApiCall;