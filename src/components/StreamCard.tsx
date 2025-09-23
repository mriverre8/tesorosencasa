import { DAY, MONTH } from '@/constants/constants';
import { minutesToHours } from '@/utils/utils';
import { stream } from '@prisma/client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { TbPointFilled } from 'react-icons/tb';

interface Props {
  data: stream | null;
}

const StreamCard = ({ data }: Props) => {
  const translate = useTranslations();

  if (!data) {
    return (
      <div className="flex">
        <p className="font-medium text-sm text-gray-400">
          {translate('NEXT_STREAM_MISSING')}
        </p>
      </div>
    );
  }

  const now = new Date();
  const eventDate = new Date(data.date);

  const [hour, minute] = data.time.toString().split(':').map(Number);

  const eventStart = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate(),
    hour,
    minute
  );

  const eventEnd = new Date(eventStart.getTime() + data.duration * 60000);

  const isToday =
    now.getFullYear() === eventDate.getFullYear() &&
    now.getMonth() === eventDate.getMonth() &&
    now.getDate() === eventDate.getDate();

  const isInTimeRange = now >= eventStart && now <= eventEnd;
  const hasEnded = now > eventEnd;

  const dayLabel = DAY[eventDate.getDay()];
  const monthLabel = MONTH[eventDate.getMonth()];

  return (
    <div className="flex bg-white p-2 rounded-md gap-2 items-center justify-between shadow-md">
      <div className="flex gap-2">
        <div className="flex p-2 bg-background rounded-md justify-center items-center">
          <p className="text-xl font-medium">{`${hour
            .toString()
            .padStart(2, '0')}:${minute.toString().padStart(2, '0')}h`}</p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm">
            {translate(dayLabel)} {eventDate.getDate()} de{' '}
            {translate(monthLabel)}
          </p>
          <p className="text-xs text-gray-500">
            Duración: {minutesToHours(data.duration.toString())}
          </p>
        </div>
      </div>

      {isToday && isInTimeRange && (
        <div className="flex items-center">
          <TbPointFilled className="text-red-600 text-xl" />
          <p className="text-xs text-red-500 whitespace-nowrap">En directo</p>
        </div>
      )}

      {isToday && hasEnded && (
        <div className="flex items-center">
          <TbPointFilled className="text-gray-500 text-xl" />
          <p className="text-xs text-gray-500 whitespace-nowrap">Finalizado</p>
        </div>
      )}
    </div>
  );
};

export default StreamCard;
