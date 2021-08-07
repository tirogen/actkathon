import axios from 'axios';

class AxiosStore {
    constructor() {
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
    }

    setAccessToken(accessToken: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
}

export default AxiosStore;
