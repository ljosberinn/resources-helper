import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * @returns {{
 * theme: 'light' | 'dark',
 * toggleTheme: () => React.Dispatch<React.SetStateAction<'light' | 'dark'>>,
 * isLoading: boolean
 * }}
 */
export default function useTheme() {
  return useContext(ThemeContext);
}
