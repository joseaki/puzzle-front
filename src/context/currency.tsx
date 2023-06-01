import { ReactNode, createContext, useContext, useState } from "react";

interface Currency {
  iso: string;
  exchange: number;
  symbol: string;
}
interface CurrencyProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyProps | undefined>(undefined);

export const CurrencyTypes = [
  {
    iso: "USD",
    exchange: 1,
    symbol: "$",
  },
  {
    iso: "EUR",
    exchange: 1.07,
    symbol: "€",
  },
  {
    iso: "HNL",
    exchange: 24,
    symbol: "L",
  },
];

export const CurrencyProvider = (props: { children: ReactNode }) => {
  const [currency, setCurrencyValue] = useState(CurrencyTypes[0]);

  const setCurrency = (currency: Currency) => {
    setCurrencyValue(currency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {props.children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const currency = useContext(CurrencyContext);
  if (!currency) {
    throw new Error("use currency should be used inside a Currency provider");
  }
  return currency;
};
