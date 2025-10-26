import React from 'react';
import Topbar from '@/components/common/Topbar';
import Layout from '@/components/common/Layout';
import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations();
  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Topbar isAdminLogged={false} />
      <main>
        <Layout>
          <div className="flex flex-col h-screen justify-center items-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
              </div>

              <div className="text-center">
                <p className="text-lg font-medium text-gray-800 mb-1">
                  {t('LOADING_2')}
                </p>
                <p className="text-sm text-gray-400">{t('WAITING_MESSAGE')}</p>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </div>
  );
}
