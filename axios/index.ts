import axios from "axios";

export const api = axios.create({
    baseURL: 'https://back.crafters.asia/api/v1',
});

export const apiToken = axios.create({
    baseURL: 'https://back.crafters.asia/api/v1',
    headers: {
        'Authorization' : typeof window !== 'undefined' ? `Token ${localStorage.getItem('token')}` : ''
    }
});