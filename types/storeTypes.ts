import { ItemType } from "./ItemType";

export type ColumnType = "change" | "volume";

export type Error = {
  message: string;
};
export type ParentCategories = {
  [key: string]: string[];
};
export type Product = {
  showStarred: boolean;
  selectedCategory: string;
  selectedParentMarket: string;
  searchQuery: string;
  changeOrVolume: ColumnType;
  socketEstablished: boolean;
  socketOpen: boolean;
  socket: WebSocket | null;
  parentCategories: ParentCategories | [];
  data: Array<ItemType>;
  filteredData: Array<ItemType>;
  starredData: Array<ItemType>;
  searchedData: Array<ItemType>;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
};

export interface State {
  products: Product;
}

export type ShowedArray = "filteredData" | "starredData" | "searchedData";
