import React from 'react';
import NavBar from './nav-bar';

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div>
            <div className="w-full p-5">{children}</div>
            <div className="bottom-indent"></div>
            <NavBar />
        </div>
    );
};

export default Layout;
