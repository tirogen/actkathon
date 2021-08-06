import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React from 'react';
import Layout from '../../components/layout';
import ReportCard from '../../components/report-card';

export const Report = observer(() => {
    return (
        <Layout>
            <Head>
                <title>ปัญหาที่คุณร้องเรียน</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">ปัญหาที่คุณร้องเรียน</h1>
                <div className="mt-4">
                    <ReportCard />
                </div>
            </div>
        </Layout>
    );
});
