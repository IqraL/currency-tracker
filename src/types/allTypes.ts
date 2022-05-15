export type CurrenciesDisplayRefsType = {
  code: string;
  ref: React.MutableRefObject<HTMLDivElement | null>;
};

export type CurrencyTableDataType = CurrenciesDisplayRefsType[];
