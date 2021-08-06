import { TextField } from '@material-ui/core';
import { BlackButton } from '../../components/black-button';

type Props = {
    username: string;
    setUsername: (username: string) => void;
    requestOTP: (event: any) => void;
};

const Phone = ({ username, setUsername, requestOTP }: Props) => {
    return (
        <div>
            <div className="max-w-xs m-auto">
                <img src={'/assets/act.png'} alt="ACT" />
            </div>
            <h1 className="text-2xl">ใส่หมายเลขโทรศัพท์ของคุณ</h1>
            <form onSubmit={requestOTP}>
                <div className="mt-6">
                    <TextField
                        required
                        type="number"
                        label="หมายเลขโทรศัพท์"
                        value={username}
                        onChange={(e) => {
                            if (e.target.value.length <= 10) {
                                setUsername(e.target.value);
                            }
                        }}
                        fullWidth
                    />
                </div>
                <div className="m-auto mt-6">
                    <BlackButton variant="contained" type="submit" fullWidth>
                        ขอรหัส OTP
                    </BlackButton>
                </div>
            </form>
        </div>
    );
};

export default Phone;
