import Avatar from '@material-ui/core/Avatar';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React from 'react';
import Layout from '../../components/layout';

export const Rank = observer(() => {
    return (
        <Layout>
            <Head>
                <title>ส.ส. งานล่าช้า</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">ส.ส. งานล่าช้า</h1>
                <div className="mt-4">
                    <div className="grid grid-cols-5 gap-4">
                        <div>
                            <Avatar
                                alt="Travis Howard"
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500"
                            />
                        </div>
                        <div className="col-span-4 flex items-center">ชื่อ สส</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
});
