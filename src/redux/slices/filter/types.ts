export type TSortItem = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
};

export interface FilterSliceState {
  searchValue: string;
  currentPage: number;
  categoryId: number;
  sort: TSortItem;
}
