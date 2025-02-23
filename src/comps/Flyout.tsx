import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unselectAll } from '../app/selectedItemsSlice';
import style from './Flyout.module.css';

interface FlyoutProps {
  selectedCount: number;
  onDownload: () => void;
  reset: boolean;
}

const Flyout: React.FC<FlyoutProps> = ({
  selectedCount,
  onDownload,
  reset,
}) => {
  const dispatch = useDispatch();

  const handleUnselectAll = useCallback(() => {
    dispatch(unselectAll());
  }, [dispatch]);

  useEffect(() => {
    if (reset) {
      handleUnselectAll();
    }
  }, [handleUnselectAll, reset]);

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
