import React from 'react';

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="max-w-[1220px] mx-auto px-4">{children}</div>;
};

export default Layout;
