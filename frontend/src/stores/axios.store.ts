import axios, { AxiosInstance } from 'axios';
import { makeObservable, observable } from 'mobx';

class AxiosStore {
    instance: AxiosInstance;

    constructor() {
        makeObservable(this, {
            instance: observable,
        });
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        });
    }

    setAccessToken(accessToken: string) {
        this.instance = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
            headers: { Authorization: `Bearer ${accessToken}` },
        });
    }
}

export default AxiosStore;
