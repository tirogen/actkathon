import { ReportResponse } from '../types/report';

const ReportCard = ({ detail }: { detail: ReportResponse }) => {
    return (
        <div className="report">
            <div className="flex">
                <div
                    className="report-image"
                    style={{
                        backgroundImage: `url("data:image/png;base64, ${detail.imageFile}")`,
                    }}
                ></div>
                <div className="report-detail overflow-hidden">
                    <h2>{detail.topic}</h2>
                    <p className="report-detail-text">{detail.description}</p>
                </div>
            </div>
            <div className="flex items-end">
                <span className="report-status w-full">กำลังดำเนินการแก้ไข</span>
                <span className="w-full text-right"> {detail.vote} Votes</span>
            </div>
        </div>
    );
};

export default ReportCard;
