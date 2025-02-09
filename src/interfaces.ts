import { ReactNode } from 'react';

export interface Comic {
  uid: string;
  title: string;
  publishedYear: number;
  publishedMonth: number | null;
  publishedDay: number | null;
  coverYear: number | null;
  coverMonth: number | null;
  coverDay: number | null;
  numberOfPages: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number | null;
  yearTo: number | null;
  photonovel: boolean;
  adaptation: boolean;
  description?: string; 
}

export interface Page {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface SearchResult {
  page: Page;
  sort: {
    clauses: [];
  };
  comics: Comic[];
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export interface CardProps {
  index: number;
  comic: Comic;
  onClick: () => void;
}

export interface NothingProps {
  empty: boolean;
}

export interface CardListProps {
  results: Comic[];
  empty: boolean;
  offset: number;
  onCardClick: (id: string) => void; 
}

export interface ErrorBoundaryState {
  error: unknown;
  errorInfo?: React.ErrorInfo | null;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export interface DetailedProps {
  uid: string;
  onClose: () => void;
}