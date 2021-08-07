import axios from 'axios';
import { Report, ReportResponse } from './../types/report';

class ReportService {
    async create(report: Report) {
        return await axios.post('/report/create', {
            topic: report.topic,
            description: report.description,
            latitude: report.lat,
            longitude: report.lng,
            locationName: report.location,
            imageFile: report.image,
        });
    }

    async getAll(): Promise<ReportResponse[]> {
        const { data } = await axios.get('/report/fetch/all');
        return data;
    }

    async getMy(): Promise<ReportResponse[]> {
        const { data } = await axios.get('/report/citizen/ownedReport');
        return data;
    }

    async get(reportId: string) {
        return await axios.get('/report/fetch/all');
    }

    async vote(reportId: string) {
        return await axios.post(`/report/vote/${reportId}`);
    }
}

export default new ReportService();
