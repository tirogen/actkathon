import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import Layout from '../../components/layout';
import ReportCard from '../../components/report-card';
import ReportService from '../../services/report';

export const Report = observer(() => {
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
                <title>ปัญหาที่คุณร้องเรียน</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">ปัญหาที่คุณร้องเรียน</h1>
                {data.map((report) => {
                    return (
                        <div className="mt-4">
                            <ReportCard />
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
});
