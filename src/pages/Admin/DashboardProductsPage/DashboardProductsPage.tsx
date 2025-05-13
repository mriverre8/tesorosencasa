'use client';

import { BiSearchAlt } from 'react-icons/bi';
import { useState } from 'react';

import ProductCard from '../../../components/ProductCard';
import { Tesoro } from '@/types/tesoro';
import LightboxProduct from '@/components/Lightbox/LightboxProduct';
import LightboxMessage from '@/components/Lightbox/LightboxMessage';
import { translate } from '@/locales/translate';

interface Props {
  tesorosData: Tesoro[];
}

export default function DashboardProductsPage({ tesorosData }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Tesoro | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFinalMsg, setIsFinalMsg] = useState(false);
  const [isFinalMsgTitle, setIsFinalMsgTitle] = useState('');
  const [isFinalMsgText, setIsFinalMsgText] = useState('');

  const filteredTesoros = tesorosData.filter((tesoro) =>
    tesoro.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreview = (tesoro: Tesoro) => {
    setSelectedProduct(tesoro);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen p-5">
        <div className="w-full relative mb-5">
          {/* Icono dentro del input */}
          <BiSearchAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            className="w-full py-2 pl-10 pr-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={translate('SEARCH_TREASURES')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Contenedor de los tesoros filtrados que ocupa el espacio restante */}
        <div className="flex-grow ">
          {filteredTesoros.length > 0 ? (
            <div className="flex flex-col gap-5">
              {filteredTesoros.map((tesoro, index) => (
                <div key={index} onClick={() => handlePreview(tesoro)}>
                  <ProductCard {...tesoro} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center  ">
              <p className="text-center text-gray-400">
                {translate('NO_TREASURES_FOUND')}
              </p>
            </div>
          )}
        </div>
      </div>
      {selectedProduct && (
        <LightboxProduct
          isLightboxOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          setIsFinalMsgTitle={setIsFinalMsgTitle}
          setIsFinalMsgText={setIsFinalMsgText}
          tesoro={selectedProduct}
          onDelete={() => {
            setIsLightboxOpen(false);
            setIsFinalMsg(true);
          }}
        />
      )}
      <LightboxMessage
        isLightboxOpen={isFinalMsg}
        onClose={() => setIsFinalMsg(false)}
        title={isFinalMsgTitle}
        text={isFinalMsgText}
        buttonText={translate('GO_BACK')}
      />
    </>
  );
}
