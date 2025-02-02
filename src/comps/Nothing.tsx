import { Component } from 'react';
import style from './Nothing.module.css';
import { NothingProps } from '../interfaces';

class Nothing extends Component<NothingProps> {
  render() {
    return (
      <div className={style.item}>
        <div className={style.stars}>
          <span className={style.star}>★</span>
          <span className={style.star}>★</span>
          <span className={style.star}>★</span>
        </div>
        {!this.props.empty && (
          <>
            Sorry, nothing found. Try another query like "star", "war" or
            something else...
            <div className={style.stars}>
              <span className={style.star}>★</span>
              <span className={style.star}>★</span>
              <span className={style.star}>★</span>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Nothing;
