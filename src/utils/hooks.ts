import axios from 'axios';
import {useEffect, useState} from 'react';
import { AxiosRequestConfig } from 'axios';

const API = import.meta.env.BACKEND_API || "http://localhost:8080/"


export function useFetch<T>(path: string, axiosConfig: AxiosRequestConfig = {}){

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T|null>(null); 
  const [error, setError] = useState<Error|null>(null); 

  useEffect(() => {
        setIsLoading(false);
         axios(
          API + path, 
          axiosConfig
        ).then((res) =>  setData(res.data))
        .catch(setError)
        .finally(() => setIsLoading(false))
    }, [path])

  return {
    isLoading,
    data,
    error,
  }
}



