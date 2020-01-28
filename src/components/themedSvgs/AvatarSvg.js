import React from 'react';
import { useTheme } from '../../hooks';
import getThemeBasedSvgColor from '../../constants/svgColor';

export default function AvatarSvg() {
  const { theme } = useTheme();

  const { primary } = getThemeBasedSvgColor(theme);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 698 698">
      <defs />
      <defs>
        <linearGradient
          id="a"
          x1="349"
          x2="349"
          y1="698"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="gray" stopOpacity=".25" />
          <stop offset=".54" stopColor="gray" stopOpacity=".12" />
          <stop offset="1" stopColor="gray" stopOpacity=".1" />
        </linearGradient>
      </defs>
      <circle cx="349" cy="349" r="349" fill="url(#a)" opacity=".5" />
      <circle cx="349.68" cy="346.77" r="341.64" fill="#f5f5f5" />
      <path
        fill={primary}
        d="M350 689.76a340 340 0 00187.79-56.2c-12.59-68.8-60.5-72.72-60.5-72.72h-264.2s-45.21 3.71-59.33 67A340.07 340.07 0 00350 689.76z"
      />
      <circle cx="346.37" cy="339.57" r="164.9" fill="#333" />
      <path
        d="M293.15 476.92h105.66v84.53A52.83 52.83 0 01346 614.28a52.83 52.83 0 01-52.83-52.83v-84.53z"
        opacity=".1"
      />
      <path
        fill="#fdb797"
        d="M296.5 473h99a3.35 3.35 0 013.35 3.35v81.18A52.83 52.83 0 01346 610.37a52.83 52.83 0 01-52.83-52.83v-81.19a3.35 3.35 0 013.33-3.35z"
      />
      <path
        d="M293.34 516.82a152.07 152.07 0 00105.66.29v-13H293.34z"
        opacity=".1"
      />
      <circle cx="346.37" cy="372.44" r="151.45" fill="#fdb797" />
      <path
        d="M238.49 234.68S302.32 364.24 482.37 289l-41.92-65.73-74.31-26.67z"
        opacity=".1"
      />
      <path
        fill="#333"
        d="M238.49 232.78s63.83 129.56 243.88 54.3l-41.92-65.73-74.31-26.67z"
      />
      <path
        fill="#333"
        d="M237.93 224a87.49 87.49 0 0121.69-35.27c29.79-29.45 78.63-35.66 103.68-69.24 6 9.32 1.36 23.65-9 27.65 24-.16 51.81-2.26 65.38-22a44.89 44.89 0 01-7.57 47.4c21.27 1 44 15.4 45.34 36.65.92 14.16-8 27.56-19.59 35.68s-25.71 11.85-39.56 14.9c-40.44 8.93-186.76 46.3-160.37-35.77z"
      />
      <ellipse cx="194.86" cy="372.3" fill="#fdb797" rx="14.09" ry="26.42" />
      <ellipse cx="497.8" cy="372.3" fill="#fdb797" rx="14.09" ry="26.42" />
    </svg>
  );
}
