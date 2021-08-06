import React from 'react';

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return <div className="w-full p-5">{children}</div>;
};

export default Layout;
