'use client';

import React, { useEffect, useState } from 'react';

// Components
import ButtonPrimary from '@/components/common/ButtonPrimary';
import StreamCard from '@/components/common/StreamCard';
import StreamCardSkeleton from '@/components/common/StreamCardSkeleton';

// Hooks
import { useTranslations } from 'next-intl';
import useLightboxOptions from '@/hooks/useLightboxOptions';
import useLoader from '@/hooks/useLoader';
import useLightboxMessage from '@/hooks/useLightboxMessage';

// Actions
import { getStream } from '@/actions/getStream';
import { newStream } from '@/actions/newStream';
import { deleteStream } from '@/actions/deleteStream';

// Utils
import { acceptOnlyNumbers, minutesToHours } from '@/utils/utils';

export default function Stream() {
  const translate = useTranslations();

  const lightboxOptions = useLightboxOptions();
  const lightboxMessage = useLightboxMessage();
  const lightboxLoader = useLoader();

  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');

  const isFormOk = date && time && duration;

  const [loading, setLoading] = useState(true);
  const [streamData, setStreamData] = useState(null);

  const handlePublishStreamDate = async () => {
    lightboxOptions.onClose();
    lightboxLoader.onOpen();
    const result = await newStream(date, time, duration);
    if (!result.error) {
      lightboxMessage.setContent(
        translate('NEXT_STREAM_PUBLISHED_TITLE'),
        translate('NEXT_STREAM_PUBLISHED_TEXT', { date, time }),
        translate('GO_BACK')
      );
      setStreamData(result.data);
      setDate('');
      setTime('');
      setDuration('');
    } else {
      lightboxMessage.setContent(
        translate('NEXT_STREAM_PUBLISH_ERROR_TITLE'),
        translate('NEXT_STREAM_PUBLISH_ERROR_TEXT'),
        translate('GO_BACK')
      );
    }
    lightboxLoader.onClose();
    lightboxMessage.onOpen();
  };

  const handleSetStream = async () => {
    const stream = await getStream();
    if (stream) {
      lightboxOptions.setContent(
        translate('NEXT_STREAM_UPDATE_TITLE'),
        translate('NEXT_STREAM_UPDATE_TEXT', { date, time }),
        translate('GO_BACK'),
        translate('NEXT_STREAM_UPDATE'),
        false,
        handlePublishStreamDate
      );
    } else {
      lightboxOptions.setContent(
        translate('NEXT_STREAM_PUBLISH_TITLE'),
        translate('NEXT_STREAM_PUBLISH_TEXT', { date, time }),
        translate('GO_BACK'),
        translate('NEXT_STREAM_SET'),
        false,
        handlePublishStreamDate
      );
    }
    lightboxOptions.onOpen();
  };

  const handleUnpublishStreamDate = async () => {
    lightboxOptions.onClose();
    lightboxLoader.onOpen();
    const result = await deleteStream();
    if (!result.error) {
      lightboxMessage.setContent(
        translate('NEXT_STREAM_DELETED_TITLE'),
        translate('NEXT_STREAM_DELETED_TEXT'),
        translate('GO_BACK')
      );
      setStreamData(null);
    } else {
      lightboxMessage.setContent(
        translate('NEXT_STREAM_DELETE_ERROR_TITLE'),
        translate('NEXT_STREAM_DELETE_ERROR_TEXT'),
        translate('GO_BACK')
      );
    }
    lightboxLoader.onClose();
    lightboxMessage.onOpen();
  };

  const handleDeleteStream = async () => {
    lightboxOptions.setContent(
      translate('NEXT_STREAM_DELETE_TITLE'),
      translate('NEXT_STREAM_DELETE_TEXT'),
      translate('GO_BACK'),
      translate('NEXT_STREAM_UNPUBLISH'),
      true,
      handleUnpublishStreamDate
    );
    lightboxOptions.onOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      const stream = await getStream();
      setLoading(false);
      setStreamData(stream);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-4  min-h-[calc(100vh-69px)] md:justify-normal justify-between max-w-4xl md:gap-10 mx-auto ">
      <div>
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">{translate('ACTUAL_STREAM')}</p>
            {streamData && (
              <button
                className="text-xs font-medium text-red-600 hover:underline"
                onClick={() => handleDeleteStream()}
              >
                {translate('UNPUBLISH')}
              </button>
            )}
          </div>
          {loading ? <StreamCardSkeleton /> : <StreamCard data={streamData} />}
        </div>
        <h1 className="text-3xl font-semibold mb-6 text-gray-700">
          {translate('NEXT_STREAM')}
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-sm font-medium px-0.5">
              {translate('SELECT_DATE')}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={today}
              className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="time" className="text-sm font-medium px-0.5">
              {translate('SELECT_TIME')}
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="duration" className="text-sm font-medium px-0.5">
              {translate('STREAM_DURATION', {
                duration: minutesToHours(duration),
              })}
            </label>
            <div className="relative">
              <input
                id="duration"
                name="duration"
                inputMode="numeric"
                maxLength={3}
                type="text"
                value={duration}
                placeholder="0"
                onChange={(e) =>
                  acceptOnlyNumbers(e.target.value, setDuration, true)
                }
                className="border rounded-full pl-4 pr-12 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
                autoComplete="off"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 pointer-events-none">
                min
              </button>
            </div>
          </div>
        </div>
      </div>
      <ButtonPrimary
        buttonText={translate('NEXT_STREAM_PUBLISH')}
        buttonAction={handleSetStream}
        disabled={!isFormOk}
      />
    </div>
  );
}
