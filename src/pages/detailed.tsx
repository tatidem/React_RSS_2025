import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Comic } from '../interfaces';
import { getComicDetails } from '../utils/api';
import LoadingSpinner from '../comps/LoadingSpinner';
import './detailed.css';


const Detailed: React.FC = () => {
  const { uid } = useParams<{ uid: string }>(); 
  const navigate = useNavigate();
  const [comic, setComic] = useState<Comic | null>(null);
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
      if (detailedRef.current && !detailedRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className="detailed" ref={detailedRef}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        comic && (
          <div>
            <h2>{comic.title}</h2>
            <p>Published: {comic.publishedYear}</p>
            <p>Pages: {comic.numberOfPages}</p>
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

