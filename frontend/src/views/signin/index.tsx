import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { authStore } from '../../stores';
import OTP from './otp';
import Phone from './phone';

enum State {
    PHONE = 'phone',
    OTP = 'otp',
}

export const Signin = observer(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState(State.PHONE);
    const router = useRouter();

    const requestOTP = (event: any) => {
        event.preventDefault();
        if (/^0\d{9}$/.test(username)) {
            setState(State.OTP);
        }
    };

    const confirmOTP = async () => {
        if (/^0\d{9}$/.test(username) && /^\d{6}$/.test(password)) {
            await authStore.signin({
                username,
                password,
            });
            router.push('/');
        }
    };

    return (
        <div className="w-full p-5">
            <Head>
                <title>Signin</title>
            </Head>
            <div className="h-full flex">
                <div className="w-full">
                    {state == State.PHONE && (
                        <Phone username={username} setUsername={setUsername} requestOTP={requestOTP} />
                    )}
                    {state == State.OTP && (
                        <OTP
                            username={username}
                            password={password}
                            setPassword={setPassword}
                            confirmOTP={confirmOTP}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});
