import React from "react";
import "./CurrencyTable.css";
import {
  CurrenciesDisplayRefsType,
  CurrencyTableDataType,
} from "../types/allTypes";

const CURR_TABLE_BLOCK_NAME = "currency_table";

const NO_DATA = "No Data";

export const CurrencyTable = ({
  currenciesDisplayRefs,
}: {
  currenciesDisplayRefs: CurrencyTableDataType;
}) => {
  return (
    <div className={`${CURR_TABLE_BLOCK_NAME}_body`}>
      {currenciesDisplayRefs.map(
        (CurrencyToDisplay: CurrenciesDisplayRefsType) => (
          <div
            className={`${CURR_TABLE_BLOCK_NAME}_row`}
            key={CurrencyToDisplay.code}
          >
            <div
              className={`${CURR_TABLE_BLOCK_NAME}_curr_name ${CURR_TABLE_BLOCK_NAME}_curr_cell`}
            >
              {CurrencyToDisplay.code}
            </div>
            <div
              ref={CurrencyToDisplay.ref}
              className={`${CURR_TABLE_BLOCK_NAME}_curr_cell`}
            ></div>
          </div>
        )
      )}
    </div>
  );
};

type TableCellProps = {
  value?: string;
  ref?: React.LegacyRef<HTMLDivElement>;
  className?: string;
};
const TableCell = ({ ref, value, className }: TableCellProps) => (
  <div
    ref={ref}
    className={`${CURR_TABLE_BLOCK_NAME}_curr_cell ${className}`}
  ></div>
);
