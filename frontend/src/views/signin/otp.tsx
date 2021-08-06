import OtpInput from 'react-otp-input';
import { BlackButton } from '../../components/black-button';

type Props = {
    username: string;
    password: string;
    setPassword: (password: string) => void;
    confirmOTP: () => void;
};

const OTP = ({ username, password, setPassword, confirmOTP }: Props) => {
    return (
        <div className="h-full flex items-center justify-center">
            <div>
                <div className="max-w-xs m-auto">
                    <img src={'/assets/sms.png'} alt="SMS" className="m-auto" width="100" />
                </div>
                <h1 className="text-2xl text-center mt-2">OTP Verification</h1>
                <p className="text-center mt-2 otp-text">กรุณากรอกเลข OTP ที่ถูกส่งไปยัง {username}</p>
                <div className="max-w-xs m-auto mt-6">
                    <OtpInput
                        value={password}
                        onChange={setPassword}
                        numInputs={6}
                        isInputNum={true}
                        inputStyle="otp-input shadow-lg"
                        containerStyle="space-x-3"
                    />
                </div>
                <p className="text-center mt-6 otp-text">คุณยังไม่ได้รับรหัสใช่หรือไม่</p>
                <div className="text-center mt-3">
                    <a href="#" className="text-center underline">
                        ส่งรหัสอีกครั้ง
                    </a>
                </div>
                <div className="m-auto mt-6">
                    <BlackButton variant="contained" fullWidth onClick={confirmOTP}>
                        ยืนยันรหัส
                    </BlackButton>
                </div>
            </div>
        </div>
    );
};

export default OTP;
