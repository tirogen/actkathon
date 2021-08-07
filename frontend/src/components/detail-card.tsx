import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const DetailCard = () => {
    return (
        <div className="detail-card">
            <img src="https://images.unsplash.com/photo-1486673748761-a8d18475c757?w=600" className="home-card-image" />
            <div className="flex detail-card-content">
                <div className="card-text w-full">
                    <p className="card-text-location">สยาม</p>
                    <h2 className="card-text-title">ทางเท้าชำรุด</h2>
                    <p className="card-text-status"> กำลังดำเนินการ</p>
                </div>
                <div className="w-full card-vote">
                    <ThumbUpIcon />
                    <p className="card-vote-text">4,250 Vote</p>
                </div>
            </div>
        </div>
    );
};

export default DetailCard;
