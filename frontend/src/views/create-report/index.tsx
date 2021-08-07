import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import React, { useState } from 'react';
import { BlackButton } from '../../components/black-button';
import Layout from '../../components/layout';

export const CreateReport = observer(() => {
    const [imagePreview, setImagePreview] = useState<any>('');
    const [base64, setBase64] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getBase64 = (file: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    const photoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files![0];
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setBase64(await getBase64(file));
        }
    };

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
                                <div className="image-upload">
                                    <label htmlFor="file-input">
                                        <img src="/assets/photo.png" width="55" className="m-auto" />
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        accept=".jpef, .png, .jpg"
                                        onChange={photoUpload}
                                    />
                                </div>
                                <span>แนบภาพถ่าย</span>
                            </div>
                            <div>
                                <img src="/assets/location.png" width="55" className="m-auto" />
                                <span>ระบุพิกัดที่ตั้ง</span>
                            </div>
                        </div>
                        {imagePreview !== '' && <img src={imagePreview} alt="Icone adicionar" />}
                        <BlackButton variant="contained" fullWidth>
                            รายงานปัญหา
                        </BlackButton>
                    </div>
                </div>
            </div>
        </Layout>
    );
});
