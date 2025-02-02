import { Component } from 'react';
import style from './LoadingSpinner.module.css';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className={style.spinnerContainer}>
        <div className={style.spinner}>
          <div className={style.spinnerCircle}></div>
          <div className={style.spinnerText}>Loading</div>
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;
