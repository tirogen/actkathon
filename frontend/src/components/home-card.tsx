import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const HomeCard = () => {
    return (
        <div className="home-card">
            <img
                src="https://images.unsplash.com/photo-1486673748761-a8d18475c757?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&w=600"
                className="home-card-image"
            />
            <div className="flex home-card-content">
                <div className="card-text w-full">
                    <h2 className="card-text-title">ทางเท้าชำรุด</h2>
                    <p className="card-text-location">สยาม</p>
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

export default HomeCard;
