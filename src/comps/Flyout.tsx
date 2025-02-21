import React from 'react';
import { useDispatch } from 'react-redux';
import { unselectAll } from '../app/selectedItemsSlice';
import style from './Flyout.module.css';

interface FlyoutProps {
  selectedCount: number;
  onDownload: () => void;
}

const Flyout: React.FC<FlyoutProps> = ({ selectedCount, onDownload }) => {
  const dispatch = useDispatch();

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  return (
    <div className={style.flyout}>
      <div>{selectedCount} items are selected</div>
      <div className={style.buttons}>
        <button onClick={handleUnselectAll}>Unselect all</button>
        <button onClick={onDownload}>Download</button>
      </div>
    </div>
  );
};

export default Flyout;