import React from 'react';
import Layout from './Layout';

const Footer = () => {
  return (
    <div className="border-t">
      <Layout>
        <footer className="flex justify-between items-center relative h-[94px] text-sm ">
          <p>
            &copy; {new Date().getFullYear()} Tesoros en Casa. All rights
            reserved.
          </p>
        </footer>
      </Layout>
    </div>
  );
};

export default Footer;
