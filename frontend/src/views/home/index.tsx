import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import HomeCard from '../../components/home-card';
import Layout from '../../components/layout';

export const Home = observer(() => {
    const router = useRouter();

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
            <Fab
                size="small"
                className="create-button"
                color="primary"
                onClick={() => {
                    router.push('/create-report');
                }}
            >
                <AddIcon />
            </Fab>
        </Layout>
    );
});
