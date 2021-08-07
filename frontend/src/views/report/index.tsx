import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import Layout from '../../components/layout';
import ReportCard from '../../components/report-card';
import ReportService from '../../services/report';
import { ReportResponse } from '../../types/report';

export const Report = observer(() => {
    const router = useRouter();
    const [data, setData] = useState<ReportResponse[]>([]);

    useEffect(() => {
        (async () => {
            const data = await ReportService.getAll();
            setData(data);
        })();
    }, []);

    return (
        <Layout>
            <Head>
                <title>ปัญหาที่คุณร้องเรียน</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">ปัญหาที่คุณร้องเรียน</h1>
                {data.map((report, idx) => {
                    return (
                        <div
                            key={`myreport-${idx}`}
                            className="mt-4"
                            onClick={() => router.push(`/report/${report._id}`)}
                        >
                            <ReportCard detail={report} />
                        </div>
                    );
                })}
            </div>
            <div className="bottom-indent2"></div>
        </Layout>
    );
});
