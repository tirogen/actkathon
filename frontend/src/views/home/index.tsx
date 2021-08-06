import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React from 'react';
import Layout from '../../components/layout';

export const Home = observer(() => {
    return (
        <Layout>
            <Head>
                <title>Home</title>
            </Head>
            <div>
                <div>Hi</div>
            </div>
        </Layout>
    );
});
