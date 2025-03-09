'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'; // Импортируем хуки из React Router
import { useGetComicDetailsQuery } from '@/core/apiSlice';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import style from './Detailed.module.css';

const Detailed: React.FC = () => {
  const navigate = useNavigate(); // Заменяем useRouter на useNavigate
  const [searchParams] = useSearchParams(); // Заменяем useSearchParams на useSearchParams из React Router
  const { uid } = useParams<{ uid: string }>(); // Заменяем useParams на useParams из React Router

  const detailedRef = useRef<HTMLDivElement>(null);

  const { data: comic, isLoading, isError } = useGetComicDetailsQuery(uid || ''); // uid может быть undefined, поэтому добавляем fallback

  const handleClose = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    navigate(`/?${newSearchParams.toString()}`); // Используем navigate вместо router.push
  }, [navigate, searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailedRef.current &&
        !detailedRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button')
      ) {
        handleClose();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClose]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading comic details.</div>;
  }

  if (!comic) {
    return <div>No comic data found.</div>;
  }

  return (
    <div className={style.detailed} ref={detailedRef}>
      <div className={style['dt-wrapper']}>
        <h2 className={style.title}>{comic.title}</h2>
        <p className={style['text-gray']}>Publication Date: {comic.publishedYear}</p>
        <p className={style['text-gray']}>Number of Pages: {comic.numberOfPages}</p>

        {comic.comicSeries.length > 0 && (
          <>
            <h3 className={style['sub-header']}>Series</h3>
            <div className={style.section}>
              <div className={style['sub-card']}>
                <ul className={style.list}>
                  {comic.comicSeries.map((series) => (
                    <li key={series.uid} className={style['sub-list']}>
                      {series.title}
                      <p className={style['text-gray']}>
                        Published: {series.publishedYearFrom} - {series.publishedYearTo}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {comic.writers.length > 0 && (
          <>
            <h3 className={style['sub-header']}>Writers</h3>
            <div className={style.section}>
              <div className={style['sub-card']}>
                <ul className={style.list}>
                  {comic.writers.map((writer) => (
                    <li key={writer.uid} className={style['sub-list']}>
                      {writer.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {comic.artists.length > 0 && (
          <>
            <h3 className={style['sub-header']}>Artists</h3>
            <div className={style.section}>
              <div className={style['sub-card']}>
                <ul className={style.list}>
                  {comic.artists.map((artist) => (
                    <li key={artist.uid} className={style['sub-list']}>
                      {artist.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {comic.publishers.length > 0 && (
          <>
            <h3 className={style['sub-header']}>Publishers</h3>
            <div className={style.section}>
              <div className={style['sub-card']}>
                <ul className={style.list}>
                  {comic.publishers.map((publisher) => (
                    <li key={publisher.uid} className={style['sub-list']}>
                      {publisher.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      <button onClick={handleClose} className={style['close-button']}>
        Close
      </button>
    </div>
  );
};

export default Detailed;

/* 'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useGetComicDetailsQuery } from '@/core/apiSlice';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import style from './Detailed.module.css';

const Detailed: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const uid = params.uid as string;

  const detailedRef = useRef<HTMLDivElement>(null);

  const { data: comic, isLoading, isError } = useGetComicDetailsQuery(uid);

  const handleClose = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    router.push(`/?${newSearchParams.toString()}`);
  }, [router, searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailedRef.current &&
        !detailedRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button')
      ) {
        handleClose();
      }
    };

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [handleClose]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading comic details.</div>;
  }

  if (!comic) {
    return <div>No comic data found.</div>;
  }

  return (
    <div className={style.detailed} ref={detailedRef}>
      <div className={style['dt-wrapper']}>
        <h2 className={style.title}>{comic.title}</h2>
        <p className={style['text-gray']}>Publication Date: {comic.publishedYear}</p>
        <p className={style['text-gray']}>Number of Pages: {comic.numberOfPages}</p>

        {comic.comicSeries.length > 0 && (
          <>
            <h3 className={style['sub-header']}>Series</h3>
            <div className={style.section}>
              <div className={style['sub-card']}>
                <ul className={style.list}>
                  {comic.comicSeries.map((series) => (
                    <li key={series.uid} className={style['sub-list']}>
                      {series.title}
                      <p className={style['text-gray']}>
                        Published: {series.publishedYearFrom} - {series.publishedYearTo}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {comic.writers.length > 0 && (
          <>
            <h3 className={style['sub-header']}>Writers</h3>
            <div className={style.section}>
              <div className={style['sub-card']}>
                <ul className={style.list}>
                  {comic.writers.map((writer) => (
                    <li key={writer.uid} className={style['sub-list']}>
                      {writer.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {comic.artists.length > 0 && (
          <>
            <h3 className={style['sub-header']}>Artists</h3>
            <div className={style.section}>
              <div className={style['sub-card']}>
                <ul className={style.list}>
                  {comic.artists.map((artist) => (
                    <li key={artist.uid} className={style['sub-list']}>
                      {artist.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {comic.publishers.length > 0 && (
          <>
            <h3 className={style['sub-header']}>Publishers</h3>
            <div className={style.section}>
              <div className={style['sub-card']}>
                <ul className={style.list}>
                  {comic.publishers.map((publisher) => (
                    <li key={publisher.uid} className={style['sub-list']}>
                      {publisher.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      <button onClick={handleClose} className={style['close-button']}>
        Close
      </button>
    </div>
  );
};

export default Detailed;
 */
