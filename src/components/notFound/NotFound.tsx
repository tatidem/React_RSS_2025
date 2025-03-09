import style from './NotFound.module.css';

const NotFound: React.FC = () => {
  return (
    <div className={style['not-found']}>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
