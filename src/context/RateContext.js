import React, { createContext, useState, useEffect } from 'react';
import { PRICE_AGE_RANGES } from '../constants/rates';
import createSafeAbortController from '../constants/abortController';
import { abortableFetchJSON } from '../utils';

export const RateContext = createContext();

const ENDPOINT = '.netlify/functions/getRates';

export default function RateProvider({ children }) {
  const [rates, setRates] = useState([]);
  const [selectedPriceRange, setSelectedRange] = useState(PRICE_AGE_RANGES[4]);

  useEffect(() => {
    const params = new URLSearchParams({
      range: selectedPriceRange,
    }).toString();

    const url = [ENDPOINT, params].join('?');

    const controller = createSafeAbortController();

    abortableFetchJSON(url, { signal: controller.signal })
      .then(setRates)
      .catch(error => {
        console.error(error);
      });

    return () => {
      controller.abort();
    };
  }, [selectedPriceRange]);

  return (
    <RateContext.Provider
      value={{
        priceAgeRanges: PRICE_AGE_RANGES,
        rates,
        selectedPriceRange,
        setSelectedRange,
      }}
    >
      {children}
    </RateContext.Provider>
  );
}
