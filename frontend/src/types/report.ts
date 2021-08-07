export type Report = {
    topic: string;
    description: string;
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
