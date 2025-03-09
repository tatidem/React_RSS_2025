import style from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={style.spinnerContainer} data-testid="spinner-container" role="progressbar">
      <div className={style.spinner} data-testid="spinner">
        <div className={style.spinnerCircle} data-testid="spinner-circle"></div>
        <div className={style.spinnerText} data-testid="spinner-text">
          Loading
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
