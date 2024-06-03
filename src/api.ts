import axios, { AxiosInstance, AxiosError } from 'axios';

const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities/';
const REQUEST_TIMEOUT = 5000;


type DetailMessageType = {
  type: string;
  message: string;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({ baseURL: BASE_URL, timeout: REQUEST_TIMEOUT });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => Promise.reject(error)
  );
  return api;
};
