import {
  SortDataFuncArgs,
  SortDirectionType,
  SortFuncArgs,
  TypesOfSorts,
} from "../types/sort";
import { checkRefsExist } from "./utils";

export const sortData = ({ data, sortDetails }: SortDataFuncArgs) => {
  return data.sort((currA, currB) => {
    switch (sortDetails.sortType) {
      case TypesOfSorts.price: {
        return sortByPrice({
          currA,
          currB,
          sortDirection: sortDetails.sortDirection,
        });
      }
      case TypesOfSorts.alphabetical:
        return sortAlphabeticaly({
          currA,
          currB,
          sortDirection: sortDetails.sortDirection,
        });
      default:
        return 0;
    }
  });
};

export const sortByPrice = ({ currA, currB, sortDirection }: SortFuncArgs) => {
  if (checkRefsExist([currA.ref, currB.ref])) {
    return sortDirection === SortDirectionType.descending
      ? Number(currB.ref.current?.innerText) -
          Number(currA.ref.current?.innerText)
      : Number(currA.ref.current?.innerText) -
          Number(currB.ref.current?.innerText);
  } else return 0;
};

export const sortAlphabeticaly = ({
  currA,
  currB,
  sortDirection,
}: SortFuncArgs) => {
  return sortDirection === SortDirectionType.descending
    ? currA.code.localeCompare(currB.code)
    : currB.code.localeCompare(currA.code);
};
