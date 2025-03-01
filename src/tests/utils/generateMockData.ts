import { SearchResult } from '../../interfaces';

export function generateMockData(countComics = 2): SearchResult {
  const randomInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const comics = Array.from({ length: countComics }, (_, index) => ({
    uid: (index + 1).toString(),
    title: `Comic ${index + 1}`,
    publishedYear: randomInterval(1990, 2025),
    publishedMonth: randomInterval(1, 12),
    publishedDay: randomInterval(1, 28),
    coverYear: null,
    coverMonth: null,
    coverDay: null,
    numberOfPages: randomInterval(1, 100),
    stardateFrom: 1234.5,
    stardateTo: 1235.5,
    yearFrom: null,
    yearTo: null,
    photonovel: false,
    adaptation: false,
    detailsUrl: `https://example.com/comic${index + 1}`,
  }));

  return {
    page: {
      pageNumber: 1,
      pageSize: 10,
      numberOfElements: 2,
      totalElements: 2,
      totalPages: 1,
      firstPage: true,
      lastPage: true,
    },
    sort: {
      clauses: [],
    },
    comics,
  };
}
