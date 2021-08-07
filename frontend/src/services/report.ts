import axios from 'axios';
import { Report } from './../types/report';

class ReportService {
    create(report: Report) {
        return axios.post('/report/create', {
            topic: report.topic,
            description: report.description,
            latitude: report.lat,
            longitude: report.lng,
        });
    }

    async getAll() {}

    async get(reportId: string) {}

    async vote(reportId: string) {}
}

export default new ReportService();
