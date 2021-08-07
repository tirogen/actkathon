import Avatar from '@material-ui/core/Avatar';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import ReportService from '../../services/report';
import { RankResponse } from '../../types/report';

export const Rank = observer(() => {
    const [data, setData] = useState<RankResponse[]>([]);

    useEffect(() => {
        (async () => {
            const data = await ReportService.getRank();
            setData(data);
        })();
    }, []);

    return (
        <Layout>
            <Head>
                <title>ส.ส. งานล่าช้า</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">ส.ส. งานล่าช้า</h1>
                <div className="mt-5 px-2">
                    {data.map((data, idx) => {
                        return (
                            <div key={`sorsor-${idx}`} className="grid grid-cols-5 gap-4 mt-3">
                                <div>
                                    <Avatar
                                        alt="ส.ส."
                                        src={
                                            !!data.maintainer?.imageProfileURL
                                                ? data.maintainer.imageProfileURL
                                                : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500'
                                        }
                                    />
                                </div>
                                <div className="col-span-4 flex items-center">{data?.maintainer?.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
});
