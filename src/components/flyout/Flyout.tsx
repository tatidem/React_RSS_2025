import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unselectAll } from '../../core/selectedItemsSlice';
import style from './Flyout.module.css';
import { downloadCSV } from '../../core/utils/downloadCSV';
import { RootState } from '../../core/store';
import { FlyoutProps } from '../../interfaces';

const Flyout: React.FC<FlyoutProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);

  const handleDownload = () => {
    downloadCSV(data, selectedItems, setDownloadUrl);
  };

  const handleUnselectAll = useCallback(() => {
    dispatch(unselectAll());
  }, [dispatch]);

  useEffect(() => {
    if (downloadUrl && linkRef.current) {
      linkRef.current.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  }, [downloadUrl]);

  const selectedItemsCount = selectedItems.length;

  if (selectedItemsCount === 0) return null;

  return (
    <div className={style.flyout}>
      <div>{selectedItemsCount} items are selected</div>
      <div className={style.buttons}>
        <button onClick={handleUnselectAll}>Unselect all</button>
        <button onClick={handleDownload}>Download</button>
      </div>
      {downloadUrl && (
        <a
          href={downloadUrl || '#'}
          download={`${selectedItemsCount}_episodes.csv`}
          style={{ display: 'none' }}
          ref={linkRef}
          role="link"
        >
          Download
        </a>
      )}
    </div>
  );
};

export default Flyout;
