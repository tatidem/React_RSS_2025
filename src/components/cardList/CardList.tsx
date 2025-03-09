import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { CardListProps } from '../../interfaces';
import Card from '../card/Card';
import Nothing from '../nothing/Nothing';
import style from './CardList.module.css';
import Pagination from '../pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/core/store';
import { addItem, removeItem } from '@/core/selectedItemsSlice';
import { ITEMS_PER_PAGE } from '@/core/constants';

const CardList: React.FC<CardListProps> = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);

  const currentPage = parseInt((router.query.page as string) || '1', 10);
  //const searchQuery = (router.query.query as string) || '';

  const handleCheckboxChange = useCallback(
    (uid: string, isChecked: boolean) => {
      dispatch(isChecked ? addItem(uid) : removeItem(uid));
    },
    [dispatch]
  );

  const handleCardClick = useCallback(
    (cardUid: string) => {
      if (router.pathname === '/') {
        router.push({
          pathname: `/detailed/${cardUid}`,
          query: router.query,
        });
      }
    },
    [router]
  );

  const handlePageChange = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: page.toString() },
    });
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
