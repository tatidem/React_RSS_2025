import React, { useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router';
import { CardListProps } from '../../interfaces';
import Card from '../card/Card';
import Nothing from '../nothing/Nothing';
import style from './CardList.module.css';
import Pagination from '../pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import { addItem, removeItem } from '../../core/selectedItemsSlice';
import { ITEMS_PER_PAGE } from '../../core/constants';

const CardList: React.FC<CardListProps> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const handleCheckboxChange = useCallback(
    (uid: string, isChecked: boolean) => {
      dispatch(isChecked ? addItem(uid) : removeItem(uid));
    },
    [dispatch]
  );

  const handleCardClick = useCallback(
    (cardUid: string) => {
      if (location?.pathname === '/') {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        navigate(`/detailed/${cardUid}?${newSearchParams.toString()}`);
      }
    },
    [navigate, location, searchParams]
  );

  const handlePageChange = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    navigate(`?${newSearchParams.toString()}`);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalItems = data?.comics.length || 0;
  const results = data?.comics?.slice(startIndex, endIndex) || [];

  if (results.length === 0) {
    return <Nothing empty={searchTerm.length === 0} />;
  }

  return (
    <>
      <div className={style.cardList}>
        {results.map((item, index) => (
          <Card
            key={item.uid}
            index={startIndex + index + 1}
            comic={item}
            onClick={() => handleCardClick(item.uid)}
            isSelected={selectedItems.includes(item.uid)}
            onCheckboxChange={(e) => handleCheckboxChange(item.uid, e.target.checked)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default CardList;
