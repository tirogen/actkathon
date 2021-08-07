import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import HomeCard from '../../components/home-card';
import Layout from '../../components/layout';
import ReportService from '../../services/report';
import { ReportResponse } from '../../types/report';

export const Home = observer(() => {
    const router = useRouter();
    const [data, setData] = useState<ReportResponse[]>([]);

    useEffect(() => {
        (async () => {
            const data = await ReportService.getAll();
            console.log(data);
            setData(data);
        })();
    }, []);

    return (
        <Layout>
            <Head>
                <title>ปัญหาในพื้นที่ของคุณ</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">ปัญหาในพื้นที่ของคุณ</h1>
                {data.map((report, idx) => {
                    return (
                        <div key={`report-${idx}`} className="mt-4" onClick={() => router.push('/report/1')}>
                            <HomeCard detail={report} />
                        </div>
                    );
                })}
            </div>
            <div className="bottom-indent2"></div>
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
