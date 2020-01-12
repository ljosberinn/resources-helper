import React from 'react';
import { Tab } from 'rbx';
import { useRates } from '../hooks';
import { useTranslation } from 'react-i18next';
import {
  faDollarSign,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import Icon from './Icon';

export default function PriceRangeSelection() {
  const { t } = useTranslation();

  const { selectedPriceRange, setSelectedRange, priceAgeRanges } = useRates();

  return (
    <Tab.Group kind="toggle-rounded">
      <Tab>
        <Icon icon={faDollarSign} />
        <Icon icon={faHourglassHalf} />
      </Tab>
      {priceAgeRanges.map(number => {
        const isActive = number === selectedPriceRange;

        return (
          <Tab
            active={isActive}
            onClick={isActive ? undefined : () => setSelectedRange(number)}
            key={number}
          >
            {number}
          </Tab>
        );
      })}
    </Tab.Group>
  );
}
