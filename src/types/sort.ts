import { CurrenciesDisplayRefsType, CurrencyTableDataType } from "./allTypes";

export enum TypesOfSorts {
  price = "price",
  alphabetical = "alphabetical ",
}

export enum SortDirectionType {
  descending = "descending",
  asccending = "ascending",
}

export type SortDetails = {
  sortType: TypesOfSorts;
  sortDirection: SortDirectionType;
};

export type SortDataFuncArgs = {
  data: CurrencyTableDataType;
  sortDetails: SortDetails;
};

export type SortFuncArgs = {
  currA: CurrenciesDisplayRefsType;
  currB: CurrenciesDisplayRefsType;
  sortDirection: SortDirectionType;
};
