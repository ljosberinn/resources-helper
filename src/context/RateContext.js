import React, { createContext, useState, useEffect } from 'react';
import PRICE_AGE_RANGES from '../constants/priceRanges';
import { createSafeAbortController } from '../constants/browserAPIs';
import { abortableFetchJSON } from '../utils';

export const RateContext = createContext();

const ENDPOINT = '.netlify/functions/getRates';

export default function RateProvider({ children }) {
  const [rates, setRates] = useState([]);
  const [selectedPriceRange, setSelectedRange] = useState(
    PRICE_AGE_RANGES[4] || PRICE_AGE_RANGES[0],
  );

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
        activePriceAgeRanges: PRICE_AGE_RANGES,
        rates,
        selectedPriceRange,
        setSelectedRange,
      }}
    >
      {children}
    </RateContext.Provider>
  );
}
