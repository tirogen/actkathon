import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import React from 'react';

type Props = {
    children: React.ReactNode;
};

interface HideOnScrollProps {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: HideOnScrollProps) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const Bar = ({ children }: Props) => {
    return (
        <>
            <HideOnScroll>
                <AppBar>
                    <Toolbar>{children}</Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
        </>
    );
};

export default Bar;
