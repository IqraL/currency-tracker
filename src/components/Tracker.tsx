import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { BUTTON_DESIGN_ONE, CURRENCIES } from "../consts";
import { CurrencyTable } from "./CurrencyTable";
import { sortData } from "../helpers/sort";
import { SortDirectionType, TypesOfSorts } from "../types/sort";
import { CurrencyTableDataType } from "../types/allTypes";
import { SortBar } from "./SortBar";

const currenciesDisplayRefs = CURRENCIES.map((currency) => {
  return {
    code: currency,
    ref: createRef<HTMLDivElement | null>(),
  };
});

const appWrapperStyle = {
  backgroundColor: "rgb(32 32 32)",
  display: "grid",
  justifyContent: "center",
  gridRowGap: "32.5px",
  paddingTop: "40px",
};

const headerStyle = {
  height: "100px",
  backgroundColor: "crimson",
  fontSize: "xxx-large",
  display: "grid",
  alignItems: "center",
  fontFamily: "emoji",
  color: "white",
};

export const getSortedData = (
  sortType: TypesOfSorts,
  sortDirection: SortDirectionType
) => {
  return sortData({
    data: currenciesDisplayRefs,
    sortDetails: {
      sortType,
      sortDirection,
    },
  });
};
export const Tracker = () => {
  const wsClient = useRef<Socket | null>(null);
  const [openWsConnection, setOpenWsConnection] = useState(true);

  const [currenciesToDisplay, setcurrenciesToDisplay] = useState<any[]>([]);

  const arrayOfRefMapsForCurrenctTable = useRef(currenciesDisplayRefs);

  const [currenciesWithData, setCurrenciesWithData] = useState<String[]>([]);
  const [reRunSort, setReRunSort] = useState<boolean>(false);

  const [sortParams, setSortParams] = useState<{
    sortType: TypesOfSorts;
    sortDirection: SortDirectionType;
  }>({
    sortType: TypesOfSorts.price,
    sortDirection: SortDirectionType.descending,
  });

  useEffect(() => {
    if (openWsConnection) {
      // Change to env var at end;
      wsClient.current = io("ws://localhost:4000", { autoConnect: false });
      wsClient.current.open();
      wsClient.current.on("currencyData", (data: string) => {
        const parsedData = JSON.parse(JSON.stringify(JSON.parse(data)));
        const currenciesToUpdate = Object.keys(parsedData);

        if (
          !currenciesToUpdate.every((currency) =>
            currenciesWithData.includes(currency)
          )
        ) {
          setCurrenciesWithData([...currenciesWithData, ...currenciesToUpdate]);
          setReRunSort(true);
        }

        currenciesToUpdate.forEach((currency, i) => {
          if (arrayOfRefMapsForCurrenctTable.current) {
            arrayOfRefMapsForCurrenctTable.current.forEach((thisRefMap) => {
              if (thisRefMap.ref.current && thisRefMap.code === currency) {
                thisRefMap.ref.current.innerText = parsedData[currency];
              }
            });
          }
        });
      });
    }

    if (!openWsConnection && wsClient.current) {
      wsClient.current.emit("close");
    }

    return function cleanup() {
      if (wsClient.current) {
        wsClient.current.emit("close");
      }
    };
  }, [currenciesWithData, openWsConnection]);

  const sortedData = useMemo(() => {
    if (reRunSort) {
      setReRunSort(false);
    }
    return getSortedData(sortParams.sortType, sortParams.sortDirection);
  }, [sortParams, reRunSort]);

  const updateSortParams = useCallback(
    (sortType: TypesOfSorts, sortDirection: SortDirectionType) => {
      setSortParams({ sortType, sortDirection });
      setReRunSort(true);
    },
    []
  );

  return (
    <>
      <div style={headerStyle} className={"header"}>
        Crypto Tracker
      </div>

      <div style={appWrapperStyle}>
        <SortBar
          onNewSortParams={updateSortParams}
          buttonDesignClass={BUTTON_DESIGN_ONE}
        />

        <CurrencyTable currenciesDisplayRefs={sortedData} />
      </div>
    </>
  );
};

//Higher order component for button bars
//  <div>Hide No Data </div>
{
  /* <input
type="number"
min="1"
max="4"
onChange={(e) => {
  const num = Number(e.target.value) - 1;
  setcurrenciesToDisplay(CURRENCIES.slice(0, num));
  console.log(e.target.value);
}}
/>
<button onClick={() => setOpenWsConnection(!openWsConnection)}>
connection {`${openWsConnection}`}
</button> */
}
