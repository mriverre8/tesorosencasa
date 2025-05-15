import React from 'react';
import Layout from './Layout';
import { translate } from '@/locales/translate';

const Footer = () => {
  return (
    <div className="border-t">
      <Layout>
        <footer className="flex justify-between items-center relative h-[94px] text-sm ">
          <p>
            &copy; {new Date().getFullYear()} {translate('TESOROS_EN_CASA_1')}{' '}
            {translate('TESOROS_EN_CASA_2')}
          </p>
        </footer>
      </Layout>
    </div>
  );
};

export default Footer;
