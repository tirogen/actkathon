import React from 'react';
import NavBar from './nav-bar';

type Props = {
    children: React.ReactNode;
    padding?: boolean;
};

const Layout = ({ children, padding = true }: Props) => {
    return (
        <div className="flex flex-col items-center">
            <div className={`w-full max-w-screen-md ${padding ? 'm-5' : ''}`}>{children}</div>
            <div className="bottom-indent"></div>
            <NavBar />
        </div>
    );
};

export default Layout;
