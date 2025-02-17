import React from 'react';

const Header = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex bg-gradient-to-b from-white/60 to-[#f5f1e3] rounded-xl  justify-center">
      {children}
    </div>
  );
};

export default Header;
