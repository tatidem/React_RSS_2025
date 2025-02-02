import { ReactNode } from "react";

export interface AppState {
  searchTerm: string;
  results: { name: string }[];
  loading: boolean;
  error: string | null;
}


export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export interface SearchBarState {
  query: string;
}

export interface CardListProps {
  results: { name: string }[];
}

export interface CardProps {
  name: string;
  description: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}
