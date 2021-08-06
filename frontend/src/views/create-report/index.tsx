import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React from 'react';
import { BlackButton } from '../../components/black-button';
import Layout from '../../components/layout';

export const CreateReport = observer(() => {
    return (
        <Layout>
            <Head>
                <title>รายงานปัญหา</title>
            </Head>
            <div>
                <h1 className="text-2xl title-shadow text-center">รายงานปัญหา</h1>
                <div className="mt-4">
                    <div className="space-y-4">
                        <TextField fullWidth required label="ปัญหา" defaultValue="" variant="outlined" />
                        <TextField fullWidth label="รายละเอียด" multiline rows={4} defaultValue="" variant="outlined" />
                        <div className="flex justify-evenly">
                            <div>
                                <img src="/assets/photo.png" width="55" className="m-auto" />
                                <span>แนบภาพถ่าย</span>
                            </div>
                            <div>
                                <img src="/assets/location.png" width="55" className="m-auto" />
                                <span>ระบุพิกัดที่ตั้ง</span>
                            </div>
                        </div>
                        <BlackButton variant="contained" fullWidth>
                            รายงานปัญหา
                        </BlackButton>
                    </div>
                </div>
            </div>
        </Layout>
    );
});
