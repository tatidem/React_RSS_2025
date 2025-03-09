import { useSelector } from 'react-redux';
import { RootState } from '../../core/store';
import SearchBar from '../../components/searchBar/SearchBar';
import CardList from '../../components/cardList/CardList';
import { ErrorButton } from '../../components/errorButton/ErrorButton';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import Flyout from '../../components/flyout/Flyout';
import { useSearchComicsQuery } from '../../core/apiSlice';
import style from './Home.module.css';
import Detailed from '../detailed/Detailed';

interface HomeProps {
  showDetailed?: boolean;
}

const Home: React.FC<HomeProps> = ({ showDetailed = false }) => {
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
              {showDetailed && (
                <div className={style['right-section']}>
                  <Detailed />
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
