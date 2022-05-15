import React, { useEffect, useState } from "react";
import { SortDirectionType, TypesOfSorts } from "../types/sort";

type SortBarProps = {
  onNewSortParams: (
    sortType: TypesOfSorts,
    sortDirection: SortDirectionType
  ) => void;
};

export const SortBar = ({ onNewSortParams }: SortBarProps) => {
  const [sortType, setSortType] = useState<TypesOfSorts>(TypesOfSorts.price);
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    SortDirectionType.descending
  );

  useEffect(() => {
    onNewSortParams(sortType, sortDirection);
  }, [onNewSortParams, sortDirection, sortType]);

  return (
    <div>
      <div onClick={() => setSortType(TypesOfSorts.price)}>Sort by Price</div>
      <div onClick={() => setSortType(TypesOfSorts.alphabetical)}>
        Sort Aphabetically
      </div>
      <div
        style={{ color: "white" }}
        onClick={() => setSortDirection(SortDirectionType.descending)}
      >
        ↓
      </div>
      <div
        style={{ color: "white" }}
        onClick={() => setSortDirection(SortDirectionType.asccending)}
      >
        ↑
      </div>
    </div>
  );
};
