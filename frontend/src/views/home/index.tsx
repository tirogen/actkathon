import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import AppBar from '../../components/appBar';
import Layout from '../../components/layout';

export const Home = observer(() => {
    const router = useRouter();

    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <div>
                <AppBar>
                    <h1 className="font-semibold m-auto">Report</h1>
                </AppBar>
                <div>Home</div>
            </div>
        </Layout>
    );
});
