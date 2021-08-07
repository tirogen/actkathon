import { observer } from 'mobx-react-lite';
import Avatar from '@material-ui/core/Avatar';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import DetailCard from '../../components/detail-card';
import ReportService from '../../services/report';
import { useRouter } from 'next/router';
import { ReportResponse } from '../../types/report';

export const ReportDetail = observer(() => {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState<ReportResponse | undefined>();
    const [date, setDate] = useState<string>('');
    const [vote, setVote] = useState(false);

    useEffect(() => {
        if (!!id) {
            (async () => {
                const data = await ReportService.get(id as string);
                const date = new Date(data?.createdAt as string);
                const th = date.toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                setData(data);
                setDate(th);
            })();
        }
    }, [id, vote]);

    return (
        <Layout padding={false}>
            <Head>
                <title>ปัญหาที่ร้องเรียน</title>
            </Head>
            <div style={{ height: '200px' }}>
                <DetailCard
                    detail={data}
                    onVote={async () => {
                        try {
                            await ReportService.vote(id as string);
                            setVote(true);
                        } catch {
                            alert('คุณสามารถโหวตได้ 1 ครั้งต่อวันจ้า-');
                        }
                    }}
                />
            </div>
            <div className="m-6">
                <p className="font-semibold text-xl py-2"> รายละเอียดปัญหา</p>
                <p>{data?.description}</p>
                <p className="font-semibold text-xl pt-4 pb-2">วันที่ร้องเรียนปัญหา</p>
                <p>{date}</p>
                <p className="font-semibold text-xl pt-4 pb-2">เขตพื้นที่ความรับผิดชอบ</p>
                <div className="pt-3 grid grid-cols-5 gap-4">
                    <div>
                        <Avatar alt="ศ.ส." src={data?.maintainer.imageProfileURL} />
                    </div>
                    <div className="col-span-4 flex items-center">{data?.maintainer.name}</div>
                </div>
            </div>
            <div className="bottom-indent2"></div>
        </Layout>
    );
});
