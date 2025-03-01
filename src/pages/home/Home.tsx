import { Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SearchBar from '../../comps/searchBar/SearchBar';
import CardList from '../../comps/cardList/CardList';
import { ErrorButton } from '../../comps/errorButton/ErrorButton';
import LoadingSpinner from '../../comps/loadingSpinner/LoadingSpinner';
import Flyout from '../../comps/flyout/Flyout';
import { useSearchComicsQuery } from '../../app/apiSlice';
import './Home.module.css';
import style from './Home.module.css';

const Home: React.FC = () => {
  const { uid } = useParams<{ uid?: string }>();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const { data, isFetching, isError, error } = useSearchComicsQuery(searchTerm);

  return (
    <div>
      <div className={style.header}>Star★Comics</div>
      <div className={style.app}>
        <SearchBar />
        {isError ? (
          <div className="error-message">{error?.toString()}</div>
        ) : isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className={style.content}>
              <div className={style['left-section']}>
                <CardList data={data} />
              </div>

              {uid && (
                <div className={style['right-section']}>
                  <Outlet />
                </div>
              )}
            </div>
            <Flyout data={data} />
          </>
        )}
        <div className={style['error-button-wrapper']}>
          <ErrorButton />
        </div>
      </div>
      <div className={style.footer}></div>
    </div>
  );
};

export default Home;
