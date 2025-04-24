import { useState, useCallback } from 'react';
import ApiCall from '@/app/remote/api_service';
import { AxiosRequestConfig } from 'axios';

interface UseApiCallResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    callApi: (endpoint: string, options?: AxiosRequestConfig) => Promise<void>;
}

const useApiCall = <T = any>(): UseApiCallResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callApi = useCallback(
        async (endpoint: string, options: AxiosRequestConfig = {}) => {
            setLoading(true);
            setError(null);

            try {
                // Merge default headers with custom headers
                const headers = {
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                };

                // Make the API call
                const response = await ApiCall(endpoint, {
                    method: options.method || 'GET',
                    params: options.params || null,
                    headers: headers
                });

                setData(response); // Set the response data
            } catch (err: any) {
                setError(err.message || 'Something went wrong'); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        },
        []
    );

    return { data, loading, error, callApi };
};

export default useApiCall;