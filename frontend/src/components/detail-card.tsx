import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { ReportResponse } from '../types/report';

const DetailCard = ({ detail, onVote }: { detail?: ReportResponse; onVote: Function }) => {
    return (
        <div className="detail-card">
            <img
                src={
                    !!detail?.imageFile
                        ? `data:image/png;base64, ${detail.imageFile}`
                        : 'https://images.unsplash.com/photo-1486673748761-a8d18475c757?w=600'
                }
                className="home-card-image"
            />
            <div className="flex detail-card-content">
                <div className="card-text w-full">
                    <p className="card-text-location">{detail?.locationName}</p>
                    <h2 className="card-text-title">{detail?.topic}</h2>
                    <p className="card-text-status"> กำลังดำเนินการ</p>
                </div>
                <div className="w-full card-vote">
                    <ThumbUpIcon onClick={() => onVote()} />
                    <p className="card-vote-text">{detail?.vote} Vote</p>
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
