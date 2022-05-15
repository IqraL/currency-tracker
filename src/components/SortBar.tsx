import React, { useEffect, useState } from "react";
import { SortDirectionType, TypesOfSorts } from "../types/sort";
import "./SortBar.css";
import "./buttons.css";

type SortBarProps = {
  onNewSortParams: (
    sortType: TypesOfSorts,
    sortDirection: SortDirectionType
  ) => void;
  buttonDesignClass: string;
};

export const SortBar = ({
  onNewSortParams,
  buttonDesignClass,
}: SortBarProps) => {
  const [sortType, setSortType] = useState<TypesOfSorts>(TypesOfSorts.price);
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    SortDirectionType.descending
  );

  useEffect(() => {
    onNewSortParams(sortType, sortDirection);
  }, [onNewSortParams, sortDirection, sortType]);

  return (
    <div className="sortBar">
      <div
        className={buttonDesignClass}
        onClick={() => setSortType(TypesOfSorts.price)}
      >
        Sort by Price
      </div>
      <div
        className={buttonDesignClass}
        onClick={() => setSortType(TypesOfSorts.alphabetical)}
      >
        Sort Aphabetically
      </div>
      <div
        className={`sortBar_direction ${buttonDesignClass}`}
        style={{ color: "white" }}
        onClick={() => setSortDirection(SortDirectionType.descending)}
      >
        ↓
      </div>
      <div
        className={`sortBar_direction ${buttonDesignClass}`}
        style={{ color: "white" }}
        onClick={() => setSortDirection(SortDirectionType.ascending)}
      >
        ↑
      </div>
    </div>
  );
};
