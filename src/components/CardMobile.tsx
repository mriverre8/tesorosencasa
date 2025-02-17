import { Tesoro } from '@/types/tesoro';
import Carousel from './Carousel';

interface CardMobileProps {
  tesoro: Tesoro;
}

const CardMobile = ({ tesoro }: CardMobileProps) => {
  return (
    <div className="flex flex-col mb-2">
      <Carousel tesoro={tesoro} />
      <div className="flex flex-col">
        {(tesoro.material || tesoro.origin) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tesoro.origin && (
              <p className="text-xs bg-yellow-400/70 rounded-full py-1 px-2">
                {tesoro.origin}
              </p>
            )}
            {tesoro.material && (
              <p className="text-xs bg-yellow-400/70 rounded-full py-1 px-2">
                {tesoro.material}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col text-sm  mx-1 ">
          <h3
            className={`font-semibold  line-clamp-2 ${tesoro.material || tesoro.origin ? 'mt-1' : 'mt-2'}`}
          >
            {tesoro.name}
          </h3>
          {tesoro.brand && (
            <p className="font-light text-gray-400 line-clamp-2">
              {tesoro.brand}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-between px-1 my-1 text-sm">
        <p>Unidades: {tesoro.units}</p>
        <p className="font-bold"> {tesoro.price} €</p>
      </div>
    </div>
  );
};

export default CardMobile;
