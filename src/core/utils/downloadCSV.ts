import { Comic, SearchResult } from '@/interfaces';
import { detailUrl } from '../apiSlice';
import { getDescription } from './description';

export const downloadCSV = (
  data: SearchResult | undefined,
  selectedItems: string[],
  setDownloadUrl: React.Dispatch<React.SetStateAction<string | null>>
) => {
  const selectedComics = data?.comics?.filter((comic) => selectedItems.includes(comic.uid)) || [];

  const escapeCsv = (value: string) => {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
  };

  const processComic = (comic: Comic) => {
    const title = escapeCsv(comic.title);
    const description = escapeCsv(getDescription(comic));
    const url = escapeCsv(`${detailUrl}${comic.uid}`);
    return `${title},${description},${url}`;
  };

  const csvHeader = 'Title, Description, URL';
  const csvContent = [csvHeader].concat(selectedComics.map(processComic)).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

  const url = URL.createObjectURL(blob);

  setDownloadUrl(url);
};
