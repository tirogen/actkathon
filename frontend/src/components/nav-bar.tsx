import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import HomeIcon from '@material-ui/icons/Home';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

enum Icon {
    HOME = 'Home',
    REPORT = 'Report',
    RANK = 'Rank',
}

const REPORT_PATH = ['/report'];
const RANK_PATH = ['/rank'];

const NavBar = () => {
    const router = useRouter();
    const [highlight, setHighlight] = useState(Icon.HOME);

    useEffect(() => {
        if (REPORT_PATH.includes(router.pathname)) {
            setHighlight(Icon.REPORT);
        } else if (RANK_PATH.includes(router.pathname)) {
            setHighlight(Icon.RANK);
        } else {
            setHighlight(Icon.HOME);
        }
    }, [router.pathname]);

    return (
        <div className="nav-bar">
            <div className="flex">
                <div className="nav-bar-icon">
                    <HomeIcon
                        fontSize="large"
                        color={highlight == Icon.HOME ? 'inherit' : 'disabled'}
                        onClick={() => {
                            router.push('/');
                        }}
                    />
                </div>
                <div className="nav-bar-icon">
                    <ListAltIcon
                        fontSize="large"
                        color={highlight == Icon.REPORT ? 'inherit' : 'disabled'}
                        onClick={() => {
                            router.push('/report');
                        }}
                    />
                </div>
                <div className="nav-bar-icon">
                    <EmojiEventsIcon
                        fontSize="large"
                        color={highlight == Icon.RANK ? 'inherit' : 'disabled'}
                        onClick={() => {
                            router.push('/rank');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
