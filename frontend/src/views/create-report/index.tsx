import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BlackButton } from '../../components/black-button';
import Layout from '../../components/layout';
import ReportService from '../../services/report';

export const CreateReport = observer(() => {
    const [imagePreview, setImagePreview] = useState<any>('');
    const [base64, setBase64] = useState<string>('');
    const [lat, setLat] = useState('0');
    const [lng, setLng] = useState('0');
    const router = useRouter();

    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

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

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude.toString());
            setLng(position.coords.longitude.toString());
        });
    }, []);

    const createReport = async () => {
        await ReportService.create({
            topic,
            description,
            image: base64.split(',')[1],
            lat,
            lng,
            location,
        });
        router.push('/');
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
                        <TextField
                            fullWidth
                            required
                            label="ปัญหา"
                            defaultValue=""
                            variant="outlined"
                            onChange={(e) => {
                                setTopic(e.target.value);
                            }}
                        />
                        <TextField
                            fullWidth
                            label="รายละเอียด"
                            multiline
                            rows={4}
                            defaultValue=""
                            variant="outlined"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                        <TextField
                            fullWidth
                            required
                            label="สถานที่"
                            defaultValue=""
                            variant="outlined"
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                        />
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
                            {/* <div>
                                <img src="/assets/location.png" width="55" className="m-auto" onClick={getPosition} />
                                <span>ระบุพิกัดที่ตั้ง</span>
                            </div> */}
                        </div>
                        {imagePreview !== '' && <img src={imagePreview} alt="Icone adicionar" className="m-auto" />}
                        <BlackButton variant="contained" fullWidth onClick={createReport}>
                            รายงานปัญหา
                        </BlackButton>
                    </div>
                </div>
            </div>
            <div className="bottom-indent2"></div>
        </Layout>
    );
});
