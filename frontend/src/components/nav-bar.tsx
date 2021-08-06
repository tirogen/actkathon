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

const NavBar = () => {
    const router = useRouter();
    const [highlight, setHighlight] = useState(Icon.HOME);

    useEffect(() => {
        if (REPORT_PATH.includes(router.pathname)) {
            setHighlight(Icon.REPORT);
        } else {
            setHighlight(Icon.HOME);
        }
    }, [router.pathname]);

    return (
        <div className="nav-bar">
            <div className="flex">
                <div className="nav-bar-icon">
                    <HomeIcon fontSize="large" color={highlight == Icon.HOME ? 'inherit' : 'disabled'} />
                </div>
                <div className="nav-bar-icon">
                    <ListAltIcon fontSize="large" color={highlight == Icon.REPORT ? 'inherit' : 'disabled'} />
                </div>
                <div className="nav-bar-icon">
                    <EmojiEventsIcon fontSize="large" color={highlight == Icon.RANK ? 'inherit' : 'disabled'} />
                </div>
            </div>
        </div>
    );
};

export default NavBar;
