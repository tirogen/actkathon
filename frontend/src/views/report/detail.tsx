import { observer } from 'mobx-react-lite';
import Avatar from '@material-ui/core/Avatar';
import Head from 'next/head';
import React from 'react';
import Layout from '../../components/layout';
import DetailCard from '../../components/detail-card';

export const ReportDetail = observer(() => {
    return (
        <Layout padding={false}>
            <Head>
                <title>ปัญหาที่ร้องเรียน</title>
            </Head>
            <div style={{ height: '200px' }}>
                <DetailCard />
            </div>
            <div className="m-6">
                <p className="font-semibold text-xl py-2"> รายละเอียดปัญหา</p>
                <p>
                    รายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหารายละเอียดปัญหา
                </p>
                <p className="font-semibold text-xl pt-4 pb-2">วันที่ร้องเรียนปัญหา</p>
                <p>5 สิงหาคม 2564</p>
                <p className="font-semibold text-xl pt-4 pb-2">เขตพื้นที่ความรับผิดชอบ</p>
                <div className="pt-3 grid grid-cols-5 gap-4">
                    <div>
                        <Avatar
                            alt="Travis Howard"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500"
                        />
                    </div>
                    <div className="col-span-4 flex items-center">ชื่อ สส</div>
                </div>
            </div>
        </Layout>
    );
});
