import { axiosStore } from './../stores';
import { Report, ReportResult } from './../types/report';

class ReportService {
    create(report: Report) {
        return axiosStore.instance.post('/report', report);
    }

    async getAll() {
        const { data } = await axiosStore.instance.get<ReportResult[]>('/report');
        return data;
    }

    async get(reportId: string) {
        const { data } = await axiosStore.instance.get<ReportResult>(`/report/${reportId}`);
        return data;
    }

    async vote(reportId: string) {
        const { data } = await axiosStore.instance.post<ReportResult>(`/report/vote/${reportId}`);
        return data;
    }
}

export default new ReportService();
