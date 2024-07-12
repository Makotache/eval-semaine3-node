import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const me = async () =>
{
    const res = await axios.get(API_URL + "/auth/me", {
        withCredentials: true,
    });

    return res;
}

export const logout = async () =>
{
    const res = await axios.get(API_URL + "/auth/logout", {
        withCredentials: true,
    });

    return res;
}