import axios from 'axios';
import {useEffect, useState} from 'react';
import {AxiosRequestConfig} from 'axios';
import { useAuth  } from '@/auth/AuthProvider';

const API = import.meta.env.BACKEND_API || "http://localhost:8080/"


export function useFetch<T>(path: string, axiosConfig: AxiosRequestConfig = {}, prefetch: boolean = true) {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const {token} = useAuth();
  const [fetchNow, setFetchNow] = useState(prefetch);

  useEffect(() => {
    if (fetchNow)
    {
      setIsLoading(true);
      axios(
        API + path,
        {
          headers:  {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((res) => setData(res.data))
        .catch(setError)
        .finally(() => {
          setIsLoading(false);
          setFetchNow(false);
        })
    }
  }, [path, fetchNow])

  return {
    isLoading,
    data,
    error,
    fetch: () => setFetchNow(true)
  }
}



