import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Comic } from '../interfaces';
import { getComicDetails } from '../utils/api';
import LoadingSpinner from '../comps/LoadingSpinner';


const Detailed: React.FC = () => {
  const { uid } = useParams<{ uid: string }>(); 
  const navigate = useNavigate();
  const [comic, setComic] = useState<Comic | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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

  const handleClose = () => {
    navigate(`/${location.search}`, { replace: true });
  };

  return (
    <div className="detailed">
      <button onClick={handleClose} className="close-button">
        Close
      </button>
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
    </div>
  );
};

export default Detailed;

