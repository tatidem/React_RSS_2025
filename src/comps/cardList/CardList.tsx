import React, { useCallback } from 'react';
import { CardListProps } from '../../interfaces';
import Card from '../../comps/card/Card';
import Nothing from '../nothing/Nothing';
import style from './CardList.module.css';
import Pagination from '../pagination/Pagination';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addItem, removeItem } from '../../app/selectedItemsSlice';
import { ITEMS_PER_PAGE } from '../../app/constants';

const CardList: React.FC<CardListProps> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);

  const handleCheckboxChange = useCallback(
    (uid: string, isChecked: boolean) => {
      dispatch(isChecked ? addItem(uid) : removeItem(uid));
    },
    [dispatch]
  );

  const handleCardClick = useCallback(
    (cardUid: string) => {
      if (location?.pathname === '/') navigate(`/detailed/${cardUid}${location.search}`);
    },
    [location, navigate]
  );

  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchTerm, page: page.toString() });
  };

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
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
