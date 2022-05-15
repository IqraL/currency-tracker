import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { CURRENCIES } from "../consts";
import { CurrencyTable } from "./CurrencyTable";
import { sortData } from "../helpers/sort";
import { SortDirectionType, TypesOfSorts } from "../types/sort";

const currenciesDisplayRefs = CURRENCIES.map((currencny) => {
  return {
    code: currencny,
    ref: createRef<HTMLDivElement | null>(),
  };
});

const appWrapperStyle = {
  backgroundColor: "rgb(32 32 32)",
  display: "grid",
  justifyContent: "center",
};

export const Tracker = () => {
  const wsClient = useRef<Socket | null>(null);
  const [openWsConnection, setOpenWsConnection] = useState(true);

  const [currenciesToDisplay, setcurrenciesToDisplay] = useState<any[]>([]);

  const arrayOfRefMapsForCurrenctTable = useRef(currenciesDisplayRefs);

  const [currenciesWithData, setCurrenciesWithData] = useState<String[]>([]);

  const [sortType, setSortType] = useState<TypesOfSorts>(TypesOfSorts.price);
  const [sortDirection, setSortDirection] = useState<SortDirectionType>(
    SortDirectionType.descending
  );

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
    return sortData({
      data: currenciesDisplayRefs,
      sortDetails: {
        sortType: sortType,
        sortDirection: sortDirection,
      },
    });
  }, [sortType, sortDirection, currenciesWithData.length]);

  return (
    <div style={appWrapperStyle}>
      <input
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
      </button>
      <CurrencyTable currenciesDisplayRefs={sortedData} />
    </div>
  );
};

export const SortBar = () => {
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
      </div>{" "}
    </div>
  );
};
