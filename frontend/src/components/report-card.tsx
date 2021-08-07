const ReportCard = () => {
    return (
        <div className="report">
            <div className="flex">
                <div
                    className="report-image"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1486673748761-a8d18475c757?w=600)',
                    }}
                ></div>
                <div className="report-detail overflow-hidden">
                    <h2>ทางเท้าชำรุด</h2>
                    <p className="report-detail-text">
                        รายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียดรายละเอียด
                    </p>
                </div>
            </div>
            <div className="flex items-end">
                <span className="report-status w-full">กำลังดำเนินการแก้ไข</span>
                <span className="w-full text-right">2,430 Votes</span>
            </div>
        </div>
    );
};

export default ReportCard;
