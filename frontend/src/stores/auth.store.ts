import { computed, makeObservable, observable } from 'mobx';
import { axiosStore } from '.';
import { User, UserWithPassword } from '../types/user';

class AuthStore {
    user: User | null;
    accessToken: string | null;

    constructor() {
        makeObservable(this, {
            user: observable,
            accessToken: observable,
            isAuthenticated: computed,
        });
        this.user = null;
        this.accessToken = '';
        if (typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('accessToken');
            this.accessToken = accessToken;
            if (accessToken) {
                axiosStore.setAccessToken(accessToken);
            }
        }
    }

    get isAuthenticated() {
        return !!this.accessToken;
    }

    async signin(userWithPassword: UserWithPassword) {
        // const { data } = await axiosStore.instance.post('/auth/signin', userWithPassword);
        // this.setAccessToken(data.access_token);
        this.setAccessToken('ss');
    }

    setAccessToken(accessToken: string) {
        this.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
        axiosStore.setAccessToken(accessToken);
    }

    signout() {
        this.user = null;
        axiosStore.setAccessToken('');
        localStorage.removeItem('accessToken');
    }
}

export default AuthStore;
