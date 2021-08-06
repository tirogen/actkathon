import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React from 'react';
import HomeCard from '../../components/home-card';
import Layout from '../../components/layout';

export const Home = observer(() => {
    return (
        <Layout>
            <Head>
                <title>ปัญหาในพื้นที่ของคุณ</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">ปัญหาในพื้นที่ของคุณ</h1>
                <div className="mt-4">
                    <HomeCard />
                </div>
            </div>
        </Layout>
    );
});
