import React from 'react';

// Components
import Layout from './Layout';

// Icons
import { FaInstagram } from 'react-icons/fa';

// Hooks
import { useTranslations } from 'next-intl';

// Package Info
import packageJson from '../../../package.json';

const Footer = () => {
  const translate = useTranslations();

  return (
    <div className="border-t">
      <Layout>
        <footer className="flex justify-between items-center h-[94px] text-sm text-gray-600">
          <div className="flex flex-col space-y-1 text-xs mobile:text-sm">
            <span>
              {new Date().getFullYear()} {translate('TESOROS_EN_CASA_1')}{' '}
              {translate('TESOROS_EN_CASA_2')}
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">
                {translate('CONTACT')}
              </span>
              <span>{translate('CONTACT_IG')}</span>
            </div>
          </div>
          <div className="flex flex-col mobile:flex-row text-right justify-center items-center gap-2 mobile:gap-4">
            <div className="flex justify-center items-center gap-2">
              <a
                href="https://www.instagram.com/tesoros_en_casa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-lg  hover:scale-110 transition-transform duration-200" />
              </a>
            </div>
            <span className="bg-white rounded-full px-3 py-0.5 text-xs whitespace-nowrap font-light">
              {translate('VERSION', { version: packageJson.version })}
            </span>
          </div>
        </footer>
      </Layout>
    </div>
  );
};

export default Footer;
