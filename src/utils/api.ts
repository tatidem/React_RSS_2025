import { SearchResult } from '../interfaces';

const SEARCH_URL = 'https://stapi.co/api/v1/rest/comics/search';

export async function getComics(name: string): Promise<SearchResult> {
  const param: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `name=${name}&title=${name}`,
  };

  const response = await fetch(SEARCH_URL, param);
  return await response.json();
}
