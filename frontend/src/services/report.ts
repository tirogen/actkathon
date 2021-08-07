import axios from 'axios';
import { Report } from './../types/report';

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

    async getAll() {
        return await axios.get('/report/fetch/all');
    }

    async getMy() {
        return await axios.get('/report/citizen/ownedReport');
    }

    async get(reportId: string) {
        return await axios.get('/report/fetch/all');
    }

    async vote(reportId: string) {
        return await axios.post(`/report/vote/${reportId}`);
    }
}

export default new ReportService();
