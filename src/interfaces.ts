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

export interface ComicDetail extends Comic {
  comicSeries: ComicSeries[];
  writers: Writer[];
  artists: Artist[];
  editors: unknown[];
  staff: unknown[];
  publishers: Publisher[];
  characters: Character[];
  references: unknown[];
  comicCollections: unknown[];
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

export interface ComicSeries {
  uid: string;
  title: string;
  publishedYearFrom: number | null;
  publishedMonthFrom: number | null;
  publishedDayFrom: number | null;
  publishedYearTo: number | null;
  publishedMonthTo: number | null;
  publishedDayTo: number | null;
  numberOfIssues: number | null;
  stardateFrom: number | null;
  stardateTo: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  miniseries: boolean;
  photonovelSeries: boolean;
}

export interface Writer {
  uid: string;
  name: string;
  birthName: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string | null;
  dateOfDeath: string | null;
  placeOfDeath: string | null;

  // Departments
  artDepartment: boolean;
  artDirector: boolean;
  productionDesigner: boolean;
  cameraAndElectricalDepartment: boolean;
  cinematographer: boolean;
  castingDepartment: boolean;
  costumeDepartment: boolean;
  costumeDesigner: boolean;
  director: boolean;
  assistantOrSecondUnitDirector: boolean;
  exhibitAndAttractionStaff: boolean;
  filmEditor: boolean;
  linguist: boolean;
  locationStaff: boolean;
  makeupStaff: boolean;
  musicDepartment: boolean;
  composer: boolean;
  personalAssistant: boolean;
  producer: boolean;
  productionAssociate: boolean;
  productionStaff: boolean;
  publicationStaff: boolean;
  scienceConsultant: boolean;
  soundDepartment: boolean;
  specialAndVisualEffectsStaff: boolean;
  // Roles
  author: boolean;
  audioAuthor: boolean;
  calendarArtist: boolean;
  comicArtist: boolean;
  comicAuthor: boolean;
  comicColorArtist: boolean;
  comicInteriorArtist: boolean;
  comicInkArtist: boolean;
  comicPencilArtist: boolean;
  comicLetterArtist: boolean;
  comicStripArtist: boolean;
  gameArtist: boolean;
  gameAuthor: boolean;
  novelArtist: boolean;
  novelAuthor: boolean;
  referenceArtist: boolean;
  referenceAuthor: boolean;
  publicationArtist: boolean;
  publicationDesigner: boolean;
  publicationEditor: boolean;
  publicityArtist: boolean;
  cbsDigitalStaff: boolean;
  ilmProductionStaff: boolean;
  specialFeaturesStaff: boolean;
  storyEditor: boolean;
  studioExecutive: boolean;
  stuntDepartment: boolean;
  transportationDepartment: boolean;
  videoGameProductionStaff: boolean;
  writer: boolean;
}

export interface Artist {
  uid: string;
  name: string;
  birthName: string | null;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string | null;
  dateOfDeath: string | null;
  placeOfDeath: string | null;

  // Departments
  artDepartment: boolean;
  artDirector: boolean;
  productionDesigner: boolean;
  cameraAndElectricalDepartment: boolean;
  cinematographer: boolean;
  castingDepartment: boolean;
  costumeDepartment: boolean;
  costumeDesigner: boolean;
  director: boolean;
  assistantOrSecondUnitDirector: boolean;
  exhibitAndAttractionStaff: boolean;
  filmEditor: boolean;
  linguist: boolean;
  locationStaff: boolean;
  makeupStaff: boolean;
  musicDepartment: boolean;
  composer: boolean;
  personalAssistant: boolean;
  producer: boolean;
  productionAssociate: boolean;
  productionStaff: boolean;
  publicationStaff: boolean;
  scienceConsultant: boolean;
  soundDepartment: boolean;
  specialAndVisualEffectsStaff: boolean;

  // Roles
  author: boolean;
  audioAuthor: boolean;
  calendarArtist: boolean;
  comicArtist: boolean;
  comicAuthor: boolean;
  comicColorArtist: boolean;
  comicInteriorArtist: boolean;
  comicInkArtist: boolean;
  comicPencilArtist: boolean;
  comicLetterArtist: boolean;
  comicStripArtist: boolean;
  gameArtist: boolean;
  gameAuthor: boolean;
  novelArtist: boolean;
  novelAuthor: boolean;
  referenceArtist: boolean;
  referenceAuthor: boolean;
  publicationArtist: boolean;
  publicationDesigner: boolean;
  publicationEditor: boolean;
  publicityArtist: boolean;
  cbsDigitalStaff: boolean;
  ilmProductionStaff: boolean;
  specialFeaturesStaff: boolean;
  storyEditor: boolean;
  studioExecutive: boolean;
  stuntDepartment: boolean;
  transportationDepartment: boolean;
  videoGameProductionStaff: boolean;
  writer: boolean;
}

export interface Publisher {
  uid: string;
  name: string;
  broadcaster: boolean;
  collectibleCompany: boolean;
  conglomerate: boolean;
  digitalVisualEffectsCompany: boolean;
  distributor: boolean;
  gameCompany: boolean;
  filmEquipmentCompany: boolean;
  makeUpEffectsStudio: boolean;
  mattePaintingCompany: boolean;
  modelAndMiniatureEffectsCompany: boolean;
  postProductionCompany: boolean;
  productionCompany: boolean;
  propCompany: boolean;
  recordLabel: boolean;
  specialEffectsCompany: boolean;
  tvAndFilmProductionCompany: boolean;
  videoGameCompany: boolean;
}

export interface Character {
  uid: string;
  name: string;
  gender: string;
  yearOfBirth: number;
  monthOfBirth: number | null;
  dayOfBirth: number | null;
  placeOfBirth: string | null;
  yearOfDeath: number | null;
  monthOfDeath: number | null;
  dayOfDeath: number | null;
  placeOfDeath: string | null;
  height: number | null;
  weight: number | null;
  deceased: boolean | null;
  bloodType: string | null;
  maritalStatus: string;
  serialNumber: string | null;
  hologramActivationDate: string | null;
  hologramStatus: string | null;
  hologramDateStatus: string | null;
  hologram: boolean;
  fictionalCharacter: boolean;
  mirror: boolean;
  alternateReality: boolean;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue: string;
}

export interface CardProps {
  index: number;
  comic: Comic;
  onClick: () => void;
  isSelected: boolean;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NothingProps {
  empty: boolean;
}


export interface CardListProps {
  results: Comic[];
  empty: boolean;
  offset: number;
  onCardClick: (id: string) => void;
  selectedItems: string[];
  onCheckboxChange: (uid: string, isChecked: boolean) => void;
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
