import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { ReportResponse } from '../types/report';

const HomeCard = ({ detail }: { detail: ReportResponse }) => {
    return (
        <div className="home-card">
            <img src={`data:image/png;base64, ${detail.imageFile}`} className="home-card-image" />
            <div className="flex home-card-content">
                <div className="card-text w-full">
                    <h2 className="card-text-title">{detail.topic}</h2>
                    <p className="card-text-location">{detail.locationName}</p>
                    <p className="card-text-status"> กำลังดำเนินการ</p>
                </div>
                <div className="w-full card-vote">
                    <ThumbUpIcon />
                    <p className="card-vote-text">{detail.vote} Vote</p>
                </div>
            </div>
        </div>
    );
};

export default HomeCard;
