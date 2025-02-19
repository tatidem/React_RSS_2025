// import { SearchResult, ComicDetail } from '../interfaces';

// const SEARCH_URL = 'https://stapi.co/api/v1/rest/comics/search';
// const COMIC_DETAILS_URL = 'https://stapi.co/api/v1/rest/comics';

// export async function getComics(name: string): Promise<SearchResult> {
//   const param: RequestInit = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: `name=${name}&title=${name}`,
//   };

//   const response = await fetch(SEARCH_URL, param);
//   return await response.json();
// }

// export async function getComicDetails(uid: string): Promise<ComicDetail> {
//   const response = await fetch(`${COMIC_DETAILS_URL}?uid=${uid}`);
//   if (!response.ok) {
//     throw new Error(`Failed to fetch comic details: ${response.statusText}`);
//   }
//   const data = await response.json();
//   return data.comics;
// }
