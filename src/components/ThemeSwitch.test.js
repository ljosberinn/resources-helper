import { fireEvent } from '@testing-library/react';
import React from 'react';

import render from '../utils/testUtils';

import ThemeSwitch, { validOrigins } from './ThemeSwitch';

const primaryColorClassName = 'has-text-primary';

beforeEach(() => localStorage.clear());

describe('<ThemeSwitch />', () => {
  validOrigins.forEach(origin => {
    test(`it renders successfully from ${origin}`, () => {
      render(<ThemeSwitch from={origin} />);
    });

    test(`it changes the theme onclick from ${origin}`, () => {
      const { getByTestId } = render(<ThemeSwitch from={origin} />);

      const button = getByTestId('toggle-theme');
      const switchElement = getByTestId('theme-switch');

      expect(switchElement.checked).toBeFalsy();

      fireEvent.click(button);

      expect(switchElement.checked).toBeTruthy();
    });

    test(`it indicates the active theme visually in ${origin}`, () => {
      const { getByTestId } = render(<ThemeSwitch from={origin} />);

      const button = getByTestId('toggle-theme');
      const sun = getByTestId('sun');
      const moon = getByTestId('moon');

      expect(sun.classList.contains(primaryColorClassName)).toBeTruthy();
      expect(moon.classList.contains(primaryColorClassName)).toBeFalsy();

      fireEvent.click(button);

      expect(sun.classList.contains(primaryColorClassName)).toBeFalsy();
      expect(moon.classList.contains(primaryColorClassName)).toBeTruthy();
    });
  });
});
