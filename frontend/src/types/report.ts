export type Report = {
    topic: string;
    detail: string;
    image: string;
    lat: string;
    lng: string;
};

export type ReportResult = Report & {
    locationName: string;
    status: string;
    vote: number;
    reportDate: string;
    representativeName: string;
    representativeImage: string;
};
