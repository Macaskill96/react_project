
import axios from "axios";
import { baseURL } from '../constants';

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWMzY2RjZDlmNTE4ZjZlNmI2M2E3YTAxZWM2YzA4OCIsInN1YiI6IjY0NWVhODkyYjIzNGI5MDE1NWEzZGZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RS2sl6CuhO7RK8v_zX8qdWqSKHyLJbFdu5PtYNsmGrM';

const axiosService = axios.create({
    baseURL:baseURL
});

axiosService.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${apiKey}`;
    return config;
},(error) => {
    return Promise.reject(error);
});

export { axiosService };