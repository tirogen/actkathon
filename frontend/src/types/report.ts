export type Report = {
    topic: string;
    description: string;
    image: string;
    location: string;
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

export type ReportResponse = {
    createdAt: string;
    creator: Creator;
    description: string;
    latitude: string;
    location: Location;
    locationName: string;
    longitude: string;
    maintainer: Maintainer;
    topic: string;
    updatedAt: string;
    vote: number;
    __v: 0;
    _id: string;
    imageFile: string;
};

export type Creator = {
    createdAt: string;
    phoneNumber: string;
    updatedAt: string;
};

export type Location = {
    country: string;
    district: string;
    elevation: number;
    geocode: string;
    postcode: string;
    province: string;
    subdistrict: string;
};

export type Maintainer = {
    area: string;
    id: string;
    imageProfileURL: string;
    name: string;
    parliamentID: string;
    party: string;
    profileURL: string;
    province: string;
};
