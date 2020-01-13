import { useContext } from 'react';
import { RateContext } from '../context/RateContext';

/**
 * @returns {{
 *  activePriceAgeRanges: number[],
 *  rates: [{ts: number, data: [{id: number, base: number, bid: number}]}],
 *  selectedPriceRange: number,
 *  setSelectedRange: (newRate: number) => React.Dispatch<React.SetStateAction<number>>,
 * }}
 */
export default function useRates() {
  return useContext(RateContext);
}
