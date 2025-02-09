import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ComicDetail } from '../interfaces';
import { getComicDetails } from '../utils/api';
import LoadingSpinner from '../comps/LoadingSpinner';
import './detailed.css';

const Detailed: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const navigate = useNavigate();
  const [comic, setComic] = useState<ComicDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const detailedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getComicDetails(uid!);
        console.log('getComicDetails', uid);
        setComic(data);
      } catch (error) {
        console.error('Failed to fetch comic details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [uid]);

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

  return (
    <div className="detailed" ref={detailedRef}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        comic && (
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
        )
      )}
      <button onClick={handleClose} className="close-button">
        Close
      </button>
    </div>
  );
};

export default Detailed;
