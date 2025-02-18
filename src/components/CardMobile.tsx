import { Tesoro } from '@/types/tesoro';
import Carousel from './Carousel';
import { BiWorld } from 'react-icons/bi';
import { FaHammer } from 'react-icons/fa6';

interface CardMobileProps {
  tesoro: Tesoro;
}

const CardMobile = ({ tesoro }: CardMobileProps) => {
  return (
    <div className="flex flex-col mb-2">
      <Carousel tesoro={tesoro} />
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-2 mt-2">
          <p className="flex justify-center items-center gap-1 text-xs bg-yellow-400/70 rounded-full py-1 px-2">
            <BiWorld />
            {tesoro.origin ? tesoro.origin : 'Desconocido'}
          </p>
          <p className="flex justify-center items-center gap-1 text-xs bg-yellow-400/70 rounded-full py-1 px-2">
            <FaHammer />
            {tesoro.material ? tesoro.material : 'Desconocido'}
          </p>
        </div>
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
        <p
          className={`${tesoro.units === 0 ? 'text-red-500' : 'text-gray-800'}`}
        >
          Unidades: {tesoro.units}
        </p>
        <p className="font-bold"> {tesoro.price} €</p>
      </div>
    </div>
  );
};

export default CardMobile;
