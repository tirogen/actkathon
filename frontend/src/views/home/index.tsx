import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HomeCard from '../../components/home-card';
import Layout from '../../components/layout';
import ReportService from '../../services/report';

export const Home = observer(() => {
    const router = useRouter();
    const [data, setData] = useState([1, 2, 3]);

    // useEffect(() => {
    //     (async () => {
    //         const data = await ReportService.getAll();
    //         setData(data);
    //     })();
    // }, []);

    return (
        <Layout>
            <Head>
                <title>ปัญหาในพื้นที่ของคุณ</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">ปัญหาในพื้นที่ของคุณ</h1>
                {data.map((report) => {
                    return (
                        <div className="mt-4" onClick={() => router.push('/report/1')}>
                            <HomeCard />
                        </div>
                    );
                })}
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
