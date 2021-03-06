import {
  faDollarSign,
  faHourglassHalf,
} from '@fortawesome/free-solid-svg-icons';
import { Tab, Help } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useRates } from '../hooks';

import Icon from './Icon';
import styles from './PriceRangeSelection.module.scss';

export default function PriceRangeSelection() {
  const { t } = useTranslation();

  const {
    selectedPriceRange,
    setSelectedRange,
    activePriceAgeRanges,
  } = useRates();

  return (
    <>
      <Tab.Group kind="toggle-rounded">
        <Tab className={styles.unclickable} tooltipPosition="top">
          <Icon icon={faDollarSign} />
          Price Age Selection
          <Icon icon={faHourglassHalf} />
        </Tab>
        {activePriceAgeRanges.map(number => {
          const isActive = number === selectedPriceRange;

          return (
            <Tab
              role="switch"
              aria-checked={isActive}
              className={isActive ? styles.unclickable : undefined}
              active={isActive}
              onClick={isActive ? undefined : () => setSelectedRange(number)}
              key={number}
            >
              {number}
            </Tab>
          );
        })}
      </Tab.Group>
      <Help color="info">
        Prices change over time. With this setting, you can choose the timespan
        for all calculations (an average is used).
      </Help>
    </>
  );
}
