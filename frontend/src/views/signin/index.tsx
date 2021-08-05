import { Button, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import Layout from '../../components/layout';
import { authStore } from '../../stores';

export const Signin = observer(() => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();
    const login = useCallback(
        async (event) => {
            event.preventDefault();
            if (username && password) {
                try {
                    await authStore.signin({
                        username,
                        password,
                    });
                    router.push('/');
                } catch (e) {
                    setError(e.response.data.message);
                }
            }
        },
        [username, password],
    );

    return (
        <Layout>
            <Head>
                <title>Signin</title>
            </Head>
            <div className="h-full flex items-center">
                <div className="w-full">
                    <div className="max-w-xs m-auto">
                        <img src={'/assets/act.png'} alt="ACT" />
                    </div>
                    <form onSubmit={login}>
                        <div className="mt-6">
                            <TextField
                                required
                                label="ชื่อผู้ใช้"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                                fullWidth
                            />
                        </div>
                        <div className="mt-6 mb-6">
                            <TextField
                                required
                                label="รหัสผ่าน"
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                fullWidth
                            />
                        </div>
                        {error && <Alert severity="error">{error}</Alert>}
                        <div className="m-auto max-w-xs mt-6">
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                เข้าสู่ระบบ
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
});
