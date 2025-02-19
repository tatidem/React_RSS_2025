import React, { useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useGetComicDetailsQuery } from '../app/apiSlice';
import LoadingSpinner from '../comps/LoadingSpinner';
import './detailed.css';

const Detailed: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const detailedRef = useRef<HTMLDivElement>(null);

  const { data: comic, isLoading, isError } = useGetComicDetailsQuery(uid!);

  const handleClose = useCallback(() => {
    navigate(`/${location.search}`, { replace: true });
  }, [navigate, location.search]);

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
    <div className="detailed" ref={detailedRef}>
      <div className="dt-wrapper">
        <h2 className="title">{comic.title}</h2>
        <p className="text-gray">Publication Date: {comic.publishedYear}</p>
        <p className="text-gray">Number of Pages: {comic.numberOfPages}</p>

        {comic.comicSeries.length > 0 && (
          <>
            <h3 className="sub-header">Series</h3>
            <div className="section">
              <div className="sub-card">
                <ul className="list">
                  {comic.comicSeries.map((series) => (
                    <li key={series.uid} className="sub-list">
                      {series.title}
                      <p className="text-gray">
                        Published: {series.publishedYearFrom} -{' '}
                        {series.publishedYearTo}
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
            <h3 className="sub-header">Writers</h3>
            <div className="section">
              <div className="sub-card">
                <ul className="list">
                  {comic.writers.map((writer) => (
                    <li key={writer.uid} className="sub-list">
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
            <h3 className="sub-header">Artists</h3>
            <div className="section">
              <div className="sub-card">
                <ul className="list">
                  {comic.artists.map((artist) => (
                    <li key={artist.uid} className="sub-list">
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
            <h3 className="sub-header">Publishers</h3>
            <div className="section">
              <div className="sub-card">
                <ul className="list">
                  {comic.publishers.map((publisher) => (
                    <li key={publisher.uid} className="sub-list">
                      {publisher.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      <button onClick={handleClose} className="close-button">
        Close
      </button>
    </div>
  );
};

export default Detailed;